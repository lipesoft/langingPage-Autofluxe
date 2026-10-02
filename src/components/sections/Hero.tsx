import { Activity, ArrowDownRight } from "lucide-react";
import ConnectedOperation from "./ConnectedOperation";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F3] via-white to-paper pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
      <div className="grid-technical mask-fade-x pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
      <div
        className="pointer-events-none absolute right-[-15%] top-[8%] h-[560px] w-[700px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,160,0,0.17), rgba(224,32,16,0.08) 42%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-content items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        <div className="max-w-[560px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFD9BF] bg-white/90 px-3 py-2 text-[11px] font-semibold text-brand-deep shadow-[0_10px_25px_-22px_rgba(224,84,12,0.8)]">
            <Activity size={14} aria-hidden="true" />
            Operação conectada em um fluxo
          </div>
          <h1 className="text-balance font-display text-[2.65rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[3.25rem] lg:text-[3.5rem]">
            Seu restaurante.
            <br />
            <span className="brand-gradient-text">Um fluxo só.</span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-base">
            Conecte pedidos, cozinha, caixa, retirada e gestão em uma plataforma criada para acompanhar o ritmo da operação do seu restaurante.
          </p>
          <div className="mt-7 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:items-center">
            <Button href="#demonstracao" variant="primary">
              Ver o Autofluxe em ação
            </Button>
            <Button href="#produto" variant="secondary">
              Explorar a plataforma <ArrowDownRight size={15} aria-hidden="true" />
            </Button>
          </div>
          <p className="mt-4 text-[11px] text-muted-2">Pedido · atendimento · cozinha · retirada · gestão</p>
        </div>

        <ConnectedOperation />
      </div>
    </section>
  );
}
