import BrandLogo from "./BrandLogo";

const COLUMNS = [
  {
    title: "Produto",
    links: [
      { label: "Plataforma", href: "#produto" },
      { label: "Recursos", href: "#recursos" },
      { label: "Como funciona", href: "#como-funciona" },
    ],
  },
  {
    title: "Soluções",
    links: [
      { label: "Casos de uso", href: "#solucoes" },
      { label: "Solicitar demonstração", href: "#contato" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidade", href: "#" },
      { label: "Termos", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white py-14">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <a href="#top" className="block w-[155px]" aria-label="Autofluxe — início">
              <BrandLogo />
            </a>
            <p className="mt-4 max-w-[235px] text-[13px] leading-relaxed text-muted">
              Totem, cozinha e retirada conectados para uma operação que não para.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-[12px] font-bold uppercase tracking-wide text-muted-2">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[13.5px] font-medium text-muted transition-colors hover:text-brand-deep">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-[12px] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Autofluxe. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
