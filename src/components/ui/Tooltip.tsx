import { ReactNode, useState } from "react";

export default function Tooltip({
  label,
  children,
  side = "top",
  className = "relative inline-flex",
}: {
  label: string;
  children: ReactNode;
  side?: "top" | "bottom";
  className?: string;
}) {
  const [show, setShow] = useState(false);
  const placement = side === "top" ? "bottom-full mb-2" : "top-full mt-2";
  const visibility = show ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0";
  const tooltipClass = [
    "pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-sm border border-white/15 bg-ink px-2 py-1 text-[11px] text-paper shadow-lift transition-all duration-150",
    placement,
    visibility,
  ].join(" ");

  return (
    <span
      className={className}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      <span role="tooltip" className={tooltipClass}>
        {label}
      </span>
    </span>
  );
}
