import TotemVertical from "../devices/TotemVertical";
import LandscapeTV from "../devices/LandscapeTV";
import DigitalDisplay from "../devices/DigitalDisplay";
import { MenuScreen, WeatherScreen, PromoScreen, CorporateScreen } from "../devices/screens";
import useCycle from "../../hooks/useCycle";
import Button from "../ui/Button";

const PATH_TV = "M200,20 C 220,70 300,55 300,92";
const PATH_TOTEM = "M200,20 C 120,110 95,230 82,328";
const PATH_DISPLAY = "M200,20 C 200,120 200,220 200,296";

function SignalLine({ d, delay }: { d: string; delay: number }) {
  return (
    <>
      <path d={d} stroke="#D7DDE5" strokeWidth="1.2" strokeDasharray="1 7" strokeLinecap="round" fill="none" opacity={0.9} />
      <circle
        r="3.2"
        fill="#FF8000"
        style={{
          offsetPath: "path('" + d + "')",
          animation: "sync-travel 3.6s ease-in-out " + delay + "s infinite",
        }}
      />
    </>
  );
}

export default function Hero() {
  const totemFrame = useCycle(3, 4600);
  const tvFrame = useCycle(3, 5200);
  const totemScreens = [<MenuScreen key="a" />, <PromoScreen key="b" />, <CorporateScreen key="c" />];
  const tvScreens = [<WeatherScreen key="a" />, <MenuScreen key="b" />, <PromoScreen key="c" />];

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-[#FFF6ED] via-white to-paper pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="grid-technical mask-fade-x pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-14%] h-[520px] w-[700px] -translate-x-1/2 rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(255,160,0,0.32), rgba(224,32,16,0.16) 42%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-content items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
        <div className="max-w-[580px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFD9BF] bg-white/90 py-1.5 pl-1.5 pr-3 text-[12px] font-semibold text-brand-deep shadow-[0_10px_25px_-22px_rgba(224,84,12,0.8)]">
            <img src="/autofluxe-symbol.jpeg" alt="" aria-hidden="true" className="h-7 w-7 rounded-full object-cover" />
            Operação conectada, do pedido à retirada
          </div>
          <h1 className="text-balance font-display text-[2.5rem] font-extrabold leading-[1.05] text-ink sm:text-[3.1rem] lg:text-[3.55rem]">
            Seu restaurante mais rápido.
            <br />
            <span className="brand-gradient-text">Sua operação no controle.</span>
          </h1>
          <p className="mt-6 max-w-prose text-[15.5px] leading-relaxed text-muted sm:text-base">
            O Autofluxe conecta totem, cardápio, cozinha e retirada para reduzir filas e deixar cada pedido fluindo no ritmo do seu negócio.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#contato" variant="primary">
              Solicitar demonstração
            </Button>
            <Button href="#produto" variant="secondary">
              Conhecer a plataforma
            </Button>
          </div>
        </div>

        <div className="relative h-[400px] sm:h-[460px] lg:h-[540px]">
          <svg
            viewBox="0 0 400 400"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
            aria-hidden="true"
          >
            <SignalLine d={PATH_TV} delay={0} />
            <SignalLine d={PATH_TOTEM} delay={0.9} />
            <SignalLine d={PATH_DISPLAY} delay={1.8} />
          </svg>

          <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#FFD9BF] bg-white/90 px-3 py-1.5 text-[11px] font-medium text-muted shadow-[0_12px_26px_-22px_rgba(224,84,12,0.72)] sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Fluxo em tempo real
          </div>

          <div className="absolute bottom-0 left-0 sm:bottom-[6%] sm:left-[2%]">
            <TotemVertical statusLabel="Online">{totemScreens[totemFrame]}</TotemVertical>
          </div>

          <div className="absolute right-0 top-[10%] sm:right-[-2%] sm:top-[16%]">
            <LandscapeTV sizeClass="[--dw:210px] sm:[--dw:250px] lg:[--dw:280px]" statusLabel="Sincronizado">
              {tvScreens[tvFrame]}
            </LandscapeTV>
          </div>

          <div className="absolute bottom-[2%] left-[36%] sm:bottom-[8%] sm:left-[38%]">
            <DigitalDisplay sizeClass="[--dw:120px] sm:[--dw:148px] lg:[--dw:168px]">
              <WeatherScreen />
            </DigitalDisplay>
          </div>

          <div className="absolute right-[6%] top-[2%] hidden rounded-full border border-[#FFD9BF] bg-white/90 px-2.5 py-1 text-[10px] font-medium text-muted lg:block">
            Totem + cozinha + retirada
          </div>
        </div>
      </div>
    </section>
  );
}
