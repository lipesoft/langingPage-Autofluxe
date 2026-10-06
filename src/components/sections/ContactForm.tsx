import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { CONTACT_EMAIL } from "../../siteConfig";
import Button from "../ui/Button";

type FieldName = "name" | "company" | "email" | "phone" | "units" | "challenge";
type FormStatus = { type: "success" | "error"; message: string } | null;

const fieldClass =
  "mt-1.5 min-h-11 w-full min-w-0 rounded-lg border border-border-strong bg-white px-3.5 py-3 text-sm text-ink placeholder:text-muted-2 transition-colors focus-visible:border-signal-dim focus-visible:outline-2 focus-visible:outline-signal";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const submittingRef = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      units: String(data.get("units") ?? "").trim(),
      challenge: String(data.get("challenge") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
    };

    submittingRef.current = true;
    setSubmitting(true);
    setStatus(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        fieldErrors?: Partial<Record<FieldName, string>>;
      };

      if (!response.ok || result.success !== true) {
        const errors = result.fieldErrors ?? {};
        setFieldErrors(errors);
        setStatus({
          type: "error",
          message:
            result.message ??
            "Não foi possível enviar sua mensagem agora. Tente novamente ou use o e-mail de contato.",
        });
        const firstInvalidField = Object.keys(errors)[0];
        if (firstInvalidField) {
          window.requestAnimationFrame(() => document.getElementById(`contact-${firstInvalidField}`)?.focus());
        }
        return;
      }

      form.reset();
      setStatus({
        type: "success",
        message:
          "Recebemos suas informações. A equipe Autofluxe entrará em contato para entender sua operação.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "Não foi possível enviar sua mensagem agora. Tente novamente ou, se preferir, escreva para a equipe Autofluxe.",
      });
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  function fieldProps(name: FieldName) {
    return {
      id: `contact-${name}`,
      name,
      "aria-invalid": Boolean(fieldErrors[name]),
      "aria-describedby": fieldErrors[name] ? `contact-${name}-error` : undefined,
    } as const;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white p-5 shadow-lift sm:p-7"
      aria-busy={submitting}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="contact-name" className="text-xs font-semibold text-ink">
          Nome
          <input
            {...fieldProps("name")}
            className={fieldClass}
            type="text"
            autoComplete="name"
            placeholder="Seu nome"
            maxLength={120}
            required
            disabled={submitting}
          />
          {fieldErrors.name && <span id="contact-name-error" className="mt-1 block text-xs text-danger">{fieldErrors.name}</span>}
        </label>
        <label htmlFor="contact-company" className="text-xs font-semibold text-ink">
          Restaurante / empresa
          <input
            {...fieldProps("company")}
            className={fieldClass}
            type="text"
            autoComplete="organization"
            placeholder="Nome do negócio"
            maxLength={160}
            required
            disabled={submitting}
          />
          {fieldErrors.company && <span id="contact-company-error" className="mt-1 block text-xs text-danger">{fieldErrors.company}</span>}
        </label>
        <label htmlFor="contact-email" className="text-xs font-semibold text-ink">
          E-mail
          <input
            {...fieldProps("email")}
            className={fieldClass}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="voce@empresa.com"
            maxLength={254}
            required
            disabled={submitting}
          />
          {fieldErrors.email && <span id="contact-email-error" className="mt-1 block text-xs text-danger">{fieldErrors.email}</span>}
        </label>
        <label htmlFor="contact-phone" className="text-xs font-semibold text-ink">
          Telefone / WhatsApp <span className="font-normal text-muted">(opcional)</span>
          <input
            {...fieldProps("phone")}
            className={fieldClass}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(00) 00000-0000"
            maxLength={24}
            disabled={submitting}
          />
          {fieldErrors.phone && <span id="contact-phone-error" className="mt-1 block text-xs text-danger">{fieldErrors.phone}</span>}
        </label>
        <label htmlFor="contact-units" className="text-xs font-semibold text-ink sm:col-span-2">
          Quantidade aproximada de unidades <span className="font-normal text-muted">(opcional)</span>
          <select
            {...fieldProps("units")}
            className={fieldClass}
            defaultValue=""
            disabled={submitting}
          >
            <option value="">Selecione uma faixa</option>
            <option>1 unidade</option>
            <option>2 a 5 unidades</option>
            <option>6 a 20 unidades</option>
            <option>Mais de 20 unidades</option>
            <option>Ainda estou avaliando</option>
          </select>
          {fieldErrors.units && <span id="contact-units-error" className="mt-1 block text-xs text-danger">{fieldErrors.units}</span>}
        </label>
        <label htmlFor="contact-challenge" className="text-xs font-semibold text-ink sm:col-span-2">
          Principal desafio da operação <span className="font-normal text-muted">(opcional)</span>
          <textarea
            {...fieldProps("challenge")}
            className={fieldClass + " min-h-24 resize-y"}
            placeholder="Ex.: organizar melhor o fluxo entre atendimento, cozinha e retirada"
            maxLength={1200}
            rows={3}
            disabled={submitting}
          />
          {fieldErrors.challenge && <span id="contact-challenge-error" className="mt-1 block text-xs text-danger">{fieldErrors.challenge}</span>}
        </label>
      </div>

      <div className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Deixe este campo em branco</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" variant="primary" className="mt-5 min-h-11 w-full" disabled={submitting}>
        {submitting ? "Enviando…" : "Solicitar demonstração"}
      </Button>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Usaremos essas informações para compreender sua operação e responder ao contato. O formulário envia os dados à equipe Autofluxe por e-mail.
      </p>

      {status && (
        <div
          className={[
            "mt-4 rounded-lg border px-3.5 py-3 text-sm leading-relaxed",
            status.type === "success"
              ? "border-success/30 bg-success/5 text-ink"
              : "border-danger/30 bg-danger/5 text-ink",
          ].join(" ")}
          role={status.type === "error" ? "alert" : "status"}
          aria-live={status.type === "error" ? "assertive" : "polite"}
        >
          <p className="font-semibold">{status.type === "success" ? "Mensagem enviada!" : "Tente novamente"}</p>
          <p className="mt-1">{status.message}</p>
          {status.type === "error" && (
            <p className="mt-2">
              Você pode tentar novamente ou escrever para{" "}
              <a className="font-semibold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-signal" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          )}
        </div>
      )}
    </form>
  );
}
