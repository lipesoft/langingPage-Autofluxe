import { ArrowRight, Check } from "lucide-react";

const FLOW = ["Pedido", "Cozinha", "Retirada", "Gestão"];

export default function ProofStrip() {
  return (
    <section className="border-y border-border bg-white py-6 sm:py-7" aria-label="Fluxo apresentado pelo Autofluxe">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.15em] text-muted sm:text-left">
          Uma operação, do começo ao fim
        </p>
        <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:justify-between sm:gap-3" aria-label="Pedido, cozinha, retirada e gestão">
          {FLOW.map((label, index) => (
            <li key={label} className="flex items-center gap-1.5 min-[430px]:gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink min-[430px]:text-xs sm:text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF1E6] text-brand-deep" aria-hidden="true">
                  <Check size={12} strokeWidth={2.5} />
                </span>
                {label}
              </span>
              {index < FLOW.length - 1 && (
                <ArrowRight className="hidden h-3.5 w-3.5 text-signal-dim min-[430px]:block" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
