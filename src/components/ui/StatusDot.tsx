type Status = "online" | "offline" | "syncing" | "scheduled";

const STATUS_MAP: Record<Status, { color: string; label: string }> = {
  online: { color: "bg-success", label: "Online" },
  offline: { color: "bg-muted-2", label: "Offline" },
  syncing: { color: "bg-signal", label: "Sincronizando" },
  scheduled: { color: "bg-warning", label: "Agendado" },
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
  const dotClass = ["relative rounded-full", dot, config.color].join(" ");

  return (
    <span className={wrapperClass}>
      <span className="relative inline-flex">
        <span className={dotClass} aria-hidden="true" />
      </span>
      <span>{label ?? config.label}</span>
    </span>
  );
}
