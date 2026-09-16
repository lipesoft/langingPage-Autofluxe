import ScreenPlayer from "../devices/ScreenPlayer";
import { MenuScreen, PromoScreen, WeatherScreen, NewsScreen, CorporateScreen } from "../devices/screens";
import Button from "../ui/Button";

const TILES = [
  { screen: <MenuScreen />, style: { left: "6%", top: "8%", transform: "rotate(-9deg) scale(0.85)" }, opacity: 0.35 },
  { screen: <WeatherScreen />, style: { right: "8%", top: "4%", transform: "rotate(7deg) scale(0.9)" }, opacity: 0.4 },
  { screen: <NewsScreen />, style: { left: "-2%", bottom: "6%", transform: "rotate(6deg) scale(0.8)" }, opacity: 0.3 },
  { screen: <CorporateScreen />, style: { right: "-2%", bottom: "10%", transform: "rotate(-6deg) scale(0.82)" }, opacity: 0.32 },
  { screen: <PromoScreen />, style: { left: "50%", top: "0%", transform: "translateX(-50%) scale(1)" }, opacity: 0.55 },
];

export default function FinalCTA() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-[#313A4A] bg-ink py-28 sm:py-36">
      <div className="brand-gradient pointer-events-none absolute left-1/2 top-[-48%] h-[620px] w-[900px] -translate-x-1/2 rounded-full opacity-35 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {TILES.map((tile, index) => (
          <div key={index} className="absolute w-[120px] sm:w-[150px]" style={{ ...tile.style, opacity: tile.opacity }}>
            <ScreenPlayer sizeClass="[--dw:100%]" ratio="video">
              {tile.screen}
            </ScreenPlayer>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/90 to-ink" />
      </div>

      <div className="relative mx-auto max-w-[720px] px-5 text-center sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-signal-soft">Autofluxe na sua operação</p>
        <h2 className="mt-3 text-balance font-display text-[2rem] font-extrabold leading-[1.12] text-paper sm:text-[2.6rem]">
          Menos fila, mais clareza e uma operação que acompanha o seu ritmo.
        </h2>
        <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-relaxed text-[#C7CED9]">
          Fale com a equipe Autofluxe e veja como conectar atendimento, cozinha e retirada em um fluxo só.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="mailto:contato@autfluxe.com" variant="primary">
            Solicitar demonstração
          </Button>
          <Button href="mailto:contato@autfluxe.com" variant="secondary">
            Falar com especialista
          </Button>
        </div>
      </div>
    </section>
  );
}
