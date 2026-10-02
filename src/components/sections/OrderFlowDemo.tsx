import { Check, ChefHat, ClipboardList, MonitorSmartphone, PanelsTopLeft, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
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
  const finished = stage === STEPS.length - 1;
  const active = stage < 0 ? -1 : Math.min(stage, STEPS.length - 1);
  const progress = active < 0 ? 0 : ((active + 1) / STEPS.length) * 100;
  const activeStep = active >= 0 ? STEPS[active] : null;
  const ActiveIcon = activeStep?.icon ?? MonitorSmartphone;

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
            <p className="mt-3 text-xs leading-relaxed text-muted-2">
              Esta é uma demonstração visual. Os nomes, números e status são ilustrativos.
            </p>
            <Button onClick={onStart} variant="primary" className="mt-6" disabled={stage >= 0 && !finished}>
              {finished ? <RotateCcw size={15} aria-hidden="true" /> : null}
              {stage < 0 ? "Fazer pedido" : finished ? "Simular novamente" : "Pedido em andamento"}
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-panel">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF1E6] text-brand-deep">
                  <ActiveIcon size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">Pedido #042</p>
                  <p className="text-[10px] text-muted">Fluxo de demonstração</p>
                </div>
              </div>
              <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-muted" aria-live="polite">
                {activeStep?.title ?? "Aguardando pedido"}
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3 text-[10px] font-medium text-muted">
                <span>Totem</span>
                <span>KDS · Cozinha</span>
                <span>Retirada</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EEF0F3]" role="progressbar" aria-label="Progresso do pedido" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#FFA000] to-[#E02010]"
                  animate={{ width: progress + "%" }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const complete = active >= index;
                  const current = active === index;
                  return (
                    <div
                      key={step.title}
                      className={[
                        "min-h-[112px] rounded-xl border p-3 transition-colors duration-300",
                        current ? "border-[#F5B27D] bg-[#FFF7F0]" : complete ? "border-[#F4D7C5] bg-[#FFFCF9]" : "border-border bg-white",
                      ].join(" ")}
                    >
                      <span className={["flex h-7 w-7 items-center justify-center rounded-lg", complete ? "bg-[#FFE6D3] text-brand-deep" : "bg-[#F3F4F6] text-muted-2"].join(" ")}>
                        <Icon size={14} aria-hidden="true" />
                      </span>
                      <p className="mt-2.5 text-[11px] font-bold leading-snug text-ink">{step.title}</p>
                      <p className="mt-1 text-[10px] leading-relaxed text-muted">{step.detail}</p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 min-h-5 text-xs text-muted" aria-live="polite">
                {activeStep ? activeStep.detail : "Clique em “Fazer pedido” para acompanhar o fluxo."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
