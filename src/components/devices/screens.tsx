import { Play, Utensils, TrendingUp } from "lucide-react";

const wrap = "absolute inset-0 flex flex-col p-[8%] text-paper";
const fz = {
  xs: "text-[calc(var(--dw)*0.038)]",
  sm: "text-[calc(var(--dw)*0.045)]",
  md: "text-[calc(var(--dw)*0.052)]",
  lg: "text-[calc(var(--dw)*0.09)]",
  xl: "text-[calc(var(--dw)*0.16)]",
};

export function MenuScreen() {
  const items = [
    { name: "Combo Executivo", price: "R$ 32,90" },
    { name: "Prato do dia", price: "R$ 24,90" },
    { name: "Suco natural", price: "R$ 9,90" },
  ];

  return (
    <div className={[wrap, "bg-[#171C26]"].join(" ")}>
      <div className="flex items-center justify-between">
        <span className={[fz.xs, "font-semibold uppercase tracking-wide text-[#AFB8C7]"].join(" ")}>Cardápio do dia</span>
        <Utensils className="h-3 w-3 text-signal" />
      </div>
      <div className="mt-[10%] flex-1 space-y-[9%]">
        {items.map((item) => (
          <div key={item.name} className="flex items-baseline justify-between border-b border-white/10 pb-[6%]">
            <span className={[fz.md, "text-paper/90"].join(" ")}>{item.name}</span>
            <span className={[fz.md, "font-semibold text-signal-soft"].join(" ")}>{item.price}</span>
          </div>
        ))}
      </div>
      <div className={["rounded-[3px] bg-brand-deep px-[6%] py-[4%] text-center", fz.sm, "font-semibold text-white"].join(" ")}>
        Adicionar pedido
      </div>
    </div>
  );
}

export function WeatherScreen() {
  return (
    <div className={[wrap, "items-center justify-center bg-gradient-to-b from-[#242C37] to-[#151A24] text-center"].join(" ")}>
      <span className={[fz.xs, "uppercase tracking-wide text-[#AFB8C7]"].join(" ")}>Pedido pronto</span>
      <span className={["mt-[6%] font-display", fz.xl, "font-bold leading-none text-signal-soft"].join(" ")}>042</span>
      <span className={["mt-[4%]", fz.sm, "text-paper"].join(" ")}>Ana Clara</span>
      <div className={["mt-[10%] w-full rounded-[3px] border border-white/15 bg-white/5 py-[4%]", fz.xs, "text-[#D6DCE5]"].join(" ")}>
        Retire no balcão
      </div>
    </div>
  );
}

export function PromoScreen() {
  return (
    <div className={[wrap, "items-center justify-center bg-gradient-to-br from-[#FFA000] via-[#F56A0A] to-[#E02010] text-center"].join(" ")}>
      <span className={[fz.xs, "font-semibold uppercase tracking-[0.15em] text-white/85"].join(" ")}>Combo em destaque</span>
      <span className={["mt-[6%] font-display", fz.xl, "font-extrabold leading-none text-white"].join(" ")}>R$ 29</span>
      <span className={["mt-[6%]", fz.sm, "text-white/90"].join(" ")}>sabor, rapidez e praticidade</span>
      <div className={["mt-[10%] rounded-full border border-white/45 bg-white/10 px-[8%] py-[3%]", fz.xs, "font-semibold text-white"].join(" ")}>
        peça agora
      </div>
    </div>
  );
}

export function NewsScreen() {
  return (
    <div className={[wrap, "justify-between bg-[#171C26]"].join(" ")}>
      <div className="flex items-center gap-[4%]">
        <TrendingUp className="h-3 w-3 text-signal" />
        <span className={[fz.xs, "font-semibold uppercase tracking-wide text-[#AFB8C7]"].join(" ")}>Operação ao vivo</span>
      </div>
      <p className={[fz.md, "leading-snug text-paper/90"].join(" ")}>
        Todos os pedidos chegam à cozinha com a informação certa e no momento certo.
      </p>
      <div className="overflow-hidden rounded-[2px] bg-brand-red py-[3%]">
        <span className={["block whitespace-nowrap", fz.xs, "font-semibold text-white animate-marquee"].join(" ")}>
          PEDIDOS EM ANDAMENTO • COZINHA CONECTADA • RETIRADA ORGANIZADA &nbsp;&nbsp;&nbsp;
          PEDIDOS EM ANDAMENTO • COZINHA CONECTADA • RETIRADA ORGANIZADA &nbsp;&nbsp;&nbsp;
        </span>
      </div>
    </div>
  );
}

export function CorporateScreen() {
  return (
    <div className={[wrap, "bg-[#171C26]"].join(" ")}>
      <span className={[fz.xs, "font-semibold uppercase tracking-wide text-[#AFB8C7]"].join(" ")}>Cozinha</span>
      <span className={["mt-[3%] font-display", fz.lg, "font-semibold text-paper"].join(" ")}>Pedidos em preparo</span>
      <div className="mt-[10%] flex-1 space-y-[8%]">
        <div className={["flex items-center justify-between", fz.sm].join(" ")}>
          <span className="text-paper/85">042 — Ana Clara</span>
          <span className="text-success">Agora</span>
        </div>
        <div className={["flex items-center justify-between", fz.sm, "text-[#AFB8C7]"].join(" ")}>
          <span>043 — Pedro</span>
          <span>Depois</span>
        </div>
      </div>
    </div>
  );
}

export function SplitZonesScreen() {
  return (
    <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[2%] bg-[#151A24] p-[2%]">
      <div className="col-span-2 row-span-2 flex flex-col items-center justify-center rounded-[3px] bg-gradient-to-br from-[#2B3443] to-[#171C26]">
        <Play className="h-[calc(var(--dw)*0.09)] w-[calc(var(--dw)*0.09)] fill-paper/80 text-paper/80" />
        <span className={[fz.xs, "mt-[5%] text-paper/80"].join(" ")}>Cardápio ativo</span>
      </div>
      <div className="flex items-center justify-center rounded-[3px] bg-brand-deep">
        <span className={[fz.xs, "font-semibold text-white"].join(" ")}>Pedido pronto</span>
      </div>
      <div className="flex items-center justify-center rounded-[3px] bg-[#242C37]">
        <span className={[fz.xs, "text-[#AFB8C7]"].join(" ")}>KDS online</span>
      </div>
    </div>
  );
}

export function QueueScreen() {
  return (
    <div className={[wrap, "items-center justify-center bg-[#171C26] text-center"].join(" ")}>
      <span className={[fz.xs, "font-semibold uppercase tracking-wide text-[#AFB8C7]"].join(" ")}>Pedido pronto</span>
      <span className={["mt-[5%] font-display", fz.xl, "font-extrabold text-signal-soft"].join(" ")}>042</span>
      <span className={["mt-[5%]", fz.sm, "text-paper/85"].join(" ")}>Ana Clara</span>
      <div className="mt-[12%] w-full space-y-[6%] border-t border-white/10 pt-[8%]">
        <div className={["flex justify-between", fz.xs, "text-[#8F99A8]"].join(" ")}>
          <span>038</span>
          <span>Pedro</span>
        </div>
        <div className={["flex justify-between", fz.xs, "text-[#8F99A8]"].join(" ")}>
          <span>041</span>
          <span>Marina</span>
        </div>
      </div>
    </div>
  );
}

export function ClassScheduleScreen() {
  const rows = [
    { time: "08m", name: "Pedido 042", room: "Em preparo" },
    { time: "11m", name: "Pedido 043", room: "Aguardando" },
    { time: "15m", name: "Pedido 044", room: "Na fila" },
  ];

  return (
    <div className={[wrap, "bg-[#171C26]"].join(" ")}>
      <span className={[fz.xs, "font-semibold uppercase tracking-wide text-[#AFB8C7]"].join(" ")}>KDS da cozinha</span>
      <div className="mt-[8%] flex-1 space-y-[8%]">
        {rows.map((row) => (
          <div key={row.name} className="flex items-center justify-between border-b border-white/10 pb-[6%]">
            <span className={[fz.md, "font-mono text-signal-soft"].join(" ")}>{row.time}</span>
            <span className={[fz.md, "text-paper/85"].join(" ")}>{row.name}</span>
            <span className={[fz.xs, "text-[#8F99A8]"].join(" ")}>{row.room}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VideoScreen({ label = "Operação em tempo real" }: { label?: string }) {
  return (
    <div className={[wrap, "items-center justify-center bg-gradient-to-br from-[#2B3443] to-[#171C26]"].join(" ")}>
      <div className="flex h-[22%] w-[22%] items-center justify-center rounded-full border border-white/15 bg-white/5">
        <Play className="h-[45%] w-[45%] fill-paper text-paper" />
      </div>
      <span className={["mt-[8%]", fz.sm, "text-[#AFB8C7]"].join(" ")}>{label}</span>
      <div className="mt-[10%] h-[3px] w-[70%] overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-2/3 rounded-full bg-signal" />
      </div>
    </div>
  );
}
