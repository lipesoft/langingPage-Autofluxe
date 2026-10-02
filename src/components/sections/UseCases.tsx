import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import LandscapeTV from "../devices/LandscapeTV";
import TotemVertical from "../devices/TotemVertical";
import { OperationOverviewScreen, PromoScreen } from "../devices/screens/ContentScreens";
import { MenuScreen } from "../devices/screens/MenuScreen";
import { PickupScreen } from "../devices/screens/PickupScreen";

const CASES = [
  {
    key: "restaurantes",
    label: "Restaurantes",
    problem: "Fila e pedidos espalhados em pontos diferentes.",
    resolution: "O exemplo conecta entrada do pedido, cozinha e retirada em uma mesma sequência.",
    device: "totem",
    screen: <MenuScreen />,
  },
  {
    key: "fast-casual",
    label: "Fast casual",
    problem: "Muitas escolhas e um atendimento que precisa manter ritmo.",
    resolution: "O fluxo visual aproxima cardápio, pedido e preparo.",
    device: "tv",
    screen: <PromoScreen />,
  },
  {
    key: "praca",
    label: "Praças de alimentação",
    problem: "Dúvidas sobre o andamento do pedido no balcão.",
    resolution: "Uma tela de retirada pode apresentar os pedidos prontos com mais clareza.",
    device: "tv",
    screen: <PickupScreen />,
  },
  {
    key: "cafeterias",
    label: "Cafeterias",
    problem: "Cardápio e destaques mudam ao longo do dia.",
    resolution: "A demonstração mostra itens, combinações e campanhas organizados em tela.",
    device: "totem",
    screen: <PromoScreen />,
  },
  {
    key: "retirada",
    label: "Operações com retirada",
    problem: "A equipe precisa explicar o status de cada pedido.",
    resolution: "O estágio de retirada aparece como parte do mesmo fluxo do pedido.",
    device: "tv",
    screen: <PickupScreen />,
  },
  {
    key: "franquias",
    label: "Franquias",
    problem: "Cada unidade pode ter pontos e rotinas diferentes.",
    resolution: "A interface ilustrativa apresenta uma visão organizada por unidade.",
    device: "tv",
    screen: <OperationOverviewScreen />,
  },
];

export default function UseCases() {
  const [active, setActive] = useState(0);
  const [verticalTabs, setVerticalTabs] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = CASES[active];

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const updateOrientation = () => setVerticalTabs(media.matches);
    updateOrientation();
    media.addEventListener("change", updateOrientation);
    return () => media.removeEventListener("change", updateOrientation);
  }, []);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight" || (verticalTabs && event.key === "ArrowDown")) nextIndex = (index + 1) % CASES.length;
    else if (event.key === "ArrowLeft" || (verticalTabs && event.key === "ArrowUp")) nextIndex = (index - 1 + CASES.length) % CASES.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = CASES.length - 1;
    else return;

    event.preventDefault();
    setActive(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section id="solucoes" className="border-t border-border bg-surface-elevated py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Soluções</p>
          <h2 className="mt-3 max-w-[620px] text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.3rem]">
            O mesmo fluxo, aplicado a diferentes rotinas.
          </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div
            role="tablist"
            aria-label="Exemplos de tipos de operação"
            aria-orientation={verticalTabs ? "vertical" : "horizontal"}
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
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={"solution-tab-" + item.key}
                  role="tab"
                  aria-selected={active === index}
                  aria-controls="solution-panel"
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={tabClass}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div id="solution-panel" role="tabpanel" aria-labelledby={"solution-tab-" + current.key} tabIndex={0} className="rounded-xl border border-border bg-white p-6 shadow-panel sm:p-10">
            <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-[360px]">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-2">Desafio da rotina</p>
                <p className="mt-2 text-[15px] font-semibold leading-relaxed text-ink">{current.problem}</p>
                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-brand-deep">No fluxo Autofluxe</p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{current.resolution}</p>
                <p className="mt-3 text-[10px] leading-relaxed text-muted-2">Exemplo visual; módulos e compatibilidade devem ser validados com a equipe.</p>
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
