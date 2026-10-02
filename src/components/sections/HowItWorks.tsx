import { ShoppingBag, ClipboardList, ChefHat, PanelsTopLeft } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: ShoppingBag,
    title: "Cliente faz o pedido",
    desc: "O pedido começa no ponto de atendimento escolhido para a operação.",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Pedido entra no fluxo",
    desc: "A equipe acompanha o pedido com o contexto da sua origem e andamento.",
  },
  {
    n: "03",
    icon: ChefHat,
    title: "Cozinha recebe",
    desc: "O preparo aparece organizado na etapa de cozinha da demonstração.",
  },
  {
    n: "04",
    icon: PanelsTopLeft,
    title: "Pedido vai para retirada",
    desc: "O status de pronto fecha o fluxo com uma chamada mais clara.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="border-t border-border bg-[#FFF9F4] py-20 sm:py-24">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Como funciona</p>
        <h2 className="mt-3 max-w-[620px] text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.3rem]">
          Do pedido à retirada, quatro etapas no mesmo caminho.
        </h2>

        <div className="relative mt-14 hidden sm:grid sm:grid-cols-4 sm:gap-6">
          <div className="pointer-events-none absolute left-[6%] right-[6%] top-[22px] h-px bg-gradient-to-r from-signal/70 via-border-strong to-brand-red/60" />
          {STEPS.map((step) => (
            <div key={step.n} className="relative z-10 flex flex-col items-start gap-4 pr-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FFD7BF] bg-[#FFF8F2] font-mono text-[13px] font-semibold text-brand-deep">
                {step.n}
              </div>
              <step.icon className="h-4 w-4 text-brand-deep" strokeWidth={1.7} />
              <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.desc}</p>
            </div>
          ))}
        </div>

        <ol className="relative mt-12 flex flex-col gap-10 border-l border-border-strong pl-6 sm:hidden">
          {STEPS.map((step) => (
            <li key={step.n} className="relative">
              <div className="absolute -left-[31px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#FFD7BF] bg-[#FFF8F2] font-mono text-[11px] font-semibold text-brand-deep">
                {step.n}
              </div>
              <h3 className="font-display text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
