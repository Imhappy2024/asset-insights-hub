import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Connect Your PM Software",
    desc: "Select your platform and authenticate. FolioExcel handles the connection — no API keys, no dev work. Works across multiple platforms simultaneously.",
  },
  {
    num: "02",
    title: "Your Data Flows Instantly",
    desc: "Within minutes, your full portfolio populates — income statements, rent rolls, occupancy, delinquency, cash flow, and unit-level data — all organized for asset managers.",
  },
  {
    num: "03",
    title: "Dashboards & Excel on Demand",
    desc: "View every KPI on screen, drill into any property or unit, and export any view to Excel whenever you need it. No formulas. No manual work.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 md:py-28 px-5 md:px-12 bg-fe-light text-fe-text-light">
    <div className="max-w-[1100px] mx-auto">
      <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-primary mb-5">
        <span className="block w-[22px] h-0.5 bg-primary rounded" />
        How it works
      </div>
      <h2 className="text-[clamp(28px,3.8vw,50px)] font-extrabold leading-[1.08] tracking-[-0.028em] text-fe-text-light mb-4">
        Up and running in<br />
        <em className="font-serif italic font-normal text-primary">under 10 minutes</em>
      </h2>
      <p className="text-[17px] text-fe-muted-light max-w-[520px] leading-relaxed mb-14">
        No complex onboarding. No IT team. Just connect and your data starts flowing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-[40px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 flex items-center justify-center text-xl font-extrabold text-primary mx-auto mb-5 shadow-[0_4px_20px_rgba(0,200,150,0.15)]">
              {s.num}
            </div>
            <h3 className="text-[17px] font-bold text-fe-text-light mb-3">{s.title}</h3>
            <p className="text-[14px] text-fe-muted-light leading-relaxed max-w-[320px] mx-auto">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
