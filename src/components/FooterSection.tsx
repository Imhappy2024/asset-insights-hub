const FooterSection = () => (
  <footer className="py-16 px-5 md:px-12 border-t border-border bg-background">
    <div className="max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
        <div>
          <img src="/folioexcel-logo.svg" alt="FolioExcel" className="h-8 w-auto invert mb-3" />
          <p className="text-[13px] text-fe-muted-dark leading-relaxed max-w-[240px]">
            The asset management dashboard built for multifamily operators who live in Excel.
          </p>
        </div>
        <div>
          <div className="text-[11px] font-bold text-fe-muted-dark tracking-widest uppercase mb-4">Product</div>
          <div className="flex flex-col gap-2.5">
            {["Features", "Reports", "How It Works", "FAQ"].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="text-[13px] text-fe-muted-dark hover:text-foreground transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-fe-muted-dark tracking-widest uppercase mb-4">Integrations</div>
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] text-fe-muted-dark flex items-center gap-2">
              AppFolio
              <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold tracking-wider uppercase">Live</span>
            </span>
            <span className="text-[13px] text-fe-muted-dark">More via open API</span>
          </div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-fe-muted-dark tracking-widest uppercase mb-4">Company</div>
          <div className="flex flex-col gap-2.5">
            <a href="#capture" className="text-[13px] text-fe-muted-dark hover:text-foreground transition-colors">Get Early Access</a>
            <a href="mailto:hello@folioexcel.com" className="text-[13px] text-fe-muted-dark hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-border gap-3 text-center">
        <p className="text-xs text-fe-muted-dark">© {new Date().getFullYear()} FolioExcel. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="text-xs text-fe-muted-dark hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="text-xs text-fe-muted-dark hover:text-foreground transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
