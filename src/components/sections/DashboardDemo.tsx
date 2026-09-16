import {
  LayoutDashboard,
  Megaphone,
  MonitorSmartphone,
  PlaySquare,
  CalendarClock,
  Images,
  BarChart3,
  MonitorCheck,
} from "lucide-react";
import ScreenPlayer from "../devices/ScreenPlayer";
import { MenuScreen, PromoScreen, VideoScreen, CorporateScreen } from "../devices/screens";
import StatusDot from "../ui/StatusDot";
import Tooltip from "../ui/Tooltip";

const NAV = [
  { icon: LayoutDashboard, label: "Visão geral", active: true },
  { icon: Megaphone, label: "Pedidos" },
  { icon: MonitorSmartphone, label: "Totens" },
  { icon: PlaySquare, label: "Cozinha" },
  { icon: CalendarClock, label: "Retirada" },
  { icon: Images, label: "Cardápio" },
  { icon: BarChart3, label: "Relatórios" },
];

const STATS = [
  { label: "Pedidos ativos", value: "28" },
  { label: "Totens online", value: "12" },
  { label: "Tempo médio", value: "08m" },
];

const FLOWS = [
  { title: "Cardápio almoço", screen: <MenuScreen />, live: true, hint: "Atualizado há 12s" },
  { title: "Promoção do dia", screen: <PromoScreen />, hint: "Totem online" },
  { title: "Retirada", screen: <VideoScreen />, hint: "Fila atualizada" },
  { title: "Cozinha", screen: <CorporateScreen />, hint: "KDS sincronizado" },
];

const DEVICES = [
  { name: "Totem Entrada", location: "Matriz", status: "online" as const, sync: "há 12s" },
  { name: "KDS Cozinha", location: "Matriz", status: "online" as const, sync: "há 20s" },
  { name: "Painel de retirada", location: "Loja 02", status: "syncing" as const, sync: "sincronizando" },
  { name: "Totem Drive-thru", location: "Franquia SP", status: "offline" as const, sync: "há 2h" },
];

export default function DashboardDemo() {
  return (
    <section className="border-t border-border bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="max-w-[600px]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Visão da operação</p>
          <h2 className="mt-3 text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.3rem]">
            O painel que acompanha seu restaurante em tempo real.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Sem planilhas ou mensagens improvisadas. A equipe acompanha pedidos, dispositivos e filas em um só lugar.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-[#313A4A] bg-ink shadow-lift">
          <div className="flex flex-col lg:flex-row">
            <aside className="flex shrink-0 gap-1 overflow-x-auto border-b border-white/10 bg-[#1D2330] p-3 lg:w-[220px] lg:flex-col lg:gap-1 lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4">
              {NAV.map((item) => {
                const itemClass = [
                  "flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-md px-3 py-2 text-[13px]",
                  item.active ? "bg-signal/15 text-signal-soft" : "text-[#AAB3C1]",
                ].join(" ");

                return (
                  <div key={item.label} className={itemClass}>
                    <item.icon className="h-4 w-4" strokeWidth={1.7} />
                    <span className="hidden sm:inline">{item.label}</span>
                  </div>
                );
              })}
            </aside>

            <div className="flex-1 p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#D3D9E2]">Bom dia, Ana</p>
                  <p className="font-mono text-[11px] text-white/45">Ter, 15 set · 09:12</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-[#D3D9E2]">
                  <MonitorCheck className="h-3.5 w-3.5 text-success" strokeWidth={1.8} />
                  Operação estável
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {STATS.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-white/10 bg-[#202735] p-4">
                    <p className="font-display text-2xl font-bold text-paper sm:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-[11px] leading-tight text-[#AAB3C1]">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-[13px] font-medium text-paper/90">Fluxos ativos</p>
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

              <div className="mt-8">
                <p className="text-[13px] font-medium text-paper/90">Pontos da operação</p>
                <div className="mt-3 divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
                  {DEVICES.map((device) => (
                    <div
                      key={device.name}
                      className="flex flex-wrap items-center justify-between gap-2 bg-[#202735] px-4 py-3 text-[13px]"
                    >
                      <div>
                        <p className="text-paper/90">{device.name}</p>
                        <p className="text-[11px] text-white/45">{device.location}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[11px] text-white/45">{device.sync}</span>
                        <StatusDot status={device.status} className="text-[#D3D9E2]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
