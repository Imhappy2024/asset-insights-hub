import { motion } from "framer-motion";

const features = [
  {
    icon: "📡",
    iconClass: "bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20",
    title: "Live PM Sync",
    desc: "Direct integration with your property management software. Data flows automatically — no imports, no exports, no lag.",
    bullets: [
      "Real-time unit-level and property-level data",
      "Multi-platform simultaneous sync",
      "Instant data availability on login",
    ],
  },
  {
    icon: "📊",
    iconClass: "bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/[0.18]",
    title: "Asset Manager Dashboards",
    desc: "Track NOI, Occupancy, Delinquency, Unit Data, DSCR, Utility Income & Delinquency Ratios, Total Income & Expenses and 10+ more KPIs.",
    bullets: [
      "View month-by-month or trailing 12 months",
      "Negative Cash Flow dashboard — see actual cash flow after removing prepaid rents, contributions, distributions & security deposits",
      "Portfolio, property & unit-level views",
    ],
  },
  {
    icon: "⚡",
    iconClass: "bg-gradient-to-br from-fe-gold/10 to-fe-gold/5 border border-fe-gold/20",
    title: "One-Click Excel Export",
    desc: "Export any dashboard view to a clean, structured Excel file — ready to manipulate, filter, and analyze however your team needs.",
    bullets: [
      "Export different views and reports",
      "Formatted and structured automatically",
      "Download and work in Excel anytime",
    ],
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 md:py-28 px-5 md:px-12 bg-fe-light text-fe-text-light">
    <div className="max-w-[1100px] mx-auto">
      <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-primary mb-5">
        <span className="block w-[22px] h-0.5 bg-primary rounded" />
        Platform
      </div>
      <h2 className="text-[clamp(28px,3.8vw,50px)] font-extrabold leading-[1.08] tracking-[-0.028em] text-fe-text-light mb-4">
        Everything an asset manager<br />
        <em className="font-serif italic font-normal text-primary">actually needs</em>
      </h2>
      <p className="text-[17px] text-fe-muted-light max-w-[520px] leading-relaxed mb-14">
        Built around your workflow — not the other way around. FolioExcel surfaces the right data at the right time, without the spreadsheet gymnastics.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-fe-card-light border border-[hsl(var(--fe-border-light))] rounded-2xl p-8 shadow-[0_4px_20px_rgba(13,16,32,0.08),0_1px_0_rgba(255,255,255,0.9)_inset,0_0_0_1px_rgba(13,16,32,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(13,16,32,0.14)] transition-all relative overflow-hidden group cursor-default"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-[19px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${f.iconClass}`}>
              {f.icon}
            </div>
            <h3 className="text-base font-bold text-fe-text-light mb-2">{f.title}</h3>
            <p className="text-[13.5px] text-fe-muted-light leading-relaxed">{f.desc}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {f.bullets.map((b) => (
                <li key={b} className="text-[12.5px] text-[#4a5070] flex items-start gap-2">
                  <span className="text-primary text-[10px] mt-0.5 shrink-0">→</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
