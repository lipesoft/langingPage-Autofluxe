export default function SyncLoader({ label = "Sincronizando telas" }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-3" role="status" aria-live="polite">
      <div className="flex items-end gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="block h-3 w-2 rounded-[2px] bg-border-strong"
            style={{
              animation: `sync-bar 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
      <span className="text-xs text-muted mono-tabular">{label}…</span>
      <style>{`
        @keyframes sync-bar {
          0%, 100% { background-color: #CCD2DA; transform: scaleY(1); }
          35% { background-color: #FF8000; transform: scaleY(1.6); }
        }
        @media (prefers-reduced-motion: reduce) {
          span[style] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
