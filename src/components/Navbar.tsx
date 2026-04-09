import { useState } from "react";
import TrialFormModal from "./TrialFormModal";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-[52px] h-[66px] bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="font-display font-bold text-xl tracking-tight text-foreground">
          Folio<span className="text-primary">Excel</span>
        </div>
        <ul className="hidden md:flex gap-8 list-none">
          {["Features", "Reports", "How It Works", "FAQ"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-fe-muted-dark text-sm font-medium hover:text-foreground transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex gap-3 items-center">
          {/* UPDATED: Desktop Sign In Button */}
          <button
            onClick={() => (window.location.href = "https://app.folioexcel.com/login")}
            className="px-4 py-2 rounded-lg text-fe-muted-dark font-semibold text-sm hover:text-foreground transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => setTrialOpen(true)}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-[0_4px_16px_hsl(162_100%_39%/0.35)] hover:shadow-[0_8px_24px_hsl(162_100%_39%/0.4)] hover:-translate-y-0.5 transition-all"
          >
            Get Your Free Trial
          </button>
        </div>
        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] p-1 bg-transparent border-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-[22px] h-0.5 bg-foreground rounded transition-all ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block w-[22px] h-0.5 bg-foreground rounded transition-all ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-[22px] h-0.5 bg-foreground rounded transition-all ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-[66px] left-0 right-0 bg-background/97 backdrop-blur-xl border-b border-border p-5 flex flex-col md:hidden z-[199]">
            {["Features", "Reports", "How It Works", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="py-3.5 text-[15px] font-semibold text-fe-muted-dark border-b border-border hover:text-foreground transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            {/* UPDATED: Mobile Sign In Button */}
            <button
              className="mt-3 py-3.5 text-[15px] font-semibold text-fe-muted-dark hover:text-foreground transition-colors text-left"
              onClick={() => {
                setMenuOpen(false);
                window.location.href = "https://app.folioexcel.com/login";
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                setTrialOpen(true);
              }}
              className="mt-2 bg-primary text-primary-foreground py-3.5 px-5 rounded-lg text-center font-bold shadow-[0_4px_16px_hsl(162_100%_39%/0.3)]"
            >
              Get Your Free Trial
            </button>
          </div>
        )}
      </nav>
      <TrialFormModal open={trialOpen} onClose={() => setTrialOpen(false)} />
    </>
  );
};

export default Navbar;
