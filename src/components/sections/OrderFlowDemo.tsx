import { Check, ChefHat, ClipboardList, Info, MonitorSmartphone, PanelsTopLeft, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import Button from "../ui/Button";

const STEPS = [
  { title: "Pedido criado", detail: "A escolha entra pelo totem.", icon: MonitorSmartphone },
  { title: "Pedido recebido", detail: "A operação vê o novo pedido.", icon: ClipboardList },
  { title: "Em preparo", detail: "A cozinha acompanha pelo KDS.", icon: ChefHat },
  { title: "Pronto para retirada", detail: "O status fica visível para a equipe.", icon: PanelsTopLeft },
  { title: "Retirado", detail: "O pedido conclui o fluxo.", icon: Check },
];

export default function OrderFlowDemo({
  stage,
  onStart,
}: {
  stage: number;
  onStart: () => void;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const active = stage < 0 ? -1 : Math.min(stage, STEPS.length - 1);
  const finished = active === STEPS.length - 1 && stage >= STEPS.length - 1;
  const progress = active < 0 ? 0 : ((active + 1) / STEPS.length) * 100;
  const activeStep = active >= 0 ? STEPS[active] : null;
  const ActiveIcon = activeStep?.icon ?? MonitorSmartphone;
  const progressLabel = activeStep
    ? `Etapa ${active + 1} de ${STEPS.length} · ${activeStep.title}`
    : "Pronto para acompanhar o pedido";

  return (
    <section id="demonstracao" className="border-t border-border bg-[#FFF9F4] py-20 sm:py-24">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="max-w-[500px]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Demonstração interativa</p>
            <h2 className="mt-3 text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.3rem]">
              Veja um pedido entrar em fluxo.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Inicie a simulação e acompanhe o mesmo pedido passar pelo atendimento, cozinha e retirada.
            </p>
            <p className="mt-3 inline-flex items-start gap-2 text-xs leading-relaxed text-muted">
              <Info size={14} className="mt-0.5 shrink-0 text-brand-deep" aria-hidden="true" />
              Demonstração visual — nenhum pedido real será enviado.
            </p>
            <Button onClick={onStart} variant="primary" className="mt-6 min-h-11" disabled={stage >= 0 && !finished}>
              {finished ? <RotateCcw size={15} aria-hidden="true" /> : null}
              {stage < 0 ? "Iniciar simulação" : finished ? "Repetir simulação" : "Simulação em andamento…"}
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-panel">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF1E6] text-brand-deep">
                  <ActiveIcon size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">Pedido demonstrativo #042</p>
                  <p className="mt-0.5 text-xs text-muted">Fluxo visual</p>
                </div>
              </div>
              <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted">
                {activeStep?.title ?? "Aguardando simulação"}
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3 text-xs font-medium text-muted">
                <span>Totem</span>
                <span>KDS · Cozinha</span>
                <span>Retirada</span>
              </div>
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EEF0F3]"
                role="progressbar"
                aria-label="Progresso do pedido"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-valuetext={progressLabel}
              >
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-[#FFA000] to-[#E02010]"
                  initial={false}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                />
              </div>

              <ol className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5" aria-label="Etapas da simulação">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const complete = active > index || finished;
                  const current = active === index && !finished;
                  const StepIcon = complete ? Check : Icon;
                  return (
                    <motion.li
                      key={step.title}
                      aria-current={current ? "step" : undefined}
                      className={[
                        "min-h-[132px] rounded-xl border p-3 transition-colors duration-200",
                        current ? "border-[#F5B27D] bg-[#FFF7F0]" : complete ? "border-[#D0EADB] bg-[#F7FCF9]" : "border-border bg-white",
                      ].join(" ")}
                      animate={current ? { y: -2 } : { y: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.18 }}
                    >
                      <span className={[
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        complete ? "bg-success/10 text-success" : current ? "bg-[#FFE6D3] text-brand-deep" : "bg-[#F3F4F6] text-muted-2",
                      ].join(" ")}>
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={complete ? "complete" : "pending"}
                            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: reduceMotion ? 0 : 0.16 }}
                            className="flex"
                          >
                            <StepIcon size={15} aria-hidden="true" />
                          </motion.span>
                        </AnimatePresence>
                      </span>
                      <p className="mt-2.5 text-xs font-bold leading-snug text-ink">{step.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{step.detail}</p>
                    </motion.li>
                  );
                })}
              </ol>

              <div className="mt-4 min-h-6 text-xs text-muted" role="status" aria-live="polite" aria-atomic="true">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={progressLabel}
                    initial={reduceMotion ? false : { opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -4 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  >
                    {progressLabel}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
