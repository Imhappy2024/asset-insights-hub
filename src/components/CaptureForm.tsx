import { useState } from "react";
import { motion } from "framer-motion";

const CALENDLY_URL = "YOUR_CALENDLY_LINK_HERE";

const CaptureForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    portfolioSize: "",
    pmSoftware: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    window.open(CALENDLY_URL, "_blank");
  };

  return (
    <section id="capture" className="py-24 md:py-28 px-5 md:px-12 relative overflow-hidden" style={{
      background: "linear-gradient(160deg, hsl(var(--fe-dark2)) 0%, hsl(230 30% 8%) 50%, hsl(var(--fe-dark2)) 100%)"
    }}>
      {/* Orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(162_100%_39%/0.1),transparent_65%)] -top-[100px] -right-[100px] blur-[80px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,hsl(213_100%_52%/0.08),transparent_65%)] -bottom-[80px] -left-[80px] blur-[80px] pointer-events-none" />

      <div className="max-w-[680px] mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-[11px] font-machine font-bold tracking-[0.1em] uppercase text-primary mb-5 justify-center">
          <span className="block w-[22px] h-0.5 bg-primary rounded" />
          Get Early Access
          <span className="block w-[22px] h-0.5 bg-primary rounded" />
        </div>
        <h2 className="font-display text-[clamp(28px,3.8vw,50px)] font-bold leading-[1.08] tracking-[-0.02em] text-foreground mb-4">
          Stop building reports.<br />
          <em className="font-serif italic font-normal text-primary">Start making decisions.</em>
        </h2>
        <p className="text-[17px] text-fe-muted-dark mb-10 leading-relaxed">
          Join the early access list and be among the first to experience FolioExcel. We'll reach out to set up your account.
        </p>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-foreground/[0.04] border border-foreground/10 rounded-2xl p-6 md:p-8 shadow-[0_8px_48px_rgba(0,0,0,0.4)] text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Marcus Reid"
                  className="px-3.5 py-2.5 bg-foreground/5 border border-foreground/10 rounded-lg text-foreground text-sm outline-none focus:border-primary/40 focus:bg-foreground/[0.07] focus:ring-[3px] focus:ring-primary/[0.08] transition-all shadow-[0_2px_6px_rgba(0,0,0,0.2)] placeholder:text-foreground/20"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">Work Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="marcus@ridgelinecapital.com"
                  className="px-3.5 py-2.5 bg-foreground/5 border border-foreground/10 rounded-lg text-foreground text-sm outline-none focus:border-primary/40 focus:bg-foreground/[0.07] focus:ring-[3px] focus:ring-primary/[0.08] transition-all shadow-[0_2px_6px_rgba(0,0,0,0.2)] placeholder:text-foreground/20"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Ridgeline Capital"
                  className="px-3.5 py-2.5 bg-foreground/5 border border-foreground/10 rounded-lg text-foreground text-sm outline-none focus:border-primary/40 focus:bg-foreground/[0.07] focus:ring-[3px] focus:ring-primary/[0.08] transition-all shadow-[0_2px_6px_rgba(0,0,0,0.2)] placeholder:text-foreground/20"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">Portfolio Size</label>
                <select
                  value={formData.portfolioSize}
                  onChange={(e) => setFormData({ ...formData, portfolioSize: e.target.value })}
                className="px-3.5 py-2.5 bg-[hsl(var(--fe-dark2))] border border-foreground/10 rounded-lg text-foreground text-sm outline-none focus:border-primary/40 appearance-none cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.2)] [&>option]:bg-[hsl(230,30%,12%)] [&>option]:text-foreground [&>option]:py-2"
                >
                  <option value="">Select range</option>
                  <option>Under 100 units</option>
                  <option>100–500 units</option>
                  <option>500–1,000 units</option>
                  <option>1,000–5,000 units</option>
                  <option>5,000+ units</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">PM Software You Use</label>
              <select
                value={formData.pmSoftware}
                onChange={(e) => setFormData({ ...formData, pmSoftware: e.target.value })}
                className="px-3.5 py-2.5 bg-[hsl(var(--fe-dark2))] border border-foreground/10 rounded-lg text-foreground text-sm outline-none focus:border-primary/40 appearance-none cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.2)] [&>option]:bg-[hsl(230,30%,12%)] [&>option]:text-foreground [&>option]:py-2"
              >
                <option value="">Select platform</option>
                <option>AppFolio</option>
                <option>Yardi Breeze</option>
                <option>Yardi Voyager</option>
                <option>Buildium</option>
                <option>Rent Manager</option>
                <option>RealPage</option>
                <option>Entrata</option>
                <option>Multiple platforms</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 mb-6">
              <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">Anything specific you'd like to see? (optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. negative cash flow tracking, multi-platform reporting..."
                className="px-3.5 py-2.5 bg-foreground/5 border border-foreground/10 rounded-lg text-foreground text-sm outline-none focus:border-primary/40 focus:bg-foreground/[0.07] focus:ring-[3px] focus:ring-primary/[0.08] transition-all shadow-[0_2px_6px_rgba(0,0,0,0.2)] placeholder:text-foreground/20 resize-none h-[70px]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-lg font-bold text-[15px] shadow-[0_6px_28px_hsl(162_100%_39%/0.38)] hover:bg-[#00e0aa] hover:-translate-y-0.5 hover:shadow-[0_14px_44px_hsl(162_100%_39%/0.45)] transition-all"
            >
              Request Early Access →
            </button>
            <p className="text-xs text-fe-muted-dark mt-3 text-center">🔒 No payment required · You'll be redirected to schedule a call</p>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-foreground/[0.04] border border-primary/20 rounded-2xl p-10 text-center"
          >
            <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary/20 to-accent/15 border-2 border-primary/30 flex items-center justify-center mx-auto mb-5 text-3xl shadow-[0_8px_32px_hsl(162_100%_39%/0.2)]">
              ✓
            </div>
            <h3 className="font-display text-[22px] font-bold text-foreground mb-3">You're on the list!</h3>
            <p className="text-sm text-fe-muted-dark max-w-[400px] mx-auto leading-relaxed">
              Thanks, {formData.name}! We've opened our scheduling page in a new tab — book a quick call and we'll get you set up.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CaptureForm;
