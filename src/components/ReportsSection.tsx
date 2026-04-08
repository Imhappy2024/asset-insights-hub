import { motion } from "framer-motion";

const reports = [
  { icon: "📋", color: "rgba(0,200,150,0.1)", title: "Rent Roll", desc: "In-place rents, lease expirations, and tenant details" },
  { icon: "📋", color: "rgba(10,132,255,0.1)", title: "Rent Roll Itemized", desc: "Line-by-line breakdown of charges per unit" },
  { icon: "⚠️", color: "rgba(255,91,91,0.1)", title: "Delinquency Report", desc: "30 / 60 / 90+ day aging and collection status" },
  { icon: "📄", color: "rgba(0,200,150,0.1)", title: "Income Statement", desc: "Revenue, expenses, and NOI by property and portfolio" },
  { icon: "💵", color: "rgba(245,197,24,0.1)", title: "Cash Flow Statement", desc: "Operating cash flow with prepaid rents, deposits & distributions removed" },
  { icon: "🏠", color: "rgba(139,92,246,0.1)", title: "Unit Vacancy Detail", desc: "Vacant units with days vacant, market rent, and vacancy loss" },
  { icon: "🔧", color: "rgba(245,197,24,0.1)", title: "Unit Turn Detail", desc: "Turn status, cost tracking, and make-ready timelines" },
];

const ReportsSection = () => (
  <section id="reports" className="py-24 md:py-28 px-5 md:px-12 bg-card text-foreground">
    <div className="max-w-[1100px] mx-auto">
      <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-primary mb-5">
        <span className="block w-[22px] h-0.5 bg-primary rounded" />
        Reports
      </div>
      <h2 className="text-[clamp(28px,3.8vw,50px)] font-extrabold leading-[1.08] tracking-[-0.028em] mb-4">
        Every report you need,<br />
        <em className="font-serif italic font-normal text-primary">automatically aggregated</em>
      </h2>
      <p className="text-[17px] text-fe-muted-dark max-w-[520px] leading-relaxed mb-14">
        FolioExcel surfaces the most critical reports asset managers rely on daily — available instantly on your dashboard.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {reports.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3.5 px-5 py-4 bg-foreground/[0.04] border border-border rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:bg-foreground/[0.07] hover:border-primary/20 hover:translate-x-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),4px_0_0_hsl(var(--fe-accent))] transition-all cursor-default"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
              style={{ background: r.color }}
            >
              {r.icon}
            </div>
            <div>
              <h4 className="text-[13.5px] font-bold text-foreground mb-0.5">{r.title}</h4>
              <p className="text-xs text-fe-muted-dark">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ReportsSection;
