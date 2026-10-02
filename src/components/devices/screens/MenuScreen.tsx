import { ShoppingBag, Utensils } from "lucide-react";
import { ScreenCanvas, ScreenEyebrow, screenType } from "./ScreenPrimitives";

const menuItems = [
  { name: "Combo da casa", detail: "Bowl + bebida", price: "32,90" },
  { name: "Prato do dia", detail: "Acompanha suco", price: "24,90" },
];

export function MenuScreen() {
  return (
    <ScreenCanvas className="bg-screen">
      <div className="flex items-center justify-between">
        <ScreenEyebrow>Autofluxe · menu</ScreenEyebrow>
        <Utensils className="h-[calc(var(--dw)*0.055)] w-[calc(var(--dw)*0.055)] text-signal-soft" aria-hidden="true" />
      </div>

      <div className="mt-[8%] flex items-center gap-[5%]">
        <span className="flex h-[calc(var(--dw)*0.16)] w-[calc(var(--dw)*0.16)] shrink-0 items-center justify-center rounded-[calc(var(--dw)*0.04)] bg-brand-deep">
          <ShoppingBag className="h-1/2 w-1/2 text-white" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className={[screenType.title, "font-semibold leading-tight text-paper"].join(" ")}>Escolha seu pedido</p>
          <p className={[screenType.caption, "mt-[3%] text-screen-muted"].join(" ")}>Mais pedidos hoje</p>
        </div>
      </div>

      <div className="mt-[8%] flex-1 space-y-[5%]">
        {menuItems.map((item, index) => (
          <div key={item.name} className="rounded-[calc(var(--dw)*0.025)] border border-white/10 bg-white/[0.04] px-[5%] py-[4%]">
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0">
                <p className={[screenType.body, "truncate font-semibold text-paper"].join(" ")}>{item.name}</p>
                <p className={[screenType.caption, "mt-[2%] text-screen-muted"].join(" ")}>{item.detail}</p>
              </div>
              <span className={[screenType.caption, "shrink-0 font-semibold text-signal-soft"].join(" ")}>R$ {item.price}</span>
            </div>
            {index === 0 && (
              <span className={[screenType.eyebrow, "mt-[4%] inline-block text-signal-soft"].join(" ")}>MAIS PEDIDO</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-[calc(var(--dw)*0.025)] bg-brand-deep px-[6%] py-[4%]">
        <span className={[screenType.caption, "font-semibold text-white"].join(" ")}>Revisar pedido</span>
        <span className={[screenType.caption, "font-mono text-white/80"].join(" ")}>#042 · 1 item</span>
      </div>
    </ScreenCanvas>
  );
}
