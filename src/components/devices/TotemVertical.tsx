import { ReactNode } from "react";
import StatusDot from "../ui/StatusDot";

export default function TotemVertical({
  children,
  sizeClass = "[--dw:172px] sm:[--dw:200px] lg:[--dw:224px]",
  className = "",
  statusLabel,
  tilt = true,
}: {
  children: ReactNode;
  sizeClass?: string;
  className?: string;
  statusLabel?: string;
  tilt?: boolean;
}) {
  return (
    <div
      className={`relative mx-auto flex flex-col items-center ${sizeClass} ${className}`}
      style={tilt ? { transform: "perspective(1400px) rotateY(-6deg) rotateX(1deg)" } : undefined}
    >
      {/* body / bezel */}
      <div
        className="relative w-[var(--dw)] rounded-[calc(var(--dw)*0.065)] border border-[#C9D0D9] bg-gradient-to-b from-[#FFFFFF] via-[#F2F4F6] to-[#DBE0E5] p-[calc(var(--dw)*0.05)] shadow-[0_18px_34px_-20px_rgba(36,44,55,0.75)]"
      >
        {/* sensor */}
        <div className="mx-auto mb-[calc(var(--dw)*0.045)] h-[3px] w-[3px] rounded-full bg-ink/25" />

        {/* screen */}
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[calc(var(--dw)*0.03)] bg-[#171C26]">
          {children}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
        </div>

        {statusLabel && (
          <div className="mt-[calc(var(--dw)*0.05)] flex items-center justify-center">
            <StatusDot status="online" label={statusLabel} />
          </div>
        )}
      </div>

      {/* neck */}
      <div className="h-[calc(var(--dw)*0.14)] w-[calc(var(--dw)*0.15)] bg-gradient-to-b from-[#3B4554] to-[#1B2230]" />

      {/* base */}
      <div className="h-[calc(var(--dw)*0.045)] w-[calc(var(--dw)*0.52)] rounded-full bg-gradient-to-b from-[#3B4554] to-[#1B2230] shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset]" />

      {/* contact shadow */}
      <div className="mt-[calc(var(--dw)*0.05)] h-[calc(var(--dw)*0.045)] w-[calc(var(--dw)*0.62)] rounded-[50%] bg-black/55 blur-md" />
    </div>
  );
}
