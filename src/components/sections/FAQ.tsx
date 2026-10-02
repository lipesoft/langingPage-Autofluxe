const QUESTIONS = [
  {
    question: "Os números e status mostrados na página são reais?",
    answer:
      "Não. Os pedidos, nomes, horários e status das telas são dados ilustrativos usados apenas para demonstrar a experiência. A página não está conectada a uma operação de restaurante.",
  },
  {
    question: "Quais partes da operação aparecem na demonstração?",
    answer:
      "A demonstração visual percorre pedido, cozinha, retirada e gestão. Os módulos, equipamentos e integrações disponíveis para cada negócio precisam ser confirmados com a equipe Autofluxe.",
  },
  {
    question: "O Autofluxe pode atender mais de uma unidade?",
    answer:
      "A página mostra uma visão ilustrativa por unidade. O escopo disponível para sua operação e a forma de gestão de cada loja devem ser validados durante a conversa.",
  },
  {
    question: "Como posso conhecer o Autofluxe no meu cenário?",
    answer:
      "Preencha o formulário de contato. Seu aplicativo de e-mail será aberto com uma mensagem pronta para você revisar e enviar à equipe.",
  },
];

export default function FAQ() {
  return (
    <section id="perguntas" className="border-t border-border bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-content gap-10 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="max-w-[410px]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep">Perguntas frequentes</p>
          <h2 className="mt-3 text-balance font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.3rem]">
            Antes de conectar sua operação.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            O que esta página demonstra e o que precisa ser alinhado para cada negócio.
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {QUESTIONS.map((item, index) => (
            <details key={item.question} className="group py-4" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 text-left text-sm font-semibold text-ink marker:hidden focus-visible:outline-2 focus-visible:outline-signal">
                {item.question}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-brand-deep transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="max-w-[68ch] pb-2 pt-3 text-sm leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
