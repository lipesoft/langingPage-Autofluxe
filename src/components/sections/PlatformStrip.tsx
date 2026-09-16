import TotemVertical from "../devices/TotemVertical";
import LandscapeTV from "../devices/LandscapeTV";
import DigitalDisplay from "../devices/DigitalDisplay";
import { MenuScreen, QueueScreen, WeatherScreen, PromoScreen } from "../devices/screens";

export default function PlatformStrip() {
  return (
    <section id="produto" className="relative border-t border-border bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="max-w-[620px]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Uma operação conectada</p>
          <h2 className="mt-3 text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.3rem]">
            Um pedido começa no totem e chega onde precisa estar.
          </h2>
          <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted">
            Centralize o cardápio, acelere o autoatendimento e mantenha cozinha e retirada sincronizadas em cada unidade.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-0 right-0 top-[78%] h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent sm:top-[82%]" />

          <div className="flex items-end gap-8 overflow-x-auto pb-4 sm:justify-between sm:gap-4 sm:overflow-visible">
            <div className="flex shrink-0 flex-col items-center gap-4">
              <span className="rounded-full border border-border-strong bg-white px-2.5 py-1 text-[10px] font-medium text-muted">
                KDS — Cozinha
              </span>
              <LandscapeTV sizeClass="[--dw:200px] sm:[--dw:190px] lg:[--dw:230px]" statusLabel="Online">
                <QueueScreen />
              </LandscapeTV>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-4">
              <span className="rounded-full border border-[#FFD7BF] bg-[#FFF8F2] px-2.5 py-1 text-[10px] font-semibold text-brand-deep">
                Totem — Pedido
              </span>
              <TotemVertical sizeClass="[--dw:132px] sm:[--dw:130px] lg:[--dw:150px]" statusLabel="Online">
                <MenuScreen />
              </TotemVertical>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-4">
              <span className="rounded-full border border-border-strong bg-white px-2.5 py-1 text-[10px] font-medium text-muted">
                Pickup — Retirada
              </span>
              <DigitalDisplay sizeClass="[--dw:118px] sm:[--dw:120px] lg:[--dw:138px]" statusLabel="Sincronizando">
                <WeatherScreen />
              </DigitalDisplay>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-4">
              <span className="rounded-full border border-border-strong bg-white px-2.5 py-1 text-[10px] font-medium text-muted">
                Cardápio digital
              </span>
              <TotemVertical sizeClass="[--dw:132px] sm:[--dw:130px] lg:[--dw:150px]" statusLabel="Online">
                <PromoScreen />
              </TotemVertical>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-4">
              <span className="rounded-full border border-border-strong bg-white px-2.5 py-1 text-[10px] font-medium text-muted">
                Fila organizada
              </span>
              <LandscapeTV sizeClass="[--dw:170px] sm:[--dw:170px] lg:[--dw:200px]" mount="wall" statusLabel="Online">
                <QueueScreen />
              </LandscapeTV>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
