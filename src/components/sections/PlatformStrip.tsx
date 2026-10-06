import { KeyboardEvent, useRef, useState } from "react";
import {
  BarChart3,
  ChefHat,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  MonitorSmartphone,
  PanelsTopLeft,
  Store,
  Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

type ModuleView = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  rows: Array<{ name: string; detail: string; status: string }>;
};

const MODULES: ModuleView[] = [
  {
    id: "visao-geral",
    label: "Visão geral",
    icon: LayoutDashboard,
    title: "A operação em uma visão",
    description: "Uma leitura central para acompanhar o que acontece entre pedido, preparo e retirada.",
    rows: [
      { name: "Pedidos", detail: "Entrada e andamento", status: "Fluxo" },
      { name: "Cozinha", detail: "Fila de preparo", status: "KDS" },
      { name: "Retirada", detail: "Chamada do pedido", status: "Painel" },
    ],
  },
  {
    id: "pedidos",
    label: "Pedidos",
    icon: ClipboardList,
    title: "Pedidos com contexto",
    description: "Veja a origem e o status do pedido enquanto ele segue pela operação.",
    rows: [
      { name: "Pedido #042", detail: "Totem · recebido", status: "Novo" },
      { name: "Pedido #041", detail: "Cozinha · em preparo", status: "KDS" },
      { name: "Pedido #038", detail: "Balcão · pronto", status: "Retirada" },
    ],
  },
  {
    id: "caixa",
    label: "Caixa",
    icon: CreditCard,
    title: "Caixa dentro do mesmo fluxo",
    description: "Uma visão de demonstração para relacionar atendimento, pedidos e caixa.",
    rows: [
      { name: "Movimentações", detail: "Resumo da unidade", status: "Exemplo" },
      { name: "Fechamento", detail: "Conferência do período", status: "Exemplo" },
      { name: "Recebimentos", detail: "Meios de pagamento", status: "Exemplo" },
    ],
  },
  {
    id: "cozinha",
    label: "Cozinha · KDS",
    icon: ChefHat,
    title: "Uma fila clara para a cozinha",
    description: "Pedidos organizados por etapa para a equipe identificar o que preparar.",
    rows: [
      { name: "Pedido #042", detail: "Combo executivo", status: "Novo" },
      { name: "Pedido #041", detail: "Prato do dia", status: "Em preparo" },
      { name: "Pedido #038", detail: "Bebida e acompanhamento", status: "Pronto" },
    ],
  },
  {
    id: "totens",
    label: "Totens",
    icon: MonitorSmartphone,
    title: "Autoatendimento conectado",
    description: "O pedido começa no ponto de atendimento e segue para as próximas etapas.",
    rows: [
      { name: "Totem de entrada", detail: "Cardápio de exemplo", status: "Unidade A" },
      { name: "Totem de retirada", detail: "Fluxo ilustrativo", status: "Unidade A" },
      { name: "Pedido #042", detail: "Origem: autoatendimento", status: "Recebido" },
    ],
  },
  {
    id: "retirada",
    label: "Retirada",
    icon: PanelsTopLeft,
    title: "A última etapa também é parte do fluxo",
    description: "Status de pedido em destaque para organizar a chamada no balcão.",
    rows: [
      { name: "Pedido #042", detail: "Ana · exemplo", status: "Pronto" },
      { name: "Pedido #041", detail: "Em preparo", status: "Aguardando" },
      { name: "Pedido #038", detail: "Concluído", status: "Retirado" },
    ],
  },
  {
    id: "cardapio",
    label: "Cardápio",
    icon: Utensils,
    title: "Cardápio organizado para a rotina",
    description: "Itens, combinações e disponibilidade apresentados em uma interface única.",
    rows: [
      { name: "Combo executivo", detail: "Item de demonstração", status: "Ativo" },
      { name: "Prato do dia", detail: "Item de demonstração", status: "Ativo" },
      { name: "Suco natural", detail: "Item de demonstração", status: "Ativo" },
    ],
  },
  {
    id: "relatorios",
    label: "Relatórios",
    icon: BarChart3,
    title: "Uma leitura visual da operação",
    description: "Exemplo de como informações da rotina podem aparecer no painel.",
    rows: [
      { name: "Pedidos por período", detail: "Agrupamento de exemplo", status: "Relatório" },
      { name: "Tempo de preparo", detail: "Indicador de exemplo", status: "Relatório" },
      { name: "Comparativo por unidade", detail: "Visão de exemplo", status: "Relatório" },
    ],
  },
  {
    id: "unidades",
    label: "Unidades",
    icon: Store,
    title: "Uma visão para diferentes unidades",
    description: "Um exemplo visual de organização por ponto de operação.",
    rows: [
      { name: "Unidade A", detail: "Visão de exemplo", status: "Unidade" },
      { name: "Unidade B", detail: "Visão de exemplo", status: "Unidade" },
      { name: "Unidade C", detail: "Visão de exemplo", status: "Unidade" },
    ],
  },
];

export default function PlatformStrip() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = usePrefersReducedMotion();
  const current = MODULES[active];
  const ActiveIcon = current.icon;

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % MODULES.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + MODULES.length) % MODULES.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = MODULES.length - 1;
    else return;

    event.preventDefault();
    selectTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

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

  return (
    <section id="produto" className="border-t border-border bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="max-w-[650px]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">A plataforma</p>
          <h2 className="mt-3 text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.35rem]">
            Uma visão central para cada etapa do restaurante.
          </h2>
          <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted">
            Explore as áreas da plataforma e veja como o pedido pode seguir da entrada à gestão.
          </p>
        </div>

        <div className="mt-9 overflow-hidden rounded-2xl border border-[#303946] bg-[#171D26] shadow-lift">
          <div className="border-b border-white/10 px-4 py-3 sm:px-5">
            <p className="text-xs font-medium text-white/55">Módulos apresentados na demonstração</p>
            <div
              className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin]"
              role="tablist"
              aria-label="Módulos ilustrativos da plataforma Autofluxe"
              aria-orientation="horizontal"
            >
              {MODULES.map((module, index) => {
                const Icon = module.icon;
                const selected = index === active;
                return (
                  <button
                    key={module.id}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    id={"platform-tab-" + module.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="platform-module-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectTab(index)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={[
                      "relative isolate inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                      selected ? "text-ink" : "text-white/65 hover:bg-white/[0.08] hover:text-white",
                    ].join(" ")}
                  >
                    {selected && <motion.span layoutId="platform-tab-indicator" className="absolute inset-0 -z-10 rounded-lg bg-white shadow-sm" transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }} />}
                    <Icon size={15} aria-hidden="true" />
                    <span>{module.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id="platform-module-panel"
            role="tabpanel"
            aria-labelledby={"platform-tab-" + current.id}
            tabIndex={0}
            className="min-h-[340px] p-4 sm:p-7"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center"
              >
                <div className="max-w-[420px]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFA000] to-[#E02010] text-white">
                    <ActiveIcon size={19} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-white sm:text-2xl">{current.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{current.description}</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#202833] p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div>
                      <p className="text-xs font-semibold text-white">{current.label}</p>
                      <p className="mt-1 text-[10px] text-white/45">Unidade demonstrativa</p>
                    </div>
                    <span className="rounded-full bg-white/[0.07] px-2.5 py-1 font-mono text-[10px] text-white/55">EXEMPLO</span>
                  </div>

                  <ul className="mt-4 divide-y divide-white/[0.08]">
                    {current.rows.map((row) => (
                      <li key={row.name} className="flex flex-wrap items-center justify-between gap-2 py-3">
                        <span>
                          <span className="block text-[11px] font-medium text-white/90">{row.name}</span>
                          <span className="mt-0.5 block text-[10px] text-white/45">{row.detail}</span>
                        </span>
                        <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/55">{row.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
