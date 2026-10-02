import {
  BarChart3,
  ChefHat,
  MonitorSmartphone,
  PanelsTopLeft,
  Store,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

function OperationNode({
  icon: Icon,
  label,
  detail,
  className = "",
}: {
  icon: LucideIcon;
  label: string;
  detail: string;
  className?: string;
}) {
  return (
    <div className={"relative z-10 flex min-w-0 items-center gap-2.5 rounded-xl border border-border bg-white/95 px-3 py-2.5 shadow-[0_14px_30px_-26px_rgba(36,44,55,0.55)] sm:gap-3 sm:px-3.5 " + className}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF1E6] text-brand-deep">
        <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[11px] font-bold text-ink sm:text-xs">{label}</span>
        <span className="mt-0.5 block truncate text-[10px] text-muted">{detail}</span>
      </span>
    </div>
  );
}

function DashboardBrain() {
  return (
    <div className="relative z-10 overflow-hidden rounded-2xl border border-[#303946] bg-[#171D26] text-white shadow-[0_28px_70px_-36px_rgba(24,30,39,0.65)]">
      <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-3 sm:px-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFA000] to-[#E02010]">
            <PanelsTopLeft size={14} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-[11px] font-bold tracking-wide">Autofluxe</span>
            <span className="block text-[9px] text-white/50">Painel da operação</span>
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[9px] font-medium text-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Visão demonstrativa
        </span>
      </div>

      <div className="p-3.5 sm:p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Central de operação</p>
            <p className="mt-1 text-sm font-semibold sm:text-base">Tudo em um fluxo</p>
          </div>
          <span className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[9px] text-white/55">Unidade exemplo</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-2">
            <p className="text-[9px] text-white/50">Pedidos</p>
            <p className="mt-1 text-[11px] font-semibold text-white/90">Em andamento</p>
            <div className="mt-2 flex gap-1" aria-hidden="true">
              <span className="h-1.5 flex-1 rounded-full bg-signal" />
              <span className="h-1.5 flex-1 rounded-full bg-signal/60" />
              <span className="h-1.5 flex-1 rounded-full bg-white/15" />
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-2">
            <p className="text-[9px] text-white/50">Cozinha</p>
            <p className="mt-1 text-[11px] font-semibold text-white/90">KDS conectado</p>
            <span className="mt-2 inline-flex items-center gap-1 text-[9px] text-emerald-200">
              <ChefHat size={11} aria-hidden="true" /> Fluxo de preparo
            </span>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-2">
            <p className="text-[9px] text-white/50">Retirada</p>
            <p className="mt-1 text-[11px] font-semibold text-white/90">Status visível</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#FFA000] to-[#E02010]" />
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-[#202833] px-2.5 py-2">
          <span className="flex items-center gap-2 text-[10px] text-white/75">
            <MonitorSmartphone size={13} className="text-signal-soft" aria-hidden="true" />
            Totem enviou um novo pedido
          </span>
          <span className="font-mono text-[9px] text-white/45">AGORA</span>
        </div>
      </div>
    </div>
  );
}

export default function ConnectedOperation() {
  const reduceMotion = usePrefersReducedMotion();
  const pulses = [
    { path: "M350 47 L350 78", from: { cx: 350, cy: 47 }, to: { cx: 350, cy: 78 }, delay: 0 },
    { path: "M142 215 L187 215", from: { cx: 142, cy: 215 }, to: { cx: 187, cy: 215 }, delay: 0.45 },
    { path: "M513 215 L558 215", from: { cx: 513, cy: 215 }, to: { cx: 558, cy: 215 }, delay: 0.9 },
    { path: "M350 352 L350 382", from: { cx: 350, cy: 352 }, to: { cx: 350, cy: 382 }, delay: 1.35 },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[700px]">
      <div className="relative hidden min-h-[430px] grid-cols-[minmax(96px,1fr)_minmax(0,3.1fr)_minmax(96px,1fr)] grid-rows-[72px_minmax(0,1fr)_72px] items-center gap-x-3 gap-y-1 md:grid lg:gap-x-5">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 700 430" preserveAspectRatio="none" aria-hidden="true">
          {pulses.map((pulse, index) => (
            <g key={pulse.path}>
              <path d={pulse.path} fill="none" stroke="#D8DEE6" strokeWidth="1.5" strokeDasharray="3 5" />
              <motion.circle
                r="3.5"
                fill="#F36A0B"
                initial={pulse.from}
                animate={reduceMotion ? pulse.to : { cx: [pulse.from.cx, pulse.to.cx], cy: [pulse.from.cy, pulse.to.cy], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: reduceMotion ? 0 : 1.25,
                  delay: reduceMotion ? 0 : pulse.delay,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "linear",
                }}
              />
            </g>
          ))}
        </svg>
        <div className="col-start-2 row-start-1 mx-auto w-[min(100%,240px)]">
          <OperationNode icon={ChefHat} label="KDS · Cozinha" detail="Pedidos em preparo" />
        </div>
        <div className="col-start-1 row-start-2">
          <OperationNode icon={MonitorSmartphone} label="Totem" detail="Entrada do pedido" />
        </div>
        <div className="col-start-2 row-start-2">
          <DashboardBrain />
        </div>
        <div className="col-start-3 row-start-2">
          <OperationNode icon={PanelsTopLeft} label="Retirada" detail="Status do pedido" />
        </div>
        <div className="col-start-2 row-start-3 mx-auto w-[min(100%,240px)]">
          <OperationNode icon={BarChart3} label="Gestão" detail="Visão da operação" />
        </div>
      </div>

      <div className="md:hidden">
        <DashboardBrain />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <OperationNode icon={MonitorSmartphone} label="Totem" detail="Entrada do pedido" />
          <OperationNode icon={ChefHat} label="KDS · Cozinha" detail="Pedidos em preparo" />
          <OperationNode icon={PanelsTopLeft} label="Retirada" detail="Status do pedido" />
          <OperationNode icon={Store} label="Gestão" detail="Visão da operação" />
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] text-muted">Interface ilustrativa · os dados não vêm de uma operação real</p>
    </div>
  );
}
