import { motion } from "framer-motion";

const stats = [
  { num: "7+", label: "Report types auto-aggregated" },
  { num: "20x", label: "Faster than manual reporting" },
  { num: "0", label: "Manual downloads required" },
  { num: "∞", label: "Properties — no limit" },
];

const StatsBar = () => (
  <div className="px-5 md:px-12" style={{ background: "linear-gradient(180deg, hsl(var(--fe-dark2)) 0%, hsl(var(--fe-light)) 100%)" }}>
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-fe-light2 rounded-t-2xl border border-[hsl(var(--fe-border-light))] shadow-[0_-8px_40px_rgba(13,16,32,0.08)] overflow-hidden">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center py-10 px-6 border-b sm:border-b-0 sm:border-r border-[hsl(var(--fe-border-light))] last:border-r-0 relative group"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="font-machine text-[42px] font-extrabold leading-none text-fe-text-light">
            {s.num.includes("x") || s.num.includes("+") || s.num.includes("∞") ? (
              <>
                {s.num.replace(/[x+∞]/g, "")}
                <span className="text-primary">{s.num.match(/[x+∞]/)?.[0]}</span>
              </>
            ) : (
              s.num
            )}
          </div>
          <div className="text-[13px] text-fe-muted-light mt-2">{s.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default StatsBar;
