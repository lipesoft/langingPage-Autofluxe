import { ScreenCanvas, ScreenEyebrow, screenType } from "./ScreenPrimitives";

export function PickupScreen() {
  return (
    <ScreenCanvas density="compact" className="items-center bg-gradient-to-b from-screen-raised to-screen text-center">
      <div className="flex w-full items-center justify-between">
        <ScreenEyebrow>Retirada · balcão</ScreenEyebrow>
        <span className="flex items-center gap-[3%] rounded-full bg-success/15 px-[3%] py-[1%]">
          <span className="h-[calc(var(--dw)*0.025)] w-[calc(var(--dw)*0.025)] rounded-full bg-success" aria-hidden="true" />
          <span className={[screenType.eyebrow, "text-emerald-200"].join(" ")}>PRONTO</span>
        </span>
      </div>

      <div className="mt-[2%] flex w-full flex-1 flex-col items-center justify-center rounded-[calc(var(--dw)*0.035)] border border-white/10 bg-white/[0.035]">
        <p className={[screenType.eyebrow, "text-screen-muted"].join(" ")}>CHAMANDO AGORA</p>
        <p className={[screenType.pickupNumber, "mt-[1%] font-mono font-bold leading-none tracking-[-0.06em] tabular-nums text-signal-soft"].join(" ")}>042</p>
        <p className={[screenType.compactBody, "mt-[1.5%] font-medium text-paper"].join(" ")}>Ana Clara</p>
        <p className={[screenType.compactCaption, "mt-[1%] text-screen-muted"].join(" ")}>Retire no balcão</p>
      </div>

      <div className="mt-[1%] flex w-full items-center justify-between border-t border-white/10 pt-[1%]">
        <span className={[screenType.compactCaption, "text-screen-muted"].join(" ")}>Em preparo</span>
        <span className={[screenType.compactCaption, "font-mono tabular-nums text-paper/80"].join(" ")}>043 · Pedro</span>
      </div>
    </ScreenCanvas>
  );
}
