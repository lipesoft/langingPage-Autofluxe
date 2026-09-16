type Status = "online" | "offline" | "syncing" | "scheduled";

const STATUS_MAP: Record<Status, { color: string; label: string; pulse: boolean }> = {
  online: { color: "bg-success", label: "Online", pulse: true },
  offline: { color: "bg-muted-2", label: "Offline", pulse: false },
  syncing: { color: "bg-signal", label: "Sincronizando", pulse: true },
  scheduled: { color: "bg-warning", label: "Agendado", pulse: false },
};

export default function StatusDot({
  status,
  label,
  size = "sm",
  className = "",
}: {
  status: Status;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const config = STATUS_MAP[status];
  const dot = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
  const wrapperClass = ["inline-flex items-center gap-1.5 text-xs text-muted", className].join(" ");
  const pulseClass = ["absolute inset-0 animate-ping-slow rounded-full opacity-60", config.color].join(" ");
  const dotClass = ["relative rounded-full", dot, config.color].join(" ");

  return (
    <span className={wrapperClass}>
      <span className="relative inline-flex">
        {config.pulse && <span className={pulseClass} aria-hidden="true" />}
        <span className={dotClass} aria-hidden="true" />
      </span>
      <span>{label ?? config.label}</span>
    </span>
  );
}
