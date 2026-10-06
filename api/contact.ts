import {
  getLeadContext,
  renderLeadEmail,
  validateContactLead,
} from "./_lib/contactEmail.ts";
import { CONTACT_EMAIL } from "../src/siteConfig.ts";

const MAX_BODY_BYTES = 8 * 1024;
const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
};

type RuntimeEnv = {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  PUBLIC_SITE_URL?: string;
};

function getEnv(): RuntimeEnv {
  return (globalThis as typeof globalThis & { process?: { env?: RuntimeEnv } }).process?.env ?? {};
}

function json(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), { status, headers: JSON_HEADERS });
}

class BodyTooLargeError extends Error {}

async function readLimitedBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return "";

  const chunks: Uint8Array[] = [];
  let length = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new BodyTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

function resolveSiteUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !(url.protocol === "http:" && isLocalhost)) return null;
    return url;
  } catch {
    return null;
  }
}

function isAllowedOrigin(request: Request, siteOrigin: string) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === siteOrigin;
  } catch {
    return false;
  }
}

function validSender(value: string | undefined) {
  return Boolean(value && value.length <= 254 && /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(value));
}

async function handleContact(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json(405, { message: "Método não permitido." });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json(415, { message: "Formato de envio não suportado." });
  }

  const env = getEnv();
  const siteUrl = resolveSiteUrl(env.PUBLIC_SITE_URL);
  if (!env.RESEND_API_KEY || !validSender(env.RESEND_FROM_EMAIL) || !siteUrl) {
    return json(503, { message: "O formulário está temporariamente indisponível. Tente novamente mais tarde." });
  }

  if (!isAllowedOrigin(request, siteUrl.origin)) {
    return json(403, { message: "Não foi possível validar a origem do envio. Atualize a página e tente novamente." });
  }

  let bodyText: string;
  try {
    bodyText = await readLimitedBody(request);
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return json(413, { message: "O formulário excedeu o tamanho permitido." });
    }
    return json(400, { message: "Não foi possível ler os dados do formulário." });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(bodyText);
  } catch {
    return json(400, { message: "Confira os dados do formulário e tente novamente." });
  }

  if (payload && typeof payload === "object" && "website" in payload) {
    const trap = (payload as Record<string, unknown>).website;
    if (trap !== null && trap !== undefined && String(trap).trim()) return json(200, { success: true });
  }

  const { lead, errors } = validateContactLead(payload);
  if (!lead) return json(422, { message: "Confira os campos destacados.", fieldErrors: errors });

  const context = getLeadContext(request, siteUrl.origin);
  const email = renderLeadEmail(lead, context, siteUrl.toString());

  try {
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
        "user-agent": "Autofluxe-Landing/1.0",
      },
      body: JSON.stringify({
        from: `Autofluxe <${env.RESEND_FROM_EMAIL}>`,
        to: [CONTACT_EMAIL],
        reply_to: lead.email,
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!providerResponse.ok) {
      return json(502, { message: "Não foi possível enviar sua mensagem agora. Tente novamente ou use o e-mail de contato." });
    }
  } catch {
    return json(502, { message: "Não foi possível enviar sua mensagem agora. Tente novamente ou use o e-mail de contato." });
  }

  return json(200, { success: true });
}

export default { fetch: handleContact };
