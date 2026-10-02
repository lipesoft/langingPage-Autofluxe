import type { PropsWithChildren } from "react";

export const screenType = {
  eyebrow: "text-[calc(var(--dw)*0.034)] font-semibold uppercase tracking-[0.12em]",
  caption: "text-[calc(var(--dw)*0.038)]",
  body: "text-[calc(var(--dw)*0.05)]",
  title: "text-[calc(var(--dw)*0.075)]",
  number: "text-[calc(var(--dw)*0.16)]",
  pickupNumber: "text-[calc(var(--dw)*0.115)]",
  compactBody: "text-[calc(var(--dw)*0.042)]",
  compactCaption: "text-[calc(var(--dw)*0.032)]",
};

export function ScreenCanvas({
  children,
  className = "",
  density = "regular",
}: PropsWithChildren<{
  className?: string;
  density?: "regular" | "compact";
}>) {
  const inset = density === "compact" ? "p-[5%]" : "p-[8%]";

  return (
    <div className={["absolute inset-0 flex flex-col text-paper", inset, className].join(" ")}>
      {children}
    </div>
  );
}

export function ScreenEyebrow({ children }: PropsWithChildren) {
  return <p className={[screenType.eyebrow, "text-screen-muted"].join(" ")}>{children}</p>;
}
