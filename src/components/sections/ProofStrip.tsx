const CLARIFICATIONS = [
  {
    title: "Um pedido, uma sequência",
    text: "Do atendimento à retirada, cada etapa recebe o contexto necessário para continuar o fluxo.",
  },
  {
    title: "Mais clareza para a equipe",
    text: "Atendimento, cozinha e balcão acompanham o pedido sem depender de mensagens desencontradas.",
  },
  {
    title: "Uma experiência mais simples",
    text: "O cliente faz o pedido com autonomia e encontra informações mais claras sobre o próximo passo.",
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
