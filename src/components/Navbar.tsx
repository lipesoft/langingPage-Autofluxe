import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import Button from "./ui/Button";

const LINKS = [
  { label: "Produto", href: "#produto" },
  { label: "Recursos", href: "#recursos" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const headerClass = [
    "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
    scrolled
      ? "border-border bg-white/95 shadow-[0_10px_30px_-22px_rgba(36,44,55,0.48)] backdrop-blur-md"
      : "border-transparent bg-white/55 backdrop-blur-sm",
  ].join(" ");

  return (
    <header className={headerClass}>
      <nav aria-label="Navegação principal" className="mx-auto flex max-w-content items-center justify-between px-5 py-2.5 sm:px-8 sm:py-3">
        <a href="#top" className="block w-[148px] sm:w-[166px]" aria-label="Autofluxe — início">
          <BrandLogo />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-[13.5px] font-medium text-muted transition-colors hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#contato" variant="primary" className="!px-4 !py-2.5 text-[13px]">
            Solicitar demonstração
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-[#FFF1E6] focus-visible:outline-2 focus-visible:outline-signal lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <nav
        id="mobile-navigation"
        aria-label="Navegação mobile"
        hidden={!open}
        className="border-t border-border bg-white px-5 py-5 shadow-[0_18px_30px_-28px_rgba(36,44,55,0.55)] lg:hidden"
      >
          <ul className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-sm font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#contato" variant="primary" className="mt-5 w-full" onClick={() => setOpen(false)}>
            Solicitar demonstração
          </Button>
      </nav>
    </header>
  );
}
