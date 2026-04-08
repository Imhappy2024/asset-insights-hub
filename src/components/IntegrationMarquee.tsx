const IntegrationMarquee = () => {
  return (
    <div className="py-10 border-t border-b border-border bg-foreground/[0.015]">
      <div className="text-center text-[11px] font-bold tracking-[0.1em] uppercase text-fe-muted-dark mb-2">
        Currently integrated with AppFolio · Open API architecture supports additional platforms
      </div>
      <div className="flex justify-center mt-5 mb-4">
        <div className="flex items-center gap-2.5 px-6 py-3 bg-foreground/[0.04] border border-foreground/[0.08] rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.04)_inset] cursor-default">
          <div
            className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-[12px] font-extrabold text-primary-foreground shrink-0"
            style={{ background: "#0072CE" }}
          >
            AF
          </div>
          <span className="text-[15px] font-bold text-foreground">AppFolio</span>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-wider uppercase">Live</span>
        </div>
      </div>
      <p className="text-center text-[12px] text-fe-muted-dark mt-4">
        Using Yardi, Buildium, or another platform? <a href="#capture" className="text-primary hover:underline font-semibold">Reach out</a> — integrations are built together.
      </p>
    </div>
  );
};

export default IntegrationMarquee;
