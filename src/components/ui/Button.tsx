import { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-11 select-none items-center justify-center gap-2 rounded-md text-sm font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-deep px-5 py-3 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_14px_28px_-14px_rgba(201,71,16,0.62)] hover:bg-brand-red",
  secondary:
    "border border-border-strong bg-white px-5 py-3 text-ink shadow-[0_8px_20px_-18px_rgba(36,44,55,0.4)] hover:border-signal-dim hover:bg-surface-elevated",
  ghost: "bg-transparent px-3 py-2 text-muted hover:text-ink",
};

interface ButtonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  href,
  onClick,
  type = "button",
  disabled = false,
  ...rest
}: ButtonProps) {
  const classes = [base, variants[variant], className].join(" ");

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
