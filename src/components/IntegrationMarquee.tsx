const integrations = [
  { name: "AppFolio", color: "#0072CE", abbr: "AF" },
  { name: "Yardi Breeze", color: "#E31837", abbr: "Y" },
  { name: "Yardi Voyager", color: "#C00F25", abbr: "Y" },
  { name: "Buildium", color: "#0D5EAF", abbr: "Bu" },
  { name: "Rent Manager", color: "#1F3A5F", abbr: "RM" },
  { name: "RealPage", color: "#005BAC", abbr: "RP" },
  { name: "Entrata", color: "#FF5500", abbr: "En" },
];

const IntegrationMarquee = () => {
  const cards = [...integrations, ...integrations];

  return (
    <div className="py-10 border-t border-b border-border bg-foreground/[0.015] overflow-hidden">
      <div className="text-center text-[11px] font-bold tracking-[0.1em] uppercase text-fe-muted-dark mb-6">
        Connects to your existing PM software
      </div>
      <div className="flex w-max" style={{ animation: "marquee 30s linear infinite" }}>
        {cards.map((int, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-5 py-2.5 mx-2 bg-foreground/[0.04] border border-foreground/[0.08] rounded-xl whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.04)_inset] hover:bg-foreground/[0.07] hover:-translate-y-0.5 transition-all cursor-default"
          >
            <div
              className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-[11px] font-extrabold text-primary-foreground shrink-0"
              style={{ background: int.color }}
            >
              {int.abbr}
            </div>
            <span className="text-[13px] font-bold text-foreground">{int.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationMarquee;
