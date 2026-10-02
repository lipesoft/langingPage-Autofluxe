import { ScreenCanvas, ScreenEyebrow, screenType } from "./ScreenPrimitives";

type KdsOrder = {
  number: string;
  customer: string;
  item: string;
  elapsed: string;
  stage: string;
  variant: "waiting" | "preparing";
};

const orders: KdsOrder[] = [
  { number: "043", customer: "Pedro", item: "2 × Combo", elapsed: "01m", stage: "Na fila", variant: "waiting" },
  { number: "042", customer: "Ana Clara", item: "1 × Bowl", elapsed: "03m", stage: "Em preparo", variant: "preparing" },
];

function KdsColumn({ order }: { order: KdsOrder }) {
  const isPreparing = order.variant === "preparing";

  return (
    <section className="flex min-w-0 flex-col">
      <div className="mb-[2%] flex items-center justify-between gap-1 border-b border-white/10 pb-[3%]">
        <h3 className={[screenType.eyebrow, "truncate text-screen-muted"].join(" ")}>{order.stage}</h3>
        <span className={[screenType.caption, "font-mono tabular-nums text-paper/70"].join(" ")}>01</span>
      </div>
      <article className={["flex-1 rounded-[calc(var(--dw)*0.02)] border p-[3%]", isPreparing ? "border-signal/35 bg-signal/10" : "border-white/10 bg-screen-raised"].join(" ")}>
        <div className="flex items-center justify-between gap-1">
          <span className={[screenType.title, "font-mono font-bold tabular-nums text-paper"].join(" ")}>#{order.number}</span>
          <span className={[screenType.caption, "font-mono tabular-nums text-screen-muted"].join(" ")}>{order.elapsed}</span>
        </div>
        <p className={[screenType.caption, "mt-[2%] truncate text-screen-muted"].join(" ")}>{order.customer} · {order.item}</p>
      </article>
    </section>
  );
}

export function KdsScreen() {
  return (
    <ScreenCanvas density="compact" className="bg-screen">
      <header className="flex items-center justify-between gap-2">
        <ScreenEyebrow>KDS · cozinha</ScreenEyebrow>
        <span className={[screenType.caption, "shrink-0 font-mono tabular-nums text-screen-muted"].join(" ")}>11:42</span>
      </header>
      <div className="mt-[2%] grid flex-1 grid-cols-2 gap-[3%]">
        {orders.map((order) => <KdsColumn key={order.number} order={order} />)}
      </div>
    </ScreenCanvas>
  );
}
