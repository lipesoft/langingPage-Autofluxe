import { FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL } from "../../siteConfig";
import Button from "../ui/Button";

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const body = Array.from(data.entries())
    .filter(([, value]) => String(value).trim().length > 0)
    .map(([label, value]) => label + ": " + String(value))
    .join("\n");
  const query = new URLSearchParams({
    subject: "Quero conhecer o Autofluxe",
    body,
  });

  window.location.assign("mailto:" + CONTACT_EMAIL + "?" + query.toString());
}

const fieldClass =
  "mt-1.5 w-full min-w-0 rounded-lg border border-border-strong bg-white px-3.5 py-3 text-sm text-ink placeholder:text-muted-2 focus-visible:outline-2 focus-visible:outline-signal";

export default function FinalCTA() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-[#313A4A] bg-[#171D26] py-20 sm:py-24">
      <div
        className="pointer-events-none absolute right-[-15%] top-[-35%] h-[520px] w-[650px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,160,0,0.8), rgba(224,32,16,0.2) 48%, transparent 72%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-content gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div className="max-w-[490px]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-signal-soft">Próximo passo</p>
          <h2 className="mt-3 text-balance font-display text-[2rem] font-extrabold leading-[1.12] text-white sm:text-[2.6rem]">
            Veja o Autofluxe no contexto da sua operação.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#C7CED9]">
            Conte um pouco sobre o seu restaurante para a equipe preparar uma conversa mais próxima da sua rotina.
          </p>
          <a href="#demonstracao" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-signal">
            Voltar à simulação <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white p-5 shadow-lift sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold text-ink">
              Nome
              <input className={fieldClass} name="Nome" autoComplete="name" placeholder="Seu nome" required />
            </label>
            <label className="text-xs font-semibold text-ink">
              Restaurante / empresa
              <input className={fieldClass} name="Restaurante ou empresa" autoComplete="organization" placeholder="Nome do negócio" required />
            </label>
            <label className="text-xs font-semibold text-ink">
              WhatsApp
              <input className={fieldClass} name="WhatsApp" type="tel" autoComplete="tel" inputMode="tel" placeholder="(00) 00000-0000" />
            </label>
            <label className="text-xs font-semibold text-ink">
              E-mail
              <input className={fieldClass} name="E-mail" type="email" autoComplete="email" placeholder="voce@empresa.com" required />
            </label>
            <label className="text-xs font-semibold text-ink sm:col-span-2">
              Quantidade aproximada de unidades
              <select className={fieldClass} name="Quantidade aproximada de unidades" defaultValue="">
                <option value="">Selecione uma faixa</option>
                <option>1 unidade</option>
                <option>2 a 5 unidades</option>
                <option>6 a 20 unidades</option>
                <option>Mais de 20 unidades</option>
                <option>Ainda estou avaliando</option>
              </select>
            </label>
          </div>

          <Button type="submit" variant="primary" className="mt-5 w-full">
            Quero conhecer o Autofluxe
          </Button>
          <p className="mt-3 text-[10px] leading-relaxed text-muted">
            O site não armazena esses dados. Ao continuar, seu aplicativo de e-mail abrirá uma mensagem pronta para você revisar e enviar.
          </p>
        </form>
      </div>
    </section>
  );
}
