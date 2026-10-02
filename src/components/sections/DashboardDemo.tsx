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
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import ScreenPlayer from "../devices/ScreenPlayer";
import { PromoScreen } from "../devices/screens/ContentScreens";
import { KdsScreen } from "../devices/screens/KdsScreen";
import { MenuScreen } from "../devices/screens/MenuScreen";
import { PickupScreen } from "../devices/screens/PickupScreen";
import StatusDot from "../ui/StatusDot";
import Tooltip from "../ui/Tooltip";

const NAV = [
  { icon: LayoutDashboard, label: "Visão geral", active: true },
  { icon: ClipboardList, label: "Pedidos" },
  { icon: MonitorSmartphone, label: "Totens" },
  { icon: ChefHat, label: "Cozinha" },
  { icon: CalendarClock, label: "Retirada" },
  { icon: Utensils, label: "Cardápio" },
  { icon: BarChart3, label: "Relatórios" },
];

const FLOWS = [
  { title: "Cardápio", screen: <MenuScreen />, live: false, hint: "Conteúdo de demonstração" },
  { title: "Oferta do dia", screen: <PromoScreen />, live: false, hint: "Conteúdo de demonstração" },
  { title: "Retirada", screen: <PickupScreen />, hint: "Tela ilustrativa" },
  { title: "Cozinha · KDS", screen: <KdsScreen />, hint: "Tela ilustrativa" },
];

const DEVICES = [
  { name: "Totem de entrada", location: "Unidade A · exemplo", status: "online" as const, sync: "agora" },
  { name: "KDS da cozinha", location: "Unidade A · exemplo", status: "online" as const, sync: "agora" },
  { name: "Painel de retirada", location: "Unidade A · exemplo", status: "syncing" as const, sync: "em atualização" },
  { name: "Totem de atendimento", location: "Unidade B · exemplo", status: "offline" as const, sync: "sem sinal" },
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
    { label: "Tempo médio", value: "08m" },
  ];

  return (
    <section id="painel" className="border-t border-border bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="max-w-[620px]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Visão da operação</p>
          <h2 className="mt-3 text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.35rem]">
            O painel que coloca cada etapa no mesmo contexto.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Uma visão central de pedidos, cozinha, dispositivos e retirada — apresentada aqui como demonstração de interface.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#313A4A] bg-ink shadow-lift">
          <div className="flex flex-col lg:flex-row">
            <nav
              aria-label="Módulos ilustrativos"
              className="flex shrink-0 gap-1 overflow-x-auto border-b border-white/10 bg-[#1D2330] p-3 lg:w-[210px] lg:flex-col lg:gap-1 lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4"
            >
              {NAV.map((item) => {
                const itemClass = [
                  "flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-md px-3 py-2 text-[13px]",
                  item.active ? "bg-signal/15 text-signal-soft" : "text-[#AAB3C1]",
                ].join(" ");

                return (
                  <div key={item.label} className={itemClass}>
                    <item.icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </nav>

            <div className="min-w-0 flex-1 p-4 sm:p-7 lg:p-8">
              <p className="mb-5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] leading-relaxed text-white/55">
                Dados, nomes e status desta tela são ilustrativos e não representam uma operação conectada.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#D3D9E2]">Painel de demonstração</p>
                  <p className="font-mono text-[11px] text-white/45">Unidade de exemplo · pedido #042</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-[#D3D9E2]">
                  <MonitorCheck className="h-3.5 w-3.5 text-success" strokeWidth={1.8} aria-hidden="true" />
                  Fluxo ilustrado
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-white/10 bg-[#202735] p-3 sm:p-4">
                    <motion.p
                      key={stat.value}
                      initial={reduceMotion ? false : { opacity: 0.55, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.22 }}
                      className="font-display text-2xl font-bold tabular-nums text-paper sm:text-3xl"
                      aria-live={stat.label === "Pedidos ativos" ? "polite" : undefined}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="mt-1 text-[10px] leading-tight text-[#AAB3C1] sm:text-[11px]">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-signal/25 bg-signal/10 px-3.5 py-3">
                <span className="text-[11px] font-semibold text-white/85" aria-live="polite">{orderLabel}</span>
                <span className="font-mono text-[9px] uppercase tracking-wide text-signal-soft">Simulação</span>
              </div>

              <div className="mt-7">
                <p className="text-[13px] font-medium text-paper/90">Áreas da operação</p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {FLOWS.map((flow) => (
                    <div key={flow.title}>
                      <Tooltip label={flow.hint} className="relative block w-full">
                        <ScreenPlayer sizeClass="[--dw:100%]" ratio="video" live={flow.live}>
                          {flow.screen}
                        </ScreenPlayer>
                      </Tooltip>
                      <p className="mt-2 truncate text-[11px] text-[#AAB3C1]">{flow.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <p className="text-[13px] font-medium text-paper/90">Pontos da operação · exemplo</p>
                <ul className="mt-3 divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
                  {DEVICES.map((device) => (
                    <li key={device.name} className="flex flex-wrap items-center justify-between gap-2 bg-[#202735] px-3 py-3 text-[13px] sm:px-4">
                      <span>
                        <span className="block text-paper/90">{device.name}</span>
                        <span className="block text-[11px] text-white/45">{device.location}</span>
                      </span>
                      <span className="flex items-center gap-3 sm:gap-4">
                        <span className="font-mono text-[10px] text-white/45 sm:text-[11px]">{device.sync}</span>
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
