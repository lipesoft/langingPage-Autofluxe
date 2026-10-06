import { ChefHat, ClipboardList, PanelsTopLeft } from "lucide-react";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const ROUTINE_POINTS = [
  {
    icon: ClipboardList,
    label: "Pedido",
    title: "Mais contexto entre atendimento e operação",
    description: "A origem e o estado do pedido aparecem juntos para a equipe acompanhar a sequência sem perder o contexto.",
  },
  {
    icon: ChefHat,
    label: "Cozinha · KDS",
    title: "Uma fila mais clara para preparar",
    description: "O KDS ilustrativo organiza comandas por etapa para a equipe identificar o que chegou e o que está em preparo.",
  },
  {
    icon: PanelsTopLeft,
    label: "Retirada",
    title: "Status de pronto em evidência",
    description: "A tela de retirada destaca pedidos prontos para apoiar uma chamada mais fácil de reconhecer no balcão.",
  },
];

export default function FeatureShowcase() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="recursos" className="border-t border-border bg-surface-elevated py-20 sm:py-24">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Recursos na rotina</p>
            <h2 className="mt-3 text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.3rem]">
              Menos ruído entre os pontos da operação.
            </h2>
          </div>
          <p className="max-w-prose text-[15px] leading-relaxed text-muted">
            O valor está em cada etapa encontrar a próxima com o estado do pedido mais claro para quem atende, prepara e entrega.
          </p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3 md:gap-4">
          {ROUTINE_POINTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.label}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : index * 0.07, ease: "easeOut" }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className="group min-h-[210px] rounded-xl border border-border bg-white p-5 shadow-[0_1px_0_rgba(36,44,55,0.02)] transition-[border-color,box-shadow] duration-200 hover:border-[#F1C8AE] hover:shadow-panel sm:p-6"
              >
                <div className="flex items-center gap-2.5 text-brand-deep">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF1E6]">
                    <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.1em]">{item.label}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
