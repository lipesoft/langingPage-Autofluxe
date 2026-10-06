import {
  BarChart3,
  CalendarClock,
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  MonitorCheck,
  MonitorSmartphone,
  PanelsTopLeft,
  Utensils,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import StatusDot from "../ui/StatusDot";

const NAV = [
  { icon: LayoutDashboard, label: "Visão geral", active: true },
  { icon: ClipboardList, label: "Pedidos" },
  { icon: MonitorSmartphone, label: "Totens" },
  { icon: ChefHat, label: "Cozinha" },
  { icon: CalendarClock, label: "Retirada" },
  { icon: Utensils, label: "Cardápio" },
  { icon: BarChart3, label: "Relatórios" },
];

const DEVICES = [
  { name: "Totem de entrada", location: "Unidade A", status: "online" as const, sync: "agora" },
  { name: "KDS da cozinha", location: "Unidade A", status: "online" as const, sync: "agora" },
  { name: "Painel de retirada", location: "Unidade A", status: "syncing" as const, sync: "em atualização" },
  { name: "Totem de atendimento", location: "Unidade B", status: "offline" as const, sync: "sem sinal" },
];

export default function DashboardDemo({ orderStage }: { orderStage: number }) {
  const reduceMotion = usePrefersReducedMotion();
  const activeOrders = orderStage >= 0 && orderStage < 4 ? 29 : 28;
  const orderLabel =
    orderStage < 0
      ? "Aguardando simulação"
      : orderStage === 0
        ? "Pedido #042 criado no totem"
        : orderStage === 1
          ? "Pedido #042 recebido pela operação"
          : orderStage === 2
            ? "Pedido #042 em preparo no KDS"
            : orderStage === 3
              ? "Pedido #042 pronto para retirada"
              : "Pedido #042 retirado";

  const stats = [
    { label: "Pedidos ativos", value: String(activeOrders) },
    { label: "Pontos online", value: "12" },
    { label: "Tempo médio de preparo", value: "08m" },
  ];

  return (
    <section id="painel" className="border-t border-border bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="max-w-[620px]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Visão da operação</p>
          <h2 className="mt-3 text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.35rem]">
            Uma leitura central para acompanhar a operação.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Veja como pedidos, pontos de atendimento e andamento podem aparecer em um painel. Os dados abaixo são demonstrativos, não vêm de uma loja conectada.
          </p>
        </div>

        <div className="mt-9 overflow-hidden rounded-2xl border border-[#313A4A] bg-ink shadow-lift">
          <div className="flex flex-col lg:flex-row">
            <aside
              aria-label="Áreas do painel ilustrativo"
              className="flex shrink-0 gap-1 overflow-x-auto border-b border-white/10 bg-[#1D2330] p-3 lg:w-[190px] lg:flex-col lg:gap-1 lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4"
            >
              {NAV.map((item) => {
                const itemClass = [
                  "flex min-h-11 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-md px-3 py-2 text-xs",
                  item.active ? "bg-signal/15 text-signal-soft" : "text-[#AAB3C1]",
                ].join(" ");

                return (
                  <div key={item.label} className={itemClass}>
                    <item.icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </aside>

            <div className="min-w-0 flex-1 p-4 sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#D3D9E2]">Painel de demonstração</p>
                  <p className="mt-1 font-mono text-xs text-white/55">Unidade de exemplo · pedido #042</p>
                </div>
                <div className="flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-[#D3D9E2]">
                  <MonitorCheck className="h-4 w-4 text-success" strokeWidth={1.8} aria-hidden="true" />
                  Fluxo ilustrado
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="min-h-[102px] rounded-lg border border-white/10 bg-[#202735] p-3 sm:p-4">
                    <p className="font-display text-xl font-bold tabular-nums text-paper sm:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-xs leading-snug text-[#D3D9E2]">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex min-h-[52px] flex-wrap items-center justify-between gap-2 rounded-lg border border-signal/25 bg-signal/10 px-3.5 py-3">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={orderLabel}
                    className="text-xs font-semibold text-white/90"
                    aria-live="polite"
                    initial={reduceMotion ? false : { opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -4 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  >
                    {orderLabel}
                  </motion.span>
                </AnimatePresence>
                <span className="font-mono text-xs uppercase tracking-wide text-signal-soft">Simulação</span>
              </div>

              <div className="mt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-paper/90">Pontos da operação</p>
                  <p className="text-xs text-white/45">estados de exemplo</p>
                </div>
                <ul className="mt-3 divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
                  {DEVICES.map((device) => (
                    <li key={device.name} className="flex min-h-[60px] flex-wrap items-center justify-between gap-2 bg-[#202735] px-3 py-3 text-sm sm:px-4">
                      <span>
                        <span className="block text-paper/90">{device.name}</span>
                        <span className="block text-xs text-white/55">{device.location}</span>
                      </span>
                      <span className="flex items-center gap-3 sm:gap-4">
                        <span className="text-xs text-white/55">{device.sync}</span>
                        <StatusDot status={device.status} className="text-[#D3D9E2]" />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
