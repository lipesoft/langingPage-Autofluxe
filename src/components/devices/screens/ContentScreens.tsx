import { Play } from "lucide-react";
import { ScreenCanvas, ScreenEyebrow, screenType } from "./ScreenPrimitives";

export function PromoScreen() {
  return (
    <ScreenCanvas className="items-center justify-center bg-gradient-to-br from-signal-soft via-signal to-brand-red text-center">
      <ScreenEyebrow>Combo em destaque</ScreenEyebrow>
      <span className={[screenType.number, "mt-[6%] font-display font-extrabold leading-none text-white"].join(" ")}>R$ 29</span>
      <span className={[screenType.body, "mt-[6%] text-white/90"].join(" ")}>sabor, rapidez e praticidade</span>
      <span className={[screenType.caption, "mt-[10%] rounded-full border border-white/45 bg-white/10 px-[8%] py-[3%] font-semibold text-white"].join(" ")}>
        peça agora
      </span>
    </ScreenCanvas>
  );
}

export function OperationOverviewScreen() {
  return (
    <ScreenCanvas className="bg-screen">
      <header className="flex items-center justify-between">
        <ScreenEyebrow>Fluxo do pedido</ScreenEyebrow>
        <span className={[screenType.eyebrow, "text-success"].join(" ")}>CONECTADO</span>
      </header>
      <div className="mt-[8%] grid flex-1 grid-cols-[1.15fr_0.85fr] gap-[4%]">
        <div className="flex flex-col justify-center rounded-[calc(var(--dw)*0.025)] bg-gradient-to-br from-brand-deep to-brand-red p-[7%]">
          <span className={[screenType.eyebrow, "text-white/80"].join(" ")}>RETIRADA</span>
          <span className={[screenType.number, "mt-[4%] font-mono font-bold leading-none text-white"].join(" ")}>042</span>
          <span className={[screenType.caption, "mt-[4%] text-white/90"].join(" ")}>PRONTO</span>
        </div>
        <div className="flex flex-col justify-between rounded-[calc(var(--dw)*0.025)] border border-white/10 bg-screen-raised p-[7%]">
          <span className={[screenType.eyebrow, "text-screen-muted"].join(" ")}>KDS · COZINHA</span>
          <span className={[screenType.title, "font-mono font-bold tabular-nums text-paper"].join(" ")}>043</span>
          <span className={[screenType.caption, "text-signal-soft"].join(" ")}>EM PREPARO</span>
        </div>
      </div>
      <p className={[screenType.caption, "mt-[5%] text-screen-muted"].join(" ")}>Exemplo visual · dados ilustrativos</p>
    </ScreenCanvas>
  );
}

export function VideoScreen({ label = "Operação em tempo real" }: { label?: string }) {
  return (
    <ScreenCanvas className="items-center justify-center bg-gradient-to-br from-screen-raised to-screen">
      <div className="flex h-[22%] w-[22%] items-center justify-center rounded-full border border-white/15 bg-white/5">
        <Play className="h-[45%] w-[45%] fill-paper text-paper" aria-hidden="true" />
      </div>
      <span className={[screenType.body, "mt-[8%] text-screen-muted"].join(" ")}>{label}</span>
      <div className="mt-[10%] h-[calc(var(--dw)*0.012)] w-[70%] overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-2/3 rounded-full bg-signal" />
      </div>
    </ScreenCanvas>
  );
}
