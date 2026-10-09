import ContactForm from "./ContactForm";

export default function FinalCTA() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-[#313A4A] bg-[#171D26] py-20 sm:py-24">
      <div
        className="pointer-events-none absolute right-[-15%] top-[-35%] h-[520px] w-[650px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,160,0,0.8), rgba(224,32,16,0.2) 48%, transparent 72%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-content gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div className="max-w-[490px]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-signal-soft">Próximo passo</p>
          <h2 className="mt-3 text-balance font-display text-[2rem] font-extrabold leading-[1.12] text-white sm:text-[2.6rem]">
            Descubra como organizar melhor a sua operação.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#C7CED9]">
            Conte como seu restaurante funciona hoje. A equipe apresenta o Autofluxe com foco nos pontos que mais impactam o seu dia a dia.
          </p>
          <a href="#demonstracao" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-signal">
            Antes, veja a demonstração
          </a>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
