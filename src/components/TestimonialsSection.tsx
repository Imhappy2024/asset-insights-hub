import { motion } from "framer-motion";

const testimonials = [
  {
    text: "We used to spend two full days every month pulling from AppFolio and building spreadsheets manually. FolioExcel gives us everything instantly. Our investors get better data and we get our time back.",
    name: "Marcus Reid",
    role: "Principal, Ridgeline Capital",
    gradient: "from-primary to-accent",
    initials: "MR",
  },
  {
    text: "The Negative Cash Flow dashboard alone is worth it. We finally see how each property is actually cash flowing without all the noise from prepaid rents and security deposits.",
    name: "Sarah Kim",
    role: "Asset Manager, Keystone Multifamily",
    gradient: "from-fe-gold to-[#ff8c42]",
    initials: "SK",
  },
  {
    text: "We manage properties across Yardi and Buildium. FolioExcel pulls from both and consolidates everything into one view. I don't know how we managed 900 units before this.",
    name: "Derek Holloway",
    role: "Managing Director, Harbor Peak Equity",
    gradient: "from-[#8B5CF6] to-accent",
    initials: "DH",
  },
];

const TestimonialsSection = () => (
  <section className="py-24 md:py-28 px-5 md:px-12 bg-fe-light text-fe-text-light">
    <div className="max-w-[1100px] mx-auto">
      <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-primary mb-5">
        <span className="block w-[22px] h-0.5 bg-primary rounded" />
        Customer Stories
      </div>
      <h2 className="text-[clamp(28px,3.8vw,50px)] font-extrabold leading-[1.08] tracking-[-0.028em] text-fe-text-light mb-14">
        Trusted by asset managers<br />
        <em className="font-serif italic font-normal text-primary">who move fast</em>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-fe-card-light border border-[hsl(var(--fe-border-light))] rounded-2xl p-7 shadow-[0_4px_20px_rgba(13,16,32,0.08)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(13,16,32,0.12)] transition-all cursor-default"
          >
            <div className="text-fe-gold text-[13px] mb-3.5 tracking-[2px]">★★★★★</div>
            <p className="text-sm text-[#4a5070] leading-relaxed mb-5 italic">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className={`w-[38px] h-[38px] rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-[13px] font-extrabold text-primary-foreground shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)]`}>
                {t.initials}
              </div>
              <div>
                <div className="text-[13px] font-bold text-fe-text-light">{t.name}</div>
                <div className="text-[11.5px] text-fe-muted-light">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
