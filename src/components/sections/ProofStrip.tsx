const CLARIFICATIONS = [
  {
    title: "Simulação visual",
    text: "Nenhum pedido é enviado a um restaurante por esta demonstração.",
  },
  {
    title: "Telas de exemplo",
    text: "Nomes, números e estados ilustram o fluxo; não representam uma operação conectada.",
  },
  {
    title: "Escopo por operação",
    text: "Disponibilidade de módulos, integrações e equipamentos é confirmada com a equipe.",
  },
];

export default function ProofStrip() {
  return (
    <section className="border-y border-border bg-white py-8 sm:py-9" aria-label="Transparência da demonstração">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-3 sm:gap-7">
          {CLARIFICATIONS.map((item) => (
            <div key={item.title} className="border-l-2 border-signal/50 pl-3.5">
              <h2 className="text-sm font-bold text-ink">{item.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
