import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-12 pt-[130px] pb-20 relative overflow-hidden text-center bg-background">
      {/* Orbs */}
      <div className="absolute w-[750px] h-[750px] rounded-full blur-[130px] pointer-events-none -top-[20%] -left-[12%] bg-[radial-gradient(circle,hsl(162_100%_39%/0.16),transparent_65%)]" style={{ animation: "orbDrift 18s ease-in-out infinite" }} />
      <div className="absolute w-[650px] h-[650px] rounded-full blur-[130px] pointer-events-none top-[5%] -right-[10%] bg-[radial-gradient(circle,hsl(213_100%_52%/0.13),transparent_65%)]" style={{ animation: "orbDrift 18s ease-in-out infinite", animationDelay: "-7s" }} />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        maskImage: "radial-gradient(ellipse 80% 75% at 50% 40%, black 10%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 50% 40%, black 10%, transparent 100%)"
      }} />

      <div className="relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/30 rounded-full text-[11.5px] font-bold text-primary bg-primary/[0.07] mb-8 tracking-widest uppercase backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: "pulse-dot 2s infinite" }} />
          <span className="bg-primary text-primary-foreground text-[9px] font-extrabold px-2 py-0.5 rounded-full tracking-wider">BETA</span>
          Now Onboarding
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[clamp(40px,5.6vw,74px)] font-extrabold leading-[1.06] tracking-[-0.032em] text-foreground mb-2"
        >
          One Log In.<br />
          Every <em className="font-serif italic font-normal bg-gradient-to-r from-primary to-[#0ACDFF] bg-clip-text text-transparent">KPI.</em><br />
          One App.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-[clamp(15px,1.55vw,18px)] text-fe-muted-dark max-w-[540px] leading-relaxed mx-auto mb-3"
        >
          FolioExcel connects to your PM software and instantly surfaces every KPI an asset manager needs — NOI, occupancy, delinquency, cash flow, and more — all in one dashboard.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-[15px] font-bold text-foreground/65 mb-11"
        >
          No more logging in, clicking around, and building reports.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3.5 justify-center flex-wrap"
        >
          <a
            href="#capture"
            className="px-8 py-3.5 bg-primary text-primary-foreground rounded-[10px] font-bold text-[15px] shadow-[0_6px_28px_hsl(162_100%_39%/0.38)] hover:bg-[#00e0aa] hover:-translate-y-0.5 hover:shadow-[0_14px_44px_hsl(162_100%_39%/0.45)] transition-all inline-flex items-center gap-2"
          >
            Get Early Access →
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 bg-foreground/5 text-foreground border border-foreground/10 rounded-[10px] font-semibold text-[15px] hover:bg-foreground/[0.09] hover:border-foreground/20 transition-all inline-flex items-center gap-2"
          >
            See How It Works
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
