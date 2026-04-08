import { motion } from "framer-motion";

const VideoSection = () => (
  <section className="py-20 md:py-24 px-5 md:px-12 bg-background relative overflow-hidden">
    {/* Subtle background glow */}
    <div className="absolute w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle,hsl(162_100%_39%/0.07),transparent_65%)] top-0 left-1/2 -translate-x-1/2 blur-[80px] pointer-events-none" />

    <div className="max-w-[960px] mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-primary mb-5 justify-center">
          <span className="block w-[22px] h-0.5 bg-primary rounded" />
          See It In Action
          <span className="block w-[22px] h-0.5 bg-primary rounded" />
        </div>
        <h2 className="text-[clamp(26px,3.4vw,46px)] font-extrabold leading-[1.08] tracking-[-0.028em] text-foreground mb-4">
          See FolioExcel <em className="font-serif italic font-normal text-primary">in action</em>
        </h2>
        <p className="text-[16px] text-fe-muted-dark max-w-[520px] mx-auto leading-relaxed">
          Watch how asset managers get instant access to every KPI across their portfolio — no more logging in, clicking around, or building spreadsheets.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="rounded-2xl overflow-hidden border border-border shadow-[0_16px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]"
      >
        <video
          src="/FolioExcel-Pitch-v3.mp4"
          controls
          playsInline
          preload="metadata"
          className="w-full block bg-black"
          style={{ maxHeight: "560px", objectFit: "cover" }}
        >
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>
  </section>
);

export default VideoSection;
