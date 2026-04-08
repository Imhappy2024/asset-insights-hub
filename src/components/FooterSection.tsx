const FooterSection = () => (
  <footer className="py-16 px-5 md:px-12 border-t border-border bg-background">
    <div className="max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
        <div>
          <div className="font-extrabold text-lg text-foreground mb-3">
            Folio<span className="text-primary">Excel</span>
          </div>
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
            {["AppFolio", "Yardi", "Buildium", "Rent Manager", "RealPage", "Entrata"].map((int) => (
              <span key={int} className="text-[13px] text-fe-muted-dark">{int}</span>
            ))}
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
