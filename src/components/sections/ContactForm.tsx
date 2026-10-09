import type { FormEvent } from "react";
import { useState } from "react";
import { CONTACT_EMAIL } from "../../siteConfig";
import { buildContactMailto } from "../../lib/contactMailto";
import Button from "../ui/Button";

const fieldClass =
  "mt-1.5 min-h-11 w-full min-w-0 rounded-lg border border-border-strong bg-white px-3.5 py-3 text-sm text-ink placeholder:text-muted-2 transition-colors focus-visible:border-signal-dim focus-visible:outline-2 focus-visible:outline-signal";

export default function ContactForm() {
  const [notice, setNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      units: String(data.get("units") ?? "").trim(),
      challenge: String(data.get("challenge") ?? "").trim(),
    };

    setNotice(true);
    window.location.href = buildContactMailto(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white p-5 shadow-lift sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="contact-name" className="text-xs font-semibold text-ink">
          Nome
          <input
            id="contact-name"
            name="name"
            className={fieldClass}
            type="text"
            autoComplete="name"
            placeholder="Seu nome"
            maxLength={120}
            required
          />
        </label>
        <label htmlFor="contact-company" className="text-xs font-semibold text-ink">
          Restaurante / empresa
          <input
            id="contact-company"
            name="company"
            className={fieldClass}
            type="text"
            autoComplete="organization"
            placeholder="Nome do negócio"
            maxLength={160}
            required
          />
        </label>
        <label htmlFor="contact-email" className="text-xs font-semibold text-ink">
          E-mail
          <input
            id="contact-email"
            name="email"
            className={fieldClass}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="voce@empresa.com"
            maxLength={254}
            required
          />
        </label>
        <label htmlFor="contact-phone" className="text-xs font-semibold text-ink">
          Telefone / WhatsApp <span className="font-normal text-muted">(opcional)</span>
          <input
            id="contact-phone"
            name="phone"
            className={fieldClass}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(00) 00000-0000"
            maxLength={24}
          />
        </label>
        <label htmlFor="contact-units" className="text-xs font-semibold text-ink sm:col-span-2">
          Quantidade aproximada de unidades <span className="font-normal text-muted">(opcional)</span>
          <select id="contact-units" name="units" className={fieldClass} defaultValue="">
            <option value="">Selecione uma faixa</option>
            <option>1 unidade</option>
            <option>2 a 5 unidades</option>
            <option>6 a 20 unidades</option>
            <option>Mais de 20 unidades</option>
            <option>Ainda estou avaliando</option>
          </select>
        </label>
        <label htmlFor="contact-challenge" className="text-xs font-semibold text-ink sm:col-span-2">
          Principal desafio da operação <span className="font-normal text-muted">(opcional)</span>
          <textarea
            id="contact-challenge"
            name="challenge"
            className={fieldClass + " min-h-24 resize-y"}
            placeholder="Ex.: organizar melhor o fluxo entre atendimento, cozinha e retirada"
            maxLength={1200}
            rows={3}
          />
        </label>
      </div>

      <Button type="submit" variant="primary" className="mt-5 min-h-11 w-full">
        Quero ver o Autofluxe no meu cenário
      </Button>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Ao solicitar, seu aplicativo de e-mail será aberto com os dados preenchidos. Revise a mensagem e clique em
        enviar para concluir. Se nada abrir, escreva para {CONTACT_EMAIL}.
      </p>

      {notice && (
        <div
          className="mt-4 rounded-lg border border-signal/30 bg-signal/5 px-3.5 py-3 text-sm leading-relaxed text-ink"
          role="status"
          aria-live="polite"
        >
          <p className="font-semibold">Finalize o envio no seu e-mail</p>
          <p className="mt-1">
            Confira os dados da mensagem e clique em enviar. Se o aplicativo não abriu, escreva para{" "}
            <a
              className="font-semibold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-signal"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}
