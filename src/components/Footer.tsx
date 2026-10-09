import BrandLogo from "./BrandLogo";

const COLUMNS = [
  {
    title: "Produto",
    links: [
      { label: "Plataforma", href: "#produto" },
      { label: "Recursos", href: "#recursos" },
      { label: "Painel", href: "#painel" },
    ],
  },
  {
    title: "Operação",
    links: [
      { label: "Soluções", href: "#solucoes" },
      { label: "Demonstração", href: "#demonstracao" },
      { label: "Perguntas frequentes", href: "#perguntas" },
    ],
  },
  {
    title: "Contato",
    links: [{ label: "Solicitar demonstração", href: "#contato" }],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-9 sm:grid-cols-4 sm:gap-8">
          <div className="col-span-2 sm:col-span-1">
            <a href="#top" className="block w-[150px]" aria-label="Autofluxe, início">
              <BrandLogo loading="lazy" />
            </a>
            <p className="mt-4 max-w-[235px] text-[13px] leading-relaxed text-muted">
              Pedido, cozinha, retirada e gestão apresentados em um fluxo só.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-[12px] font-bold uppercase tracking-wide text-muted-2">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[13px] font-medium text-muted transition-colors hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-signal">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-5 text-[12px] text-muted-2">
          <span>© {new Date().getFullYear()} Autofluxe. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
