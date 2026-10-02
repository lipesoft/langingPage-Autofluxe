import type { PropsWithChildren } from "react";
import { CircleDot } from "lucide-react";
import LandscapeTV from "../devices/LandscapeTV";
import TotemVertical from "../devices/TotemVertical";
import { KdsScreen } from "../devices/screens/KdsScreen";
import { MenuScreen } from "../devices/screens/MenuScreen";
import { PickupScreen } from "../devices/screens/PickupScreen";

function DeviceStage({
  step,
  title,
  detail,
  children,
  className = "",
}: PropsWithChildren<{
  step: string;
  title: string;
  detail: string;
  className?: string;
}>) {
  return (
    <li className={["flex min-w-0 flex-col", className].join(" ")}>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-brand-deep shadow-[0_0_0_1px_rgba(201,71,16,0.12)]">
          <span className="font-mono text-[10px] font-bold tabular-nums">{step}</span>
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[12px] font-bold text-ink">{title}</span>
          <span className="mt-0.5 block truncate text-[10px] text-muted">{detail}</span>
        </span>
      </div>
      <div className="mt-4 flex min-h-0 flex-1 items-center justify-center">{children}</div>
    </li>
  );
}

export default function ConnectedOperation() {
  return (
    <figure
      role="img"
      aria-label="Fluxo ilustrativo do pedido 042: o cliente escolhe no totem, a cozinha recebe no KDS e a retirada chama o pedido pronto."
      className="mx-auto w-full max-w-[700px] rounded-xl border border-border bg-surface-elevated p-3 shadow-panel sm:p-4"
    >
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/70 pb-3">
        <span className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg brand-gradient text-white">
            <CircleDot size={14} strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-bold text-ink">Um pedido, três pontos</span>
            <span className="mt-0.5 block truncate text-[9px] text-muted">Pedido #042</span>
          </span>
        </span>
        <span className="shrink-0 rounded-full border border-border bg-white px-2.5 py-1 text-[9px] font-medium text-muted">
          Interface ilustrativa
        </span>
      </div>

      <ol className="grid grid-cols-[minmax(112px,0.86fr)_minmax(0,1fr)] grid-rows-2 items-stretch gap-x-2 gap-y-5 min-[1200px]:grid-cols-3 min-[1200px]:grid-rows-1 min-[1200px]:gap-x-3">
        <DeviceStage step="01" title="Pedir" detail="Totem" className="row-span-2 justify-center min-[1200px]:row-span-1">
          <TotemVertical sizeClass="[--dw:104px] min-[380px]:[--dw:116px] sm:[--dw:138px] lg:[--dw:148px]" tilt={false}>
            <MenuScreen />
          </TotemVertical>
        </DeviceStage>

        <DeviceStage step="02" title="Preparar" detail="KDS · cozinha">
          <LandscapeTV sizeClass="[--dw:140px] min-[380px]:[--dw:158px] sm:[--dw:194px]" mount="wall">
            <KdsScreen />
          </LandscapeTV>
        </DeviceStage>

        <DeviceStage step="03" title="Retirar" detail="Pickup · balcão">
          <LandscapeTV sizeClass="[--dw:140px] min-[380px]:[--dw:158px] sm:[--dw:194px]" mount="wall">
            <PickupScreen />
          </LandscapeTV>
        </DeviceStage>
      </ol>

      <figcaption className="mt-3 border-t border-border/70 pt-2.5 text-center text-[10px] leading-relaxed text-muted-2">
        Pedido #042 atravessa o fluxo; nomes, itens e estados são exemplos visuais.
      </figcaption>
    </figure>
  );
}
