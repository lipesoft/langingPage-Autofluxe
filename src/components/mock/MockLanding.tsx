import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Check,
  ChefHat,
  ChevronRight,
  CircleDot,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  Menu,
  MonitorSmartphone,
  PanelsTopLeft,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import DigitalDisplay from "../devices/DigitalDisplay";
import LandscapeTV from "../devices/LandscapeTV";
import TotemVertical from "../devices/TotemVertical";
import CapturedScreen from "../devices/CapturedScreen";
import { KdsScreen } from "../devices/screens/KdsScreen";
import { MenuScreen } from "../devices/screens/MenuScreen";
import { OperationOverviewScreen } from "../devices/screens/ContentScreens";
import { PickupScreen } from "../devices/screens/PickupScreen";
import ContactForm from "../sections/ContactForm";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Mark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFAE24] via-[#F66B17] to-[#DB2717] text-lg font-black text-white shadow-[0_8px_22px_-10px_rgba(255,128,0,0.9)]">
      A
    </span>
  );
}

function MockNavbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const links = [
    ["O fluxo", "#fluxo"],
    ["A plataforma", "#plataforma"],
    ["Para sua operação", "#operacao"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#101722]/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Autofluxe, início">
          <Mark />
          <span className="text-[15px] font-extrabold tracking-[-0.04em] text-white">
            Auto<span className="text-[#FF871A]">fluxe</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] font-medium text-white/60 transition-colors hover:text-white">
              {label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a href="#contato" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-bold text-[#171D26] transition-transform hover:-translate-y-0.5">
            Falar com especialista
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#101722] px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm text-white/75 hover:bg-white/5 hover:text-white">
                {label}
              </a>
            ))}
          </div>
          <a href="#contato" onClick={() => setOpen(false)} className="mt-4 flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#FF9D1E] to-[#E53A16] text-sm font-bold text-white">
            Falar com especialista
          </a>
        </div>
      )}
    </header>
  );
}

function ProductStageLegacy() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/[0.12] bg-[#18222F] p-4 shadow-[0_38px_100px_-42px_rgba(0,0,0,0.9)] sm:p-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FF7717]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 left-12 h-48 w-48 rounded-full bg-[#E12A17]/10 blur-3xl" aria-hidden="true" />

      <div className="relative flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFAA24] to-[#E32B16] text-white">
            <CircleDot size={15} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold text-white">Pedido #042</p>
            <p className="mt-0.5 text-[10px] text-white/45">Um fluxo, vários pontos</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-200">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
          EM FLUXO
        </span>
      </div>

      <div className="relative mt-6 grid min-h-[470px] grid-cols-2 items-end justify-items-center gap-x-1 gap-y-8 sm:min-h-[370px] sm:grid-cols-[0.62fr_1fr_1fr] sm:gap-3">
        <motion.div
          className="relative z-10 shrink-0"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.3, ease: EASE }}
        >
          <TotemVertical sizeClass="[--dw:88px] min-[420px]:[--dw:104px] sm:[--dw:128px]" tilt={false}>
            <MenuScreen />
          </TotemVertical>
          <span className="absolute -left-1 top-[-18px] rounded-full border border-white/10 bg-[#263343] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/60">01 · Pedir</span>
        </motion.div>

        <motion.div
          className="relative z-10 min-w-0 pb-8"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.46, ease: EASE }}
        >
          <LandscapeTV sizeClass="[--dw:154px] min-[420px]:[--dw:184px] sm:[--dw:244px]" mount="wall">
            <KdsScreen />
          </LandscapeTV>
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#263343] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/60">02 · KDS</span>
        </motion.div>

        <motion.div
          className="relative z-10 col-span-2 min-w-0 pb-8 sm:col-span-1"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.62, ease: EASE }}
        >
          <LandscapeTV sizeClass="[--dw:154px] min-[420px]:[--dw:184px] sm:[--dw:244px]" mount="wall">
            <PickupScreen />
          </LandscapeTV>
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#263343] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/60">03 · Pickup</span>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute left-[17%] right-[17%] top-[23%] h-px origin-left bg-gradient-to-r from-[#FFAA24] via-[#F05C1B] to-[#E32B16]"
          initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.78, ease: EASE }}
          aria-hidden="true"
        />
      </div>

      <div className="relative mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-[10px] text-white/45">
        <span className="inline-flex items-center gap-1.5"><Sparkles size={12} className="text-[#FF9D1E]" /> Interface demonstrativa</span>
        <span className="font-mono uppercase tracking-[0.12em]">Totem · KDS · Pickup</span>
      </div>
    </div>
  );
}

function ProductStage() {
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const stages = [
    { label: "Pedir", detail: "Totem", description: "O cliente escolhe sem depender da fila.", icon: MonitorSmartphone },
    { label: "Vender", detail: "Caixa", description: "A venda entra no caixa com o turno preparado.", icon: BarChart3 },
    { label: "Preparar", detail: "KDS", description: "A cozinha trabalha com prioridade e contexto.", icon: ChefHat },
    { label: "Retirar", detail: "Pickup", description: "O cliente sabe quando o pedido está pronto.", icon: PanelsTopLeft },
  ];

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % stages.length), 2200);
    return () => window.clearInterval(timer);
  }, [reduceMotion, stages.length]);

  const renderScreen = () => {
    if (active === 0) return <TotemVertical sizeClass="[--dw:144px] min-[500px]:[--dw:174px] lg:[--dw:188px]" tilt={false}><CapturedScreen src="/assets/captured/totem-catalog-real.png" alt="Catálogo real do Totem Brasa Nativa" /></TotemVertical>;
    if (active === 1) return <DigitalDisplay sizeClass="[--dw:268px] min-[500px]:[--dw:330px] lg:[--dw:380px]"><CapturedScreen src="/assets/captured/caixa-real.png" alt="Tela real de preparação do turno no Caixa Autofluxe" /></DigitalDisplay>;
    if (active === 2) return <LandscapeTV sizeClass="[--dw:310px] min-[500px]:[--dw:405px] lg:[--dw:470px]" mount="wall"><CapturedScreen src="/assets/captured/kds-real.png" alt="Fila real da cozinha no KDS Autofluxe" /></LandscapeTV>;
    return <LandscapeTV sizeClass="[--dw:310px] min-[500px]:[--dw:405px] lg:[--dw:470px]" mount="wall"><CapturedScreen src="/assets/captured/pickup-real.png" alt="Painel real de retirada do Autofluxe" /></LandscapeTV>;
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/[0.14] bg-[#151E2A] p-4 shadow-[0_38px_100px_-42px_rgba(0,0,0,0.95)] sm:p-6">
      <img src="/assets/editorial/hero-operation-v1.png" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.16] mix-blend-screen" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#101722]/95 via-[#101722]/72 to-[#101722]/90" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FF7717]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 left-12 h-56 w-56 rounded-full bg-[#E12A17]/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />

      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFAA24] to-[#E32B16] text-white"><CircleDot size={15} aria-hidden="true" /></span>
          <div><p className="text-xs font-bold text-white">Pedido #042</p><p className="mt-0.5 text-[10px] text-white/45">Um fluxo, vários pontos</p></div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-200"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> EM FLUXO</span>
      </div>

      <div className="relative z-10 mt-5 min-h-[470px] sm:min-h-[430px]">
        <div className="relative flex min-h-[370px] items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[#0E151F]/45 px-4 pb-5 pt-8 sm:min-h-[390px] sm:px-8">
          <motion.div className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#FF7A1A]/15 blur-[75px] sm:h-80 sm:w-80" animate={reduceMotion ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.55, 0.9, 0.55] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} aria-hidden="true" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} className="absolute inset-x-0 bottom-14 top-4 z-10 flex items-center justify-center" initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, y: -24, scale: 1.03 }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}>
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-4 grid grid-cols-4 gap-1.5 border-t border-white/10 pt-4">
          <motion.div className="pointer-events-none absolute left-0 top-[-1px] h-px bg-gradient-to-r from-[#FFAA24] via-[#F05C1B] to-[#E32B16]" initial={false} animate={{ width: `${(active + 1) * 25}%` }} transition={{ duration: reduceMotion ? 0 : 0.65, ease: EASE }} aria-hidden="true" />
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return <button key={stage.label} type="button" onClick={() => setActive(index)} className={`group relative min-w-0 rounded-xl px-2 py-2.5 text-left transition-all sm:px-3 ${active === index ? "bg-white/[0.08] text-white" : "text-white/40 hover:bg-white/[0.04] hover:text-white/75"}`} aria-label={`Ver etapa ${stage.label}`}><span className="flex items-center gap-2"><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${active === index ? "bg-gradient-to-br from-[#FFAA24] to-[#E32B16] text-white" : "bg-white/10"}`}><Icon size={13} /></span><span className="min-w-0"><span className="block text-[9px] font-bold uppercase tracking-[0.1em]">0{index + 1}</span><span className="block truncate text-[10px] font-semibold sm:text-xs">{stage.label}</span></span></span><span className={`mt-2 hidden truncate text-[10px] leading-tight sm:block ${active === index ? "text-white/50" : "text-white/30"}`}>{stage.description}</span></button>;
          })}
        </div>
      </div>

      <div className="relative z-10 mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-[10px] text-white/45"><span className="inline-flex items-center gap-1.5"><Sparkles size={12} className="text-[#FF9D1E]" /> Captura local do sistema</span><span className="font-mono uppercase tracking-[0.12em]">{stages[active].label} · {stages[active].detail}</span></div>
    </div>
  );
}

function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden bg-[#101722] pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute left-[-18%] top-[10%] h-[480px] w-[480px] rounded-full bg-[#E44517]/15 blur-[120px]"
        animate={reduceMotion ? undefined : { x: [0, 28, 0], y: [0, -14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
        <div className="max-w-[600px]">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF9D1E]/25 bg-[#FF9D1E]/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFC16A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF9D1E] shadow-[0_0_0_4px_rgba(255,157,30,0.12)]" />
              Operação conectada
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-[650px] text-balance text-[3.2rem] font-black leading-[0.98] tracking-[-0.065em] text-white sm:text-[4.5rem] lg:text-[5.2rem]">
              Cada pedido tem um caminho.
              <span className="mt-2 block bg-gradient-to-r from-[#FFBF57] via-[#FF7C1C] to-[#E33B18] bg-clip-text text-transparent">Torne ele visível.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-white/62 sm:text-lg">
              O Autofluxe organiza o fluxo entre atendimento, cozinha, caixa e retirada para que a operação saiba o próximo passo, e o cliente não fique esperando respostas.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:items-center">
              <a href="#fluxo" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF9D1E] to-[#E23B17] px-5 text-sm font-bold text-white shadow-[0_18px_34px_-18px_rgba(236,81,20,0.9)] transition-transform hover:-translate-y-0.5">
                <Play size={15} fill="currentColor" aria-hidden="true" />
                Ver o fluxo em ação
              </a>
              <a href="#contato" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white/80 transition-colors hover:border-white/35 hover:bg-white/5 hover:text-white">
                Falar com um especialista
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium text-white/40">
              <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-[#FF9D1E]" /> Menos desencontro</span>
              <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-[#FF9D1E]" /> Mais clareza</span>
              <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-[#FF9D1E]" /> Um fluxo visual</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <ProductStage />
        </Reveal>
      </div>

      <a href="#fluxo" className="relative mx-auto mt-16 flex w-fit flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white/70">
        Explorar o fluxo
        <ArrowDown size={15} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}

const STORY = [
  {
    number: "01",
    label: "Totem",
    title: "O pedido começa com clareza.",
    text: "O cliente escolhe e confirma o pedido em um ponto de atendimento pensado para reduzir atrito.",
    icon: MonitorSmartphone,
  },
  {
    number: "02",
    label: "KDS · cozinha",
    title: "A cozinha recebe o contexto certo.",
    text: "O pedido chega à fila de preparo com uma leitura visual que ajuda a equipe a saber o que vem agora.",
    icon: ChefHat,
  },
  {
    number: "03",
    label: "Painel da operação",
    title: "A operação acompanha o próximo passo.",
    text: "A diagramação e a publicação do Totem ficam visíveis no painel, com a experiência pronta para a unidade.",
    icon: ClipboardList,
  },
  {
    number: "04",
    label: "Pickup",
    title: "A retirada fecha o ciclo.",
    text: "Quando o pedido está pronto, o próximo passo fica visível para a equipe e para quem vai retirar.",
    icon: PanelsTopLeft,
  },
];

function CashPanel() {
  return (
    <div className="w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[#1F2937] p-4 shadow-[0_24px_55px_-30px_rgba(0,0,0,0.8)] sm:p-5">
      <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">Caixa · visão de exemplo</p>
          <p className="mt-1 text-base font-bold text-white">Fechamento da unidade</p>
        </div>
        <BarChart3 size={18} className="text-[#FF9D1E]" aria-hidden="true" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[10px] text-white/45">Pedido</p><p className="mt-1 text-xl font-bold text-white">#042</p></div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[10px] text-white/45">Estado</p><p className="mt-1 text-xl font-bold text-emerald-300">Exemplo</p></div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs"><span className="text-white/55">Pedido #042</span><span className="text-[#FFC16A]">Em fluxo</span></div>
    </div>
  );
}

function StoryVisual({ index }: { index: number }) {
  if (index === 0) return <TotemVertical sizeClass="[--dw:132px] sm:[--dw:170px]" tilt={false}><CapturedScreen src="/assets/captured/totem-catalog-real.png" alt="Catálogo real do Totem Brasa Nativa" /></TotemVertical>;
  if (index === 1) return <LandscapeTV sizeClass="[--dw:270px] min-[460px]:[--dw:330px] sm:[--dw:405px]" mount="wall"><CapturedScreen src="/assets/captured/kds-real.png" alt="Fila real da cozinha no KDS Autofluxe" /></LandscapeTV>;
  if (index === 2) return <DigitalDisplay sizeClass="[--dw:220px] min-[460px]:[--dw:270px] sm:[--dw:330px]"><CapturedScreen src="/assets/captured/admin-diagramacao.png" alt="Tela real de diagramação do Totem no painel Autofluxe" /></DigitalDisplay>;
  return <LandscapeTV sizeClass="[--dw:270px] min-[460px]:[--dw:330px] sm:[--dw:405px]" mount="wall"><CapturedScreen src="/assets/captured/pickup-real.png" alt="Painel real de retirada do Autofluxe" /></LandscapeTV>;
}

function FlowStoryLegacy() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="fluxo" className="relative overflow-hidden bg-[#F5F6F7] py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="max-w-[720px]">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C94710]">O pedido em movimento</p>
            <h2 className="mt-4 text-balance text-[2.5rem] font-black leading-[1.02] tracking-[-0.055em] text-[#242C37] sm:text-[4rem]">
              Uma operação que conta a mesma história do começo ao fim.
            </h2>
            <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-[#687180] sm:text-lg">
              O mock transforma a jornada do pedido em uma narrativa visual: cada etapa aparece, se conecta e prepara a próxima.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-20">
          <div className="absolute bottom-10 left-[21px] top-10 hidden w-px bg-gradient-to-b from-[#FF9D1E] via-[#E8540C] to-[#CCD2DA] md:block" aria-hidden="true" />
          <div className="space-y-20 sm:space-y-28">
            {STORY.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.number}
                  className="relative grid gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-center md:gap-16"
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE }}
                >
                  <div className="relative pl-0 md:pl-16">
                    <div className="absolute left-0 top-0 hidden h-11 w-11 items-center justify-center rounded-full border-4 border-[#F5F6F7] bg-gradient-to-br from-[#FFAA24] to-[#E23A17] text-[11px] font-black text-white shadow-[0_0_0_1px_rgba(201,71,16,0.18)] md:flex">{item.number}</div>
                    <div className="flex items-center gap-2 text-[#C94710] md:hidden"><span className="font-mono text-xs font-bold">{item.number}</span><span className="h-px w-8 bg-[#E8540C]/40" /></div>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.17em] text-[#C94710] md:mt-0">{item.label}</p>
                    <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.045em] text-[#242C37] sm:text-4xl">{item.title}</h3>
                    <p className="mt-4 max-w-[43ch] text-[15px] leading-relaxed text-[#687180]">{item.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#C94710]">Ver etapa <ChevronRight size={14} aria-hidden="true" /></span>
                  </div>

                  <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-[28px] border border-[#E2E5E9] bg-[#101722] p-6 shadow-[0_30px_80px_-52px_rgba(36,44,55,0.85)] sm:min-h-[340px] sm:p-10">
                    <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:50px_50px]" aria-hidden="true" />
                    <div className="relative z-10 flex w-full items-center justify-center">{<StoryVisual index={index} />}</div>
                    <div className="absolute bottom-4 left-5 flex items-center gap-2 text-[10px] font-medium text-white/40"><Icon size={13} className="text-[#FF9D1E]" aria-hidden="true" /> Autofluxe · captura local</div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowStory() {
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const current = STORY[active];
  const ActiveIcon = current.icon;

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % STORY.length), 2800);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section id="fluxo" className="relative overflow-hidden bg-[#F5F6F7] py-12 sm:py-16">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C94710]">O pedido em movimento</p>
              <h2 className="mt-3 max-w-[760px] text-balance text-[2.2rem] font-black leading-[1.02] tracking-[-0.055em] text-[#242C37] sm:text-[3.4rem]">Do primeiro toque ao pedido retirado.</h2>
            </div>
            <p className="max-w-[360px] text-[15px] leading-relaxed text-[#687180]">Uma sequência visual para mostrar como atendimento, exibição, preparo e retirada conversam entre si.</p>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.43fr_1.57fr]">
          <div className="self-start rounded-[24px] border border-[#E2E5E9] bg-white p-4 shadow-[0_24px_60px_-46px_rgba(36,44,55,0.65)] lg:sticky lg:top-24 sm:p-5">
            <div className="flex items-center justify-between gap-3 border-b border-[#E2E5E9] pb-4"><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8B94A3]">Fluxo do pedido</span><span className="font-mono text-[10px] text-[#C94710]">0{active + 1} / 04</span></div>
            <div className="mt-4 grid grid-cols-4 gap-1.5 lg:grid-cols-1 lg:gap-1">
              {STORY.map((item, index) => {
                const Icon = item.icon;
                return <button key={item.number} type="button" onClick={() => setActive(index)} className={`group flex min-h-12 items-center gap-2 rounded-xl px-2.5 text-left transition-all lg:px-3 ${active === index ? "bg-[#FFF0E4] text-[#C94710]" : "text-[#8B94A3] hover:bg-[#F8F9FA] hover:text-[#242C37]"}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${active === index ? "bg-[#C94710] text-white" : "bg-[#F1F3F5]"}`}><Icon size={14} /></span><span className="hidden min-w-0 lg:block"><span className="block truncate text-xs font-bold">{item.label}</span><span className="mt-0.5 block text-[10px] opacity-70">Etapa {item.number}</span></span><span className="mx-auto font-mono text-[10px] font-bold lg:hidden">{item.number}</span></button>;
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={current.number} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -10 }} transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }} className="mt-5 border-t border-[#E2E5E9] pt-5 lg:mt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C94710]">{current.label}</p>
                <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[#242C37]">{current.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#687180]">{current.text}</p>
              </motion.div>
            </AnimatePresence>
            <a href="#contato" className="mt-5 inline-flex min-h-10 items-center gap-2 text-xs font-bold text-[#C94710]">Conversar sobre o fluxo <ArrowRight size={14} /></a>
          </div>

          <div className="relative min-h-[430px] overflow-hidden rounded-[26px] border border-[#263343] bg-[#101722] shadow-[0_30px_80px_-48px_rgba(36,44,55,0.85)] sm:min-h-[480px]">
            <img src="/assets/editorial/hero-operation-v1.png" alt="Operação de restaurante com atendimento, cozinha e retirada" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#101722]/90 via-[#101722]/65 to-[#101722]/90" />
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:52px_52px]" aria-hidden="true" />
            <div className="relative z-10 flex min-h-[430px] flex-col justify-between p-4 sm:min-h-[480px] sm:p-6">
              <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs font-bold text-white"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFAA24] to-[#E32B16]"><ActiveIcon size={15} /></span>{current.label}</div><span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono text-white/55">CAPTURA LOCAL</span></div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={current.number} className="relative flex flex-1 items-center justify-center py-3 sm:py-5" initial={reduceMotion ? false : { opacity: 0, scale: 0.92, x: 24 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, scale: 1.04, x: -24 }} transition={{ duration: reduceMotion ? 0 : 0.48, ease: EASE }}>
                  <motion.div className="absolute h-2 w-2 rounded-full bg-[#FFD17D] shadow-[0_0_0_6px_rgba(255,157,30,0.14),0_0_28px_rgba(255,157,30,0.9)]" animate={reduceMotion ? undefined : { x: [-150, 0, 150], y: [0, -22, 0], opacity: [0, 1, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} aria-hidden="true" />
                  {<StoryVisual index={active} />}
                </motion.div>
              </AnimatePresence>
              <div className="grid grid-cols-4 gap-2 border-t border-white/10 pt-4">{STORY.map((item, index) => <button key={item.number} type="button" onClick={() => setActive(index)} className="group text-left"><div className={`h-1 overflow-hidden rounded-full ${active === index ? "bg-[#FF9D1E]" : "bg-white/15"}`}><motion.div className="h-full bg-[#FFD17D]" animate={active === index && !reduceMotion ? { width: ["0%", "100%"] } : { width: active === index ? "100%" : "0%" }} transition={{ duration: 2.8, ease: "linear" }} /></div><p className={`mt-2 text-[10px] font-semibold ${active === index ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>{item.label}</p></button>)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPanel() {
  const rows = [
    ["#042", "Ana Clara", "Em preparo", "03m", "bg-[#FF9D1E]/15 text-[#FFC16A]"],
    ["#041", "Pedro", "Novo pedido", "01m", "bg-white/5 text-white/55"],
    ["#038", "Marina", "Pronto", "06m", "bg-emerald-300/10 text-emerald-200"],
  ];

  return (
    <div className="overflow-hidden rounded-[26px] border border-white/10 bg-[#18222F] shadow-[0_35px_90px_-50px_rgba(0,0,0,0.85)]">
      <div className="flex flex-col lg:flex-row">
        <aside className="flex gap-1 overflow-x-auto border-b border-white/10 bg-[#131B26] p-3 lg:w-[185px] lg:flex-col lg:border-b-0 lg:border-r lg:p-4">
          {[LayoutDashboard, ClipboardList, ChefHat, PanelsTopLeft, BarChart3].map((Icon, index) => (
            <div key={index} className={`flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-xs ${index === 0 ? "bg-[#FF9D1E]/12 text-[#FFC16A]" : "text-white/40"}`}>
              <Icon size={15} aria-hidden="true" />
              <span className="hidden lg:inline">{["Visão geral", "Pedidos", "Cozinha", "Retirada", "Relatórios"][index]}</span>
            </div>
          ))}
        </aside>
        <div className="min-w-0 flex-1 p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-sm font-bold text-white">Painel de operação</p><p className="mt-1 text-xs text-white/40">Unidade demonstrativa · agora</p></div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Fluxo ativo</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            {[['#042', 'Pedido demonstrativo'], ['KDS', 'Fila de preparo'], ['OK', 'Retirada']].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-4"><p className="text-xl font-black text-white sm:text-3xl">{value}</p><p className="mt-1 text-[10px] leading-snug text-white/45 sm:text-xs">{label}</p></div>
            ))}
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <div className="grid grid-cols-[0.65fr_1fr_0.9fr_0.45fr] gap-3 bg-white/[0.035] px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/35 sm:px-4"><span>Pedido</span><span>Cliente</span><span>Status</span><span>Tempo</span></div>
            {rows.map(([number, customer, status, time, statusClass]) => <div key={number} className="grid grid-cols-[0.65fr_1fr_0.9fr_0.45fr] items-center gap-3 border-t border-white/10 px-3 py-3 text-xs sm:px-4"><span className="font-mono font-bold text-white">{number}</span><span className="truncate text-white/65">{customer}</span><span className={`w-fit rounded-full px-2 py-1 text-[10px] font-semibold ${statusClass}`}>{status}</span><span className="font-mono text-white/45">{time}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformSection() {
  return (
    <section id="plataforma" className="overflow-hidden bg-[#101722] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF9D1E]">A visão central</p>
            <h2 className="mt-4 text-balance text-[2.6rem] font-black leading-[1.02] tracking-[-0.055em] sm:text-[4rem]">Tudo que importa para seguir o pedido.</h2>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-white/58 sm:text-lg">A página não precisa pedir que o cliente imagine o produto. Ela mostra a operação acontecendo em uma interface conectada.</p>
            <div className="mt-8 space-y-4">
              {["Uma leitura central do fluxo", "Estados visíveis para cada equipe", "Telas apresentadas como produto, não decoração"].map((text) => <div key={text} className="flex items-center gap-3 text-sm text-white/75"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF9D1E]/15 text-[#FFB653]"><Check size={13} /></span>{text}</div>)}
            </div>
          </Reveal>
          <Reveal delay={0.12}><DashboardPanel /></Reveal>
        </div>
      </div>
    </section>
  );
}

function EditorialContextSection() {
  return (
    <section id="contexto" className="bg-[#101722] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF9D1E]">O contexto real da operação</p>
              <h2 className="mt-4 max-w-[700px] text-balance text-[2.6rem] font-black leading-[1.02] tracking-[-0.055em] sm:text-[4rem]">A tecnologia precisa acompanhar o ritmo do lugar.</h2>
            </div>
            <p className="max-w-[370px] text-[15px] leading-relaxed text-white/58">As imagens mostram o cenário. As telas mostram como o fluxo pode ficar mais claro dentro dele.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal>
            <article className="group relative min-h-[390px] overflow-hidden rounded-[28px] border border-white/10 bg-[#18222F] sm:min-h-[520px]">
              <img src="/assets/editorial/hero-operation-v1.png" alt="Operação de restaurante com autoatendimento, cozinha aberta e balcão" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101722] via-[#101722]/15 to-transparent" />
              <div className="absolute right-4 top-4 hidden items-start gap-3 sm:flex sm:right-6 sm:top-6">
                <motion.div
                  className="relative rounded-[18px] border border-white/15 bg-[#101722]/75 p-2 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.95)] backdrop-blur-md"
                  animate={{ y: [0, -7, 0], rotate: [0, 0.6, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <TotemVertical sizeClass="[--dw:78px] lg:[--dw:92px]" tilt={false}><CapturedScreen src="/assets/captured/totem-catalog-real.png" alt="Totem real do catálogo Brasa Nativa" /></TotemVertical>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#FF9D1E]/30 bg-[#101722]/90 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#FFC16A]">01 · Pedir</span>
                </motion.div>
                <motion.div
                  className="mt-10 hidden rounded-[18px] border border-white/15 bg-[#101722]/75 p-2 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.95)] backdrop-blur-md lg:block"
                  animate={{ y: [0, 7, 0], rotate: [0, -0.6, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, delay: 0.45, ease: "easeInOut" }}
                >
                  <DigitalDisplay sizeClass="[--dw:122px]"><CapturedScreen src="/assets/captured/admin-diagramacao.png" alt="Painel real de diagramação do Totem" /></DigitalDisplay>
                  <span className="mt-2 block text-center text-[8px] font-bold uppercase tracking-[0.12em] text-white/55">02 · Exibir</span>
                </motion.div>
              </div>
              <div className="absolute right-5 top-[45%] hidden h-px w-24 bg-gradient-to-r from-[#FF9D1E] to-transparent opacity-70 lg:block" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#101722]/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm"><MonitorSmartphone size={12} className="text-[#FF9D1E]" /> Atendimento em movimento</span>
                <h3 className="mt-4 max-w-[520px] text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">Do primeiro toque ao pedido retirado.</h3>
              </div>
            </article>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal delay={0.08}>
              <article className="group relative min-h-[250px] overflow-hidden rounded-[28px] border border-white/10 bg-[#18222F] sm:min-h-[250px] lg:min-h-[250px]">
                <img src="/assets/editorial/kitchen-team-v1.png" alt="Equipe de cozinha preparando um pedido durante o serviço" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101722] via-[#101722]/20 to-transparent" />
                <div className="absolute right-4 top-4 hidden sm:block"><LandscapeTV sizeClass="[--dw:126px]" mount="wall"><CapturedScreen src="/assets/captured/kds-real.png" alt="KDS real do Autofluxe" /></LandscapeTV></div>
                <div className="absolute bottom-0 left-0 right-0 p-5"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FFB653]">Preparo</p><h3 className="mt-2 text-xl font-black tracking-[-0.03em]">A cozinha no ritmo certo.</h3></div>
              </article>
            </Reveal>
            <Reveal delay={0.16}>
              <article className="group relative min-h-[250px] overflow-hidden rounded-[28px] border border-white/10 bg-[#18222F] sm:min-h-[250px] lg:min-h-[250px]">
                <img src="/assets/editorial/pickup-experience-v1.png" alt="Cliente recebendo um pedido no balcão de retirada" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101722] via-[#101722]/20 to-transparent" />
                <div className="absolute right-4 top-4 hidden sm:block"><LandscapeTV sizeClass="[--dw:126px]" mount="wall"><CapturedScreen src="/assets/captured/pickup-real.png" alt="Painel de retirada real do Autofluxe" /></LandscapeTV></div>
                <div className="absolute bottom-0 left-0 right-0 p-5"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FFB653]">Retirada</p><h3 className="mt-2 text-xl font-black tracking-[-0.03em]">O último passo também importa.</h3></div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function OperationSection() {
  return (
    <section id="operacao" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C94710]">Uma mensagem para cada operação</p><h2 className="mt-4 max-w-[650px] text-balance text-[2.6rem] font-black leading-[1.02] tracking-[-0.055em] text-[#242C37] sm:text-[4rem]">Menos ruído. Mais próximo passo.</h2></div>
            <p className="max-w-[370px] text-[15px] leading-relaxed text-[#687180]">O mesmo produto pode falar com diferentes rotinas sem perder a proposta: acompanhar pedidos com mais clareza.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[{ icon: Clock3, title: "Quando a fila cresce", text: "A equipe enxerga o estado do pedido e a prioridade da próxima tarefa." }, { icon: ChefHat, title: "Quando a cozinha acelera", text: "O preparo recebe uma fila visual para reduzir perguntas e interrupções." }, { icon: LayoutDashboard, title: "Quando a gestão precisa acompanhar", text: "A operação aparece em um painel que organiza a conversa entre pontos." }].map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * 0.08}><article className="group h-full rounded-2xl border border-[#E2E5E9] bg-[#F8F9FA] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#F1C8AE] hover:bg-white hover:shadow-[0_25px_55px_-38px_rgba(36,44,55,0.65)] sm:p-7"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E4] text-[#C94710]"><Icon size={20} /></span><h3 className="mt-6 text-xl font-black tracking-[-0.03em] text-[#242C37]">{title}</h3><p className="mt-3 text-sm leading-relaxed text-[#687180]">{text}</p><span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#C94710] opacity-0 transition-opacity group-hover:opacity-100">Ver como funciona <ChevronRight size={13} /></span></article></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contato" className="relative overflow-hidden bg-[#F5F6F7] py-24 sm:py-32">
      <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#FF9D1E]/10 blur-[110px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1120px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C94710]">Próximo passo</p>
          <h2 className="mt-4 text-balance text-[2.8rem] font-black leading-[1.02] tracking-[-0.06em] text-[#242C37] sm:text-[4.2rem]">Veja o Autofluxe no seu cenário.</h2>
          <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-[#687180] sm:text-lg">Conte como sua operação funciona hoje. A conversa começa pelo fluxo que precisa ficar mais claro.</p>
          <div className="mt-8 flex items-center gap-3 text-xs font-semibold text-[#687180]"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#C94710] shadow-sm"><ArrowRight size={14} /></span> Fale com quem conhece a operação</div>
        </Reveal>
        <Reveal delay={0.12}><ContactForm /></Reveal>
      </div>
    </section>
  );
}

function MockFooter() {
  return <footer className="border-t border-white/10 bg-[#101722] py-8 text-white"><div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8"><a href="#top" className="font-extrabold tracking-[-0.04em] text-white">Auto<span className="text-[#FF871A]">fluxe</span></a><span>Interface demonstrativa · mock visual</span><a href="#contato" className="font-semibold text-white/70 transition-colors hover:text-white">Falar com especialista</a></div></footer>;
}

export default function MockLanding() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#101722] text-[#242C37]">
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-[#FFB33A] via-[#F66B17] to-[#E12A17]" style={{ scaleX }} aria-hidden="true" />
      <MockNavbar />
      <main>
        <Hero />
        <FlowStory />
        <EditorialContextSection />
        <PlatformSection />
        <OperationSection />
        <ContactSection />
      </main>
      <MockFooter />
      <a href="#contato" className="fixed bottom-4 right-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#242C37] px-4 text-xs font-bold text-white shadow-[0_18px_35px_-18px_rgba(0,0,0,0.8)] transition-transform hover:-translate-y-0.5 sm:bottom-6 sm:right-6"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF9D1E]" /> Quero conhecer</a>
    </div>
  );
}
