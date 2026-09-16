import { ReactNode } from "react";

export default function ScreenPlayer({
  children,
  sizeClass = "[--dw:72px]",
  className = "",
  ratio = "video",
  live = false,
}: {
  children: ReactNode;
  sizeClass?: string;
  className?: string;
  ratio?: "video" | "square" | "portrait";
  live?: boolean;
}) {
  const aspect = ratio === "video" ? "aspect-video" : ratio === "square" ? "aspect-square" : "aspect-[3/4]";

  return (
    <div className={`relative w-[var(--dw)] ${sizeClass} ${className}`}>
      <div
        className={`relative ${aspect} w-full overflow-hidden rounded-[calc(var(--dw)*0.12)] border border-white/10 bg-[#05060a] shadow-[0_10px_20px_-14px_rgba(0,0,0,0.8)]`}
      >
        {children}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0" />
        {live && (
          <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-black/50 px-1.5 py-0.5 text-[8px] font-medium tracking-wide text-success backdrop-blur-sm">
            <span className="h-1 w-1 rounded-full bg-success animate-pulse-soft" />
            LIVE
          </span>
        )}
      </div>
    </div>
  );
}
