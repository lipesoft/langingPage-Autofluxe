import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import ConnectedOperation from "./ConnectedOperation";
import Button from "../ui/Button";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const contentStagger = {
  hidden: {},
  visible: { transition: { delayChildren: 0.04, staggerChildren: 0.085 } },
};

const contentItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F3] via-white to-paper pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
      <div className="grid-technical mask-fade-x pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
      <div
        className="pointer-events-none absolute right-[-15%] top-[8%] h-[560px] w-[700px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,160,0,0.17), rgba(224,32,16,0.08) 42%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-content items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        <motion.div
          className="max-w-[560px]"
          variants={contentStagger}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.div variants={contentItem} className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#FFD9BF] bg-white/90 px-3 py-2 text-xs font-semibold text-brand-deep shadow-[0_10px_25px_-22px_rgba(224,84,12,0.8)]">
            <Activity size={14} aria-hidden="true" />
            Operação conectada em um fluxo
          </motion.div>
          <motion.h1 variants={contentItem} className="text-balance font-display text-[2.65rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[3.25rem] lg:text-[3.5rem]">
            Seu restaurante.
            <br />
            <span className="brand-gradient-text">Um fluxo só.</span>
          </motion.h1>
          <motion.p variants={contentItem} className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-base">
            Conecte pedidos, cozinha, caixa, retirada e gestão em um só fluxo. Sua equipe acompanha cada etapa com mais clareza, e o cliente tem uma experiência de pedido mais organizada.
          </motion.p>
          <motion.div variants={contentItem} className="mt-7 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:items-center">
            <Button href="#demonstracao" variant="primary">
              Ver a operação em ação
            </Button>
            <Button href="#contato" variant="secondary">
              Solicitar demonstração
            </Button>
          </motion.div>
          <motion.p variants={contentItem} className="mt-4 text-xs text-muted-2">Pedido · atendimento · cozinha · retirada · gestão</motion.p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.32, delay: reduceMotion ? 0 : 0.44, ease: [0.22, 1, 0.36, 1] }}
        >
          <ConnectedOperation />
        </motion.div>
      </div>
    </section>
  );
}
