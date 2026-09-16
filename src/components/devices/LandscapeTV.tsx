import { ReactNode } from "react";
import StatusDot from "../ui/StatusDot";

export default function LandscapeTV({
  children,
  sizeClass = "[--dw:260px] sm:[--dw:320px] lg:[--dw:380px]",
  className = "",
  statusLabel,
  mount = "stand",
}: {
  children: ReactNode;
  sizeClass?: string;
  className?: string;
  statusLabel?: string;
  mount?: "stand" | "wall";
}) {
  return (
    <div className={`relative mx-auto flex flex-col items-center ${sizeClass} ${className}`}>
      {/* body / bezel */}
      <div className="relative w-[var(--dw)] rounded-[calc(var(--dw)*0.028)] border border-white/[0.08] bg-gradient-to-b from-[#1B1F27] to-[#0D0F13] p-[calc(var(--dw)*0.022)] shadow-panel">
        <div className="relative aspect-video w-full overflow-hidden rounded-[calc(var(--dw)*0.014)] bg-[#05060a]">
          {children}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
        </div>
      </div>

      {mount === "stand" ? (
        <>
          <div className="h-[calc(var(--dw)*0.045)] w-[calc(var(--dw)*0.06)] bg-gradient-to-b from-[#20242c] to-[#14171d]" />
          <div className="h-[calc(var(--dw)*0.02)] w-[calc(var(--dw)*0.34)] rounded-full bg-gradient-to-b from-[#22262e] to-[#14171d]" />
        </>
      ) : (
        <div className="h-[calc(var(--dw)*0.018)] w-[calc(var(--dw)*0.1)] rounded-b-[3px] bg-[#1a1d24]" />
      )}

      {statusLabel && (
        <div className="mt-[calc(var(--dw)*0.035)]">
          <StatusDot status="online" label={statusLabel} />
        </div>
      )}

      <div className="mt-[calc(var(--dw)*0.03)] h-[calc(var(--dw)*0.03)] w-[calc(var(--dw)*0.7)] rounded-[50%] bg-black/50 blur-md" />
    </div>
  );
}
