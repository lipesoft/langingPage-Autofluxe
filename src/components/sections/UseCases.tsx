import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const CASES = [
  {
    key: "restaurantes",
    label: "Restaurantes",
    challenge: "Atendimento, cozinha e retirada precisam reconhecer o estado do mesmo pedido.",
    approach: "A demonstração acompanha a origem e o andamento do pedido até a retirada, sem desconectar cada etapa da narrativa.",
    resources: ["Pedidos", "KDS", "Painel de retirada"],
    idealFor: "Operações com atendimento presencial e pedidos para retirada.",
  },
  {
    key: "fast-casual",
    label: "Fast casual",
    challenge: "Um cardápio com combinações precisa manter a escolha e o preparo fáceis de acompanhar.",
    approach: "O fluxo ilustrativo parte do autoatendimento e segue para o acompanhamento do preparo na cozinha.",
    resources: ["Totem", "Cardápio", "KDS"],
    idealFor: "Operações com pedido no balcão ou autoatendimento e preparo centralizado.",
  },
  {
    key: "praca",
    label: "Praças de alimentação",
    challenge: "No balcão compartilhado, a pessoa precisa reconhecer quando o pedido está pronto.",
    approach: "A tela de retirada coloca o número e o estado do pedido em evidência na demonstração.",
    resources: ["Pedidos", "Status de preparo", "Tela de retirada"],
    idealFor: "Restaurantes que chamam pedidos prontos em um balcão de retirada.",
  },
  {
    key: "cafeterias",
    label: "Cafeterias",
    challenge: "Itens, adicionais e destaques de cardápio precisam estar claros no ponto do pedido.",
    approach: "A interface de exemplo apresenta produtos e destaques antes de encaminhar o pedido para a operação.",
    resources: ["Cardápio", "Destaques", "Autoatendimento"],
    idealFor: "Operações com um cardápio compacto e opções que variam por ocasião.",
  },
  {
    key: "retirada",
    label: "Operações com retirada",
    challenge: "Quando o estado não fica visível, a equipe precisa responder repetidamente sobre o andamento.",
    approach: "A demonstração separa pedidos em preparo e prontos e destaca a chamada no painel de retirada.",
    resources: ["KDS", "Status do pedido", "Painel de retirada"],
    idealFor: "Operações em que a retirada no balcão faz parte da jornada do pedido.",
  },
  {
    key: "franquias",
    label: "Franquias",
    challenge: "Uma rede precisa avaliar como acompanhar unidades sem perder o contexto de cada operação.",
    approach: "A interface ilustrativa organiza pontos por unidade; o alcance disponível para a rede deve ser alinhado com a equipe.",
    resources: ["Visão por unidade", "Painel", "Relatórios demonstrativos"],
    idealFor: "Redes avaliando uma visão central da operação de diferentes unidades.",
  },
];

export default function UseCases() {
  const [active, setActive] = useState(0);
  const [verticalTabs, setVerticalTabs] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = usePrefersReducedMotion();
  const current = CASES[active];

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const updateOrientation = () => setVerticalTabs(media.matches);
    updateOrientation();
    media.addEventListener("change", updateOrientation);
    return () => media.removeEventListener("change", updateOrientation);
  }, []);

  function selectTab(index: number) {
    setActive(index);
    window.requestAnimationFrame(() => {
      tabRefs.current[index]?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "nearest",
      });
    });
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight" || (verticalTabs && event.key === "ArrowDown")) nextIndex = (index + 1) % CASES.length;
    else if (event.key === "ArrowLeft" || (verticalTabs && event.key === "ArrowUp")) nextIndex = (index - 1 + CASES.length) % CASES.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = CASES.length - 1;
    else return;

    event.preventDefault();
    selectTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section id="solucoes" className="border-t border-border bg-surface-elevated py-20 sm:py-24">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Feito para a sua operação</p>
        <h2 className="mt-3 max-w-[620px] text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.3rem]">
          Veja onde o Autofluxe pode destravar sua rotina.
        </h2>

        <div className="mt-9 grid gap-6 lg:grid-cols-[250px_1fr] lg:gap-10">
          <div
            role="tablist"
            aria-label="Exemplos de tipos de operação"
            aria-orientation={verticalTabs ? "vertical" : "horizontal"}
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {CASES.map((item, index) => (
              <button
                key={item.key}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`solution-tab-${item.key}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="solution-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => selectTab(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={[
                  "min-h-11 shrink-0 rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-[border-color,background-color,color,box-shadow] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal lg:w-full",
                  active === index
                    ? "border-[#F1C8AE] bg-white text-brand-deep shadow-[0_10px_18px_-18px_rgba(224,84,12,0.65)]"
                    : "border-transparent text-muted hover:border-border-strong hover:bg-white hover:text-ink",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div id="solution-panel" role="tabpanel" aria-labelledby={`solution-tab-${current.key}`} tabIndex={0} className="min-h-[370px] rounded-xl border border-border bg-white p-5 shadow-panel sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.key}
                initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                className="grid gap-6 md:grid-cols-[1fr_0.7fr] md:gap-10"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-2">Desafio</p>
                  <p className="mt-2 text-[15px] font-semibold leading-relaxed text-ink">{current.challenge}</p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wide text-brand-deep">Como o Autofluxe entra no fluxo</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{current.approach}</p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wide text-muted-2">Recursos relevantes na demonstração</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {current.resources.map((resource) => (
                      <li key={resource} className="rounded-full border border-border bg-[#FFFCF9] px-3 py-1.5 text-xs font-medium text-ink">
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>
                <aside className="rounded-lg bg-surface-elevated p-4 sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-2">Ideal para avaliar</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{current.idealFor}</p>
                  <a href="#contato" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-brand-deep underline decoration-[#EBC6AE] underline-offset-4 transition-colors hover:text-brand-red focus-visible:outline-2 focus-visible:outline-signal">
                    Conversar sobre este cenário
                  </a>
                </aside>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
