import { ReactNode } from "react";
import StatusDot from "../ui/StatusDot";

export default function DigitalDisplay({
  children,
  sizeClass = "[--dw:160px] sm:[--dw:190px] lg:[--dw:210px]",
  className = "",
  statusLabel,
}: {
  children: ReactNode;
  sizeClass?: string;
  className?: string;
  statusLabel?: string;
}) {
  return (
    <div className={`relative mx-auto flex flex-col items-center ${sizeClass} ${className}`}>
      <div className="relative w-[var(--dw)] rounded-[calc(var(--dw)*0.05)] border border-white/[0.08] bg-gradient-to-b from-[#1B1F27] to-[#0D0F13] p-[calc(var(--dw)*0.04)] shadow-panel">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(var(--dw)*0.025)] bg-[#05060a]">
          {children}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
        </div>
      </div>

      {/* articulated arm + weighted base, desk/counter mount */}
      <div className="h-[calc(var(--dw)*0.09)] w-[3px] bg-gradient-to-b from-[#20242c] to-[#14171d]" />
      <div className="h-[calc(var(--dw)*0.025)] w-[calc(var(--dw)*0.4)] rounded-full bg-gradient-to-b from-[#22262e] to-[#14171d]" />

      {statusLabel && (
        <div className="mt-[calc(var(--dw)*0.06)]">
          <StatusDot status="online" label={statusLabel} />
        </div>
      )}

      <div className="mt-[calc(var(--dw)*0.03)] h-[calc(var(--dw)*0.035)] w-[calc(var(--dw)*0.5)] rounded-[50%] bg-black/50 blur-md" />
    </div>
  );
}
