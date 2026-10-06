// Email construction and server-side lead validation for the Vercel function.
const FIELD_LIMITS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 24,
  units: 40,
  challenge: 1200,
} as const;

const UNIT_OPTIONS = new Set([
  "1 unidade",
  "2 a 5 unidades",
  "6 a 20 unidades",
  "Mais de 20 unidades",
  "Ainda estou avaliando",
]);

export type ContactLead = {
  name: string;
  company: string;
  email: string;
  phone: string;
  phoneDigits: string;
  whatsappDigits: string;
  units: string;
  challenge: string;
};

export type ContactFieldErrors = Partial<Record<keyof Omit<ContactLead, "phoneDigits" | "whatsappDigits">, string>>;

function normalizedText(value: unknown) {
  return typeof value === "string"
    ? value
        .replace(/\u0000/g, "")
        .replace(/\r\n?/g, "\n")
        .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .trim()
    : "";
}

function oneLine(value: unknown) {
  return normalizedText(value).replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ");
}

export function validateContactLead(value: unknown): {
  lead?: ContactLead;
  errors: ContactFieldErrors;
} {
  const input = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const name = oneLine(input.name);
  const company = oneLine(input.company);
  const email = oneLine(input.email).toLowerCase();
  const phone = oneLine(input.phone);
  const units = oneLine(input.units);
  const challenge = normalizedText(input.challenge);
  const errors: ContactFieldErrors = {};

  if (!name) errors.name = "Informe seu nome.";
  else if (name.length > FIELD_LIMITS.name) errors.name = "Use até 120 caracteres.";

  if (!company) errors.company = "Informe o nome do restaurante ou empresa.";
  else if (company.length > FIELD_LIMITS.company) errors.company = "Use até 160 caracteres.";

  if (!email) errors.email = "Informe seu e-mail.";
  else if (email.length > FIELD_LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Confira o formato do e-mail informado.";
  }

  let phoneDigits = "";
  let whatsappDigits = "";
  if (phone) {
    if (phone.length > FIELD_LIMITS.phone || !/^\+?[\d\s().-]+$/.test(phone)) {
      errors.phone = "Informe um telefone com DDD, incluindo apenas números e caracteres de formatação.";
    } else {
      phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.startsWith("55") && (phoneDigits.length === 12 || phoneDigits.length === 13)) {
        phoneDigits = phoneDigits.slice(2);
      }
      const areaCode = phoneDigits.slice(0, 2);
      const subscriber = phoneDigits.slice(2);
      const validLandline = subscriber.length === 8 && /^[2-5]\d{7}$/.test(subscriber);
      const validMobile = subscriber.length === 9 && /^9\d{8}$/.test(subscriber);
      if (!/^[1-9][1-9]$/.test(areaCode) || (!validLandline && !validMobile)) {
        errors.phone = "Informe um número brasileiro válido com DDD.";
        phoneDigits = "";
      } else if (validMobile) {
        whatsappDigits = phoneDigits;
      }
    }
  }

  if (units && !UNIT_OPTIONS.has(units)) errors.units = "Selecione uma das opções disponíveis.";
  if (challenge.length > FIELD_LIMITS.challenge) errors.challenge = "Use até 1.200 caracteres.";

  if (Object.keys(errors).length > 0) return { errors };
  return { errors, lead: { name, company, email, phone, phoneDigits, whatsappDigits, units, challenge } };
}

export type LeadContext = {
  sentAt: string;
  page: string;
  utm: Array<{ label: string; value: string }>;
};

const UTM_LABELS = [
  ["utm_source", "UTM Source"],
  ["utm_medium", "UTM Medium"],
  ["utm_campaign", "UTM Campaign"],
] as const;

export function getLeadContext(request: Request, siteOrigin: string, sentAt = new Date()) {
  let page = "";
  let utm: LeadContext["utm"] = [];
  const referer = request.headers.get("referer");

  if (referer) {
    try {
      const source = new URL(referer);
      if (source.origin === siteOrigin) {
        page = source.pathname;
        utm = UTM_LABELS.flatMap(([key, label]) => {
          const value = oneLine(source.searchParams.get(key)).slice(0, 160);
          return value ? [{ label, value }] : [];
        });
      }
    } catch {
      // Invalid referer values are omitted from the email context.
    }
  }

  return {
    sentAt: new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo",
    }).format(sentAt),
    page,
    utm,
  } satisfies LeadContext;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return phone;
}

export function renderLeadEmail(lead: ContactLead, context: LeadContext, siteUrl: string) {
  const logoUrl = new URL("/autofluxe-logo.jpeg", siteUrl).toString();
  const subjectName = lead.name || lead.company;
  const subject = `Novo lead Autofluxe — ${subjectName.replace(/[\r\n]+/g, " ").slice(0, 160)}`;
  const replyUrl = `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent("Re: Novo interesse pelo Autofluxe")}`;
  const whatsappUrl = lead.whatsappDigits
    ? `https://wa.me/55${lead.whatsappDigits}`
    : "";
  const rows = [
    { label: "Nome", value: lead.name, required: true },
    { label: "Empresa / Restaurante", value: lead.company, required: true },
    { label: "E-mail", value: lead.email, required: true },
    { label: "Telefone / WhatsApp", value: formatPhone(lead.phoneDigits), required: Boolean(lead.phone) },
    { label: "Quantidade de unidades", value: lead.units, required: Boolean(lead.units) },
    { label: "Principal desafio", value: lead.challenge, required: Boolean(lead.challenge) },
  ].filter((row) => row.required);

  const detailRows = rows
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:13px 14px;border-bottom:1px solid #E9ECF0;color:#687180;font-size:13px;line-height:20px;vertical-align:top;width:38%;">${escapeHtml(label)}</td>
          <td style="padding:13px 14px;border-bottom:1px solid #E9ECF0;color:#242C37;font-size:14px;line-height:21px;vertical-align:top;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
        </tr>`,
    )
    .join("");

  const contextRows = [
    ...(context.page ? [{ label: "Página", value: context.page }] : []),
    ...context.utm,
  ]
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:5px 0;color:#687180;font-size:12px;line-height:18px;width:38%;">${escapeHtml(label)}</td>
          <td style="padding:5px 0;color:#242C37;font-size:12px;line-height:18px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const whatsappCta = whatsappUrl
    ? `<a href="${escapeHtml(whatsappUrl)}" style="display:inline-block;margin:0 0 10px 8px;padding:12px 18px;border:1px solid #CCD2DA;border-radius:7px;color:#242C37;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;text-decoration:none;">Falar pelo WhatsApp</a>`
    : "";

  const html = `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:24px 12px;background-color:#F5F6F8;font-family:Arial,Helvetica,sans-serif;color:#242C37;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr><td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;max-width:640px;border-collapse:separate;border-spacing:0;background-color:#FFFFFF;border:1px solid #E2E5E9;border-radius:12px;overflow:hidden;">
          <tr><td style="padding:22px 28px;background-color:#242C37;border-bottom:4px solid #E8540C;">
            <img src="${escapeHtml(logoUrl)}" width="200" height="50" alt="Autofluxe" style="display:block;width:200px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;background-color:#FFFFFF;border-radius:6px;" />
          </td></tr>
          <tr><td style="padding:28px 28px 10px;">
            <h1 style="margin:0;color:#242C37;font-family:Arial,Helvetica,sans-serif;font-size:23px;line-height:30px;font-weight:700;">Novo interesse pelo Autofluxe</h1>
            <p style="margin:10px 0 0;color:#687180;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;">Um novo contato acabou de solicitar informações através da landing page do Autofluxe.</p>
          </td></tr>
          <tr><td style="padding:18px 28px 8px;">
            <h2 style="margin:0 0 10px;color:#242C37;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;font-weight:700;">Informações do lead</h2>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;border:1px solid #E9ECF0;">${detailRows}</table>
          </td></tr>
          <tr><td style="padding:18px 28px 8px;">
            <h2 style="margin:0 0 8px;color:#242C37;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;font-weight:700;">Contexto do contato</h2>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
              <tr><td style="padding:5px 0;color:#687180;font-size:12px;line-height:18px;width:38%;">Enviado em</td><td style="padding:5px 0;color:#242C37;font-size:12px;line-height:18px;">${escapeHtml(context.sentAt)} (horário de Brasília)</td></tr>
              ${contextRows}
            </table>
          </td></tr>
          <tr><td style="padding:20px 28px 28px;">
            <a href="${escapeHtml(replyUrl)}" style="display:inline-block;padding:13px 20px;border-radius:7px;background-color:#C94710;color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;">Responder este lead</a>${whatsappCta}
          </td></tr>
          <tr><td style="padding:20px 28px;background-color:#FFF8F2;border-top:1px solid #E2E5E9;">
            <p style="margin:0;color:#242C37;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;font-weight:bold;">Autofluxe</p>
            <p style="margin:3px 0 0;color:#687180;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;">Seu restaurante. Um fluxo só.</p>
            <p style="margin:12px 0 0;color:#8B94A3;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:17px;">Mensagem gerada automaticamente pela landing page oficial do Autofluxe.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  const textLines = [
    "Novo lead Autofluxe",
    "",
    ...rows.flatMap(({ label, value }) => [`${label}:`, value, ""]),
    "Origem: Landing Page Autofluxe",
    `Enviado em: ${context.sentAt} (horário de Brasília)`,
    ...(context.page ? [`Página: ${context.page}`] : []),
    ...context.utm.map(({ label, value }) => `${label}: ${value}`),
    "",
    `Responder este lead: ${replyUrl}`,
    ...(whatsappUrl ? [`Falar pelo WhatsApp: ${whatsappUrl}`] : []),
    "",
    "Autofluxe",
    "Seu restaurante. Um fluxo só.",
    "Mensagem gerada automaticamente pela landing page oficial do Autofluxe.",
  ];

  return { subject, html, text: textLines.join("\n"), logoUrl };
}
