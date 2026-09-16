import { Image, Youtube, Rss, Instagram, CloudSun, AudioLines, Film } from "lucide-react";
import LandscapeTV from "../devices/LandscapeTV";
import { SplitZonesScreen } from "../devices/screens";
import StatusDot from "../ui/StatusDot";

const FORMATS = [
  { icon: Image, label: "Cardápios" },
  { icon: Film, label: "Combos" },
  { icon: Youtube, label: "Adicionais" },
  { icon: Rss, label: "Promoções" },
  { icon: Instagram, label: "Horários" },
  { icon: CloudSun, label: "Unidades" },
  { icon: AudioLines, label: "Relatórios" },
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

export default function FeatureShowcase() {
  return (
    <section id="recursos" className="border-t border-border bg-surface-elevated py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Recursos para a rotina real</p>
        <h2 className="mt-3 max-w-[620px] text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.3rem]">
          Feito para manter o ritmo da operação, mesmo nos horários de pico.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-6 lg:grid-rows-2">
          <div className="flex flex-col justify-between gap-8 rounded-lg border border-border bg-white p-7 shadow-panel sm:p-9 lg:col-span-4 lg:row-span-2 lg:flex-row lg:items-center">
            <div className="max-w-[280px]">
              <h3 className="font-display text-xl font-semibold text-ink">Gestão por unidade</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Acompanhe cada ponto da operação em um painel central, sem perder o contexto de cada loja.
              </p>
            </div>
            <div className="flex-1">
              <ManagementMap />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-lg border border-border bg-white p-7 shadow-panel lg:col-span-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">Cardápio no seu ritmo</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Organize os horários e destaque o que faz sentido para cada momento do dia.
              </p>
            </div>
            <ScheduleTimeline />
          </div>

          <div className="rounded-lg border border-border bg-white p-7 shadow-panel lg:col-span-2">
            <h3 className="font-display text-lg font-semibold text-ink">Operação ao vivo</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Veja onde cada ponto está ativo antes que uma fila apareça.
            </p>
            <ul className="mt-5 space-y-3">
              {DEVICES.map((device) => (
                <li key={device.name} className="flex items-center justify-between border-t border-border pt-3 text-sm">
                  <span className="text-ink/85">{device.name}</span>
                  <StatusDot status={device.status} />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8 rounded-lg border border-border bg-white p-7 shadow-panel sm:p-9 lg:col-span-3 sm:flex-row sm:items-center">
            <div className="max-w-[240px]">
              <h3 className="font-display text-lg font-semibold text-ink">Jornadas flexíveis</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Estruture o fluxo ideal para salão, retirada, balcão ou diferentes unidades.
              </p>
            </div>
            <LandscapeTV sizeClass="[--dw:220px]" className="sm:ml-auto">
              <SplitZonesScreen />
            </LandscapeTV>
          </div>

          <div className="rounded-lg border border-border bg-white p-7 shadow-panel sm:p-9 lg:col-span-3">
            <h3 className="font-display text-lg font-semibold text-ink">Tudo o que seu cardápio precisa</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Tenha os elementos da operação organizados sem depender de ajustes improvisados.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {FORMATS.map((format) => (
                <span
                  key={format.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-white px-3 py-1.5 text-xs font-medium text-muted"
                >
                  <format.icon className="h-3.5 w-3.5 text-brand-deep" strokeWidth={1.6} />
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
