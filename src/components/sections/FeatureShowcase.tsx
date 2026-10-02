import { Image, Youtube, Rss, Clock3, MapPin, Film, BarChart3, PackagePlus } from "lucide-react";
import LandscapeTV from "../devices/LandscapeTV";
import { SplitZonesScreen } from "../devices/screens";
import StatusDot from "../ui/StatusDot";

const FORMATS = [
  { icon: Image, label: "Cardápios" },
  { icon: Film, label: "Combos" },
  { icon: PackagePlus, label: "Adicionais" },
  { icon: Rss, label: "Promoções" },
  { icon: Clock3, label: "Horários" },
  { icon: MapPin, label: "Unidades" },
  { icon: BarChart3, label: "Relatórios" },
];

const DEVICES = [
  { name: "Totem Entrada", status: "online" as const },
  { name: "KDS Cozinha", status: "online" as const },
  { name: "Painel de retirada", status: "syncing" as const },
  { name: "Totem Drive-thru", status: "offline" as const },
];

function ManagementMap() {
  const nodes = [
    { x: 60, y: 30, label: "Matriz" },
    { x: 260, y: 20, label: "Totem" },
    { x: 40, y: 140, label: "Cozinha" },
    { x: 250, y: 150, label: "Retirada" },
  ];

  return (
    <svg viewBox="0 0 300 170" className="w-full" role="img" aria-label="Operação conectada a um painel central">
      {nodes.map((node) => (
        <line key={node.label} x1="150" y1="85" x2={node.x} y2={node.y} stroke="#E2E5E9" strokeWidth="1.2" />
      ))}
      <circle cx="150" cy="85" r="7" fill="#FF8000" />
      <circle cx="150" cy="85" r="12" fill="none" stroke="#E02010" strokeOpacity="0.35" strokeWidth="1" />
      {nodes.map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy={node.y} r="4" fill="#687180" />
          <text x={node.x} y={node.y - 10} fontSize="8" fill="#687180" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ScheduleTimeline() {
  const blocks = [
    { start: 8, end: 12, label: "Café da manhã", color: "bg-signal/70" },
    { start: 12, end: 18, label: "Almoço", color: "bg-signal/45" },
    { start: 18, end: 22, label: "Jantar", color: "bg-brand-red" },
  ];

  return (
    <div>
      <div className="flex h-6 w-full overflow-hidden rounded-sm border border-border-strong">
        {blocks.map((block) => (
          <div
            key={block.label}
            className={[block.color, "h-full"].join(" ")}
            style={{ width: ((block.end - block.start) / 14) * 100 + "%" }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
        <span>08:00</span>
        <span>15:00</span>
        <span>22:00</span>
      </div>
    </div>
  );
}

function MiniReportChart() {
  return (
    <svg viewBox="0 0 360 92" className="h-[92px] w-full" role="img" aria-label="Gráfico ilustrativo, sem métricas reais">
      <path d="M0 72H360M0 46H360M0 20H360" stroke="#E7E9ED" strokeDasharray="3 5" />
      <path d="M8 65C38 63 43 43 72 47S106 65 136 45 169 29 198 37 232 59 262 34 304 40 352 14" fill="none" stroke="#E8540C" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 65C38 63 43 43 72 47S106 65 136 45 169 29 198 37 232 59 262 34 304 40 352 14V92H8Z" fill="url(#report-fill)" opacity="0.13" />
      <defs>
        <linearGradient id="report-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E8540C" />
          <stop offset="1" stopColor="#E8540C" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function FeatureShowcase() {
  return (
    <section id="recursos" className="border-t border-border bg-surface-elevated py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Recursos para a rotina real</p>
        <h2 className="mt-3 max-w-[620px] text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.3rem]">
          Partes reais da rotina em uma visão de produto.
        </h2>
        <p className="mt-3 max-w-prose text-xs leading-relaxed text-muted-2">
          Os cards mostram exemplos de interface e estados demonstrativos; não são dados de clientes.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-6 lg:grid-rows-2">
          <div className="flex flex-col justify-between gap-8 rounded-lg border border-border bg-white p-7 shadow-panel sm:p-9 lg:col-span-4 lg:row-span-2 lg:flex-row lg:items-center">
            <div className="max-w-[280px]">
              <h3 className="font-display text-xl font-semibold text-ink">Visão por unidade</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Um exemplo de como organizar pontos de operação em uma visão central, preservando o contexto de cada unidade.
              </p>
            </div>
            <div className="flex-1">
              <ManagementMap />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-lg border border-border bg-white p-7 shadow-panel lg:col-span-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">Cardápio por período</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Exemplo visual de horários para organizar itens e destaques ao longo do dia.
              </p>
            </div>
            <ScheduleTimeline />
          </div>

          <div className="rounded-lg border border-border bg-white p-7 shadow-panel lg:col-span-2">
            <h3 className="font-display text-lg font-semibold text-ink">Pontos da operação</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Status demonstrativos de dispositivos que podem compor o fluxo.
            </p>
            <ul className="mt-5 space-y-3">
              {DEVICES.map((device) => (
                <li key={device.name} className="flex items-center justify-between border-t border-border pt-3 text-sm">
                  <span className="text-ink/85">{device.name}</span>
                  <StatusDot status={device.status} />
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[10px] text-muted-2">Unidade e status de exemplo</p>
          </div>

          <div className="flex flex-col gap-8 rounded-lg border border-border bg-white p-7 shadow-panel sm:p-9 lg:col-span-3 sm:flex-row sm:items-center">
            <div className="max-w-[240px]">
              <h3 className="font-display text-lg font-semibold text-ink">Jornadas conectadas</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Pedido, cozinha e retirada aparecem em uma mesma composição visual.
              </p>
            </div>
            <LandscapeTV sizeClass="[--dw:220px]" className="sm:ml-auto">
              <SplitZonesScreen />
            </LandscapeTV>
          </div>

          <div className="rounded-lg border border-border bg-white p-7 shadow-panel sm:p-9 lg:col-span-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-brand-deep" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-ink">Leitura da operação</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">Uma representação de relatório, sem números de uma operação real.</p>
            <div className="mt-4 rounded-lg border border-border bg-[#FFFCF9] px-3 pt-3">
              <MiniReportChart />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {FORMATS.map((format) => (
                <span key={format.label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1.5 text-[10px] font-medium text-muted">
                  <format.icon className="h-3 w-3 text-brand-deep" strokeWidth={1.6} aria-hidden="true" />
                  {format.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
