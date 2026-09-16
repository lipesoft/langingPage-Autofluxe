import { useState } from "react";
import LandscapeTV from "../devices/LandscapeTV";
import TotemVertical from "../devices/TotemVertical";
import {
  MenuScreen,
  PromoScreen,
  CorporateScreen,
  QueueScreen,
  WeatherScreen,
} from "../devices/screens";

const CASES = [
  {
    key: "restaurantes",
    label: "Restaurantes",
    caption: "Do pedido à retirada",
    copy: "Dê autonomia ao cliente no totem e mantenha cozinha e retirada trabalhando com o mesmo status do pedido.",
    device: "totem",
    screen: <MenuScreen />,
  },
  {
    key: "fast-casual",
    label: "Fast casual",
    caption: "Agilidade no horário de pico",
    copy: "Organize filas, destaque combos e acelere a decisão de quem quer comer bem sem perder tempo.",
    device: "tv",
    screen: <PromoScreen />,
  },
  {
    key: "praca",
    label: "Praças de alimentação",
    caption: "Operação visível",
    copy: "Mostre o andamento da retirada e deixe cada etapa clara para clientes e equipe.",
    device: "tv",
    screen: <QueueScreen />,
  },
  {
    key: "cafeterias",
    label: "Cafeterias",
    caption: "Cardápio sempre atual",
    copy: "Alterne produtos, preços e campanhas do dia sem depender de novos materiais impressos.",
    device: "totem",
    screen: <PromoScreen />,
  },
  {
    key: "retirada",
    label: "Operações com retirada",
    caption: "Menos dúvida no balcão",
    copy: "Organize a chamada do pedido para dar mais previsibilidade a quem está esperando.",
    device: "tv",
    screen: <CorporateScreen />,
  },
  {
    key: "franquias",
    label: "Franquias",
    caption: "Consistência em cada unidade",
    copy: "Padronize o atendimento e acompanhe pontos diferentes sem abrir mão da realidade local de cada loja.",
    device: "totem",
    screen: <WeatherScreen />,
  },
];

export default function UseCases() {
  const [active, setActive] = useState(0);
  const current = CASES[active];

  return (
    <section id="solucoes" className="border-t border-border bg-surface-elevated py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Soluções</p>
        <h2 className="mt-3 max-w-[620px] text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.3rem]">
          Uma plataforma que acompanha o jeito do seu negócio atender.
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div
            role="tablist"
            aria-label="Tipos de operação atendidos pelo Autofluxe"
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {CASES.map((item, index) => {
              const tabClass = [
                "shrink-0 rounded-md border px-4 py-3 text-left text-sm font-medium transition-colors lg:w-full",
                active === index
                  ? "border-brand-deep bg-white text-brand-deep shadow-[0_10px_18px_-18px_rgba(224,84,12,0.65)]"
                  : "border-transparent text-muted hover:border-border-strong hover:bg-white hover:text-ink",
              ].join(" ");

              return (
                <button
                  key={item.key}
                  role="tab"
                  aria-selected={active === index}
                  onClick={() => setActive(index)}
                  className={tabClass}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-border bg-white p-6 shadow-panel sm:p-10">
            <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-[320px]">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-deep">{current.caption}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{current.copy}</p>
              </div>
              <div className="shrink-0">
                {current.device === "totem" ? (
                  <TotemVertical sizeClass="[--dw:150px] sm:[--dw:170px]" tilt={false}>
                    {current.screen}
                  </TotemVertical>
                ) : (
                  <LandscapeTV sizeClass="[--dw:230px] sm:[--dw:280px]">{current.screen}</LandscapeTV>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
