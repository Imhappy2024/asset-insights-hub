import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Mini dashboard data
const phoneProperties = [
  { name: "Cedar View",     noi: "$125,153", occ: "95.35%" },
  { name: "Sunset Commons", noi: "$84,180",  occ: "92.59%" },
  { name: "913 Lake",       noi: "$54,045",  occ: "97.83%" },
  { name: "Cedar Lofts",    noi: "$48,954",  occ: "95.18%" },
  { name: "Valley Terrace", noi: "$47,918",  occ: "92.86%" },
  { name: "Grand Square",   noi: "$41,079",  occ: "95.83%" },
  { name: "Magnolia Res.",  noi: "$39,815",  occ: "94.20%" },
  { name: "Sunset Heights", noi: "$36,718",  occ: "94.74%" },
  { name: "642 Pine",       noi: "$24,361",  occ: "87.50%" },
  { name: "Park Place",     noi: "$16,755",  occ: "100.0%" },
  { name: "427 Cedar",      noi: "$6,570",   occ: "100.0%" },
  { name: "Elm Station",    noi: "$179,131", occ: "0.00%"  },
];

const cursorPath = [
  { x: 38, y: 30 },
  { x: 64, y: 30 },
  { x: 22, y: 54 },
  { x: 50, y: 54 },
  { x: 72, y: 76 },
  { x: 90, y: 76 },
  { x: 38, y: 30 },
];

const SparkLine = ({ color, negative }: { color: string; negative?: boolean }) => (
  <svg viewBox="0 0 80 22" className="w-full h-5" preserveAspectRatio="none">
    <defs>
      <linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.35" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    {negative ? (
      <>
        <path d="M0,4 C10,5 20,4 30,8 S50,16 60,14 S72,18 80,20" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M0,4 C10,5 20,4 30,8 S50,16 60,14 S72,18 80,20 L80,22 L0,22Z" fill={`url(#sg-${color.replace("#","")})`} />
      </>
    ) : (
      <>
        <path d="M0,18 C10,16 20,17 30,13 S50,9 60,7 S72,5 80,3" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M0,18 C10,16 20,17 30,13 S50,9 60,7 S72,5 80,3 L80,22 L0,22Z" fill={`url(#sg-${color.replace("#","")})`} />
      </>
    )}
  </svg>
);

const Gauge = ({ pct, color }: { pct: number; color: string }) => {
  const r = 17;
  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75;
  const dash = (pct / 100) * arc;
  return (
    <svg viewBox="0 0 44 44" className="w-11 h-11">
      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3.5"
        strokeDasharray={`${arc} ${circ - arc}`} strokeDashoffset={circ * 0.125} strokeLinecap="round" />
      <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="3.5"
        strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={circ * 0.125} strokeLinecap="round" />
      <text x="22" y="25" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="white">{pct}%</text>
    </svg>
  );
};

const LaptopDashboard = ({ hoveredCard }: { hoveredCard: number }) => (
  <div className="flex h-full text-white overflow-hidden" style={{ fontSize: "7px" }}>
    {/* Sidebar */}
    <div className="w-[85px] flex-shrink-0 bg-[#181926] border-r border-white/5 flex flex-col py-2 px-1.5 gap-0.5">
      <div className="font-extrabold text-[8px] text-primary px-1.5 mb-2">
        Folio<span className="text-white">Excel</span>
      </div>
      {["Dashboard", "Overview", "Neg. Cash Flow", "Prop. Groups"].map((item, i) => (
        <div key={item} className={`px-1.5 py-1 rounded text-[6px] ${i === 0 ? "bg-primary/15 text-primary font-bold" : "text-white/40"}`}>
          {item}
        </div>
      ))}
      <div className="mt-2 px-1.5 text-[5px] font-bold text-white/20 tracking-widest uppercase">Silverlake Cap…</div>
      {["Financials", "Properties", "Unit Tracker", "Unit Vacancy", "Accounts"].map(item => (
        <div key={item} className="px-1.5 py-1 text-[6px] text-white/35">{item}</div>
      ))}
    </div>

    {/* Main */}
    <div className="flex-1 bg-[#0d0f1e] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 flex-shrink-0">
        <div>
          <div className="font-extrabold text-[8px]">Financial Dashboard</div>
          <div className="text-white/35 text-[5px]">Overview for March 2026 · 23 properties · 1,129 units</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="px-2 py-0.5 rounded border border-white/10 text-[5px] text-white/50">March 2026</div>
          <div className="px-2 py-0.5 rounded border border-primary/30 text-[5px] text-primary font-bold">Filters</div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-2 flex flex-col gap-1.5">
        {/* Row 1: Gauges */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: "Weighted Physical Occ", pct: 97, color: "#00c896" },
            { label: "Physical Occ Distribution", pct: 91, color: "#00c896" },
            { label: "Weighted Economic Occ", pct: 98, color: "#00c896" },
            { label: "Economic Occ Distribution", pct: 87, color: "#00c896" },
          ].map((card, i) => (
            <div key={i} className={`bg-[#181926] rounded-lg p-1.5 border transition-all duration-500 ${hoveredCard === i ? "border-primary/50 shadow-[0_0_10px_hsl(162_100%_39%/0.3)]" : "border-white/5"}`}>
              <div className="text-[4.5px] text-white/35 mb-1 leading-tight">{card.label}</div>
              <div className="flex justify-center"><Gauge pct={card.pct} color={card.color} /></div>
            </div>
          ))}
        </div>

        {/* Row 2: Metrics */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: "Negative Eff Cash Flow", val: "10", sub: "43% of properties" },
            { label: "UI Ratio < 75%",          val: "9",  sub: "39% of properties" },
            { label: "Expense Ratio > 50%",     val: "0",  sub: "0% of properties"  },
            { label: "Negative NOI",            val: "2",  sub: "9% of properties"  },
          ].map((card, i) => (
            <div key={i} className={`bg-[#181926] rounded-lg p-1.5 border transition-all duration-500 ${hoveredCard === i + 4 ? "border-primary/50 shadow-[0_0_10px_hsl(162_100%_39%/0.3)]" : "border-white/5"}`}>
              <div className="text-[4.5px] text-white/35 mb-0.5">{card.label}</div>
              <div className="text-[13px] font-extrabold leading-none">{card.val}</div>
              <div className="text-[4.5px] text-white/35 mt-0.5">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Row 3: Sparklines */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: "Operating Income",    val: "$984,640",  color: "#3b82f6", neg: false },
            { label: "Operating Expense",   val: "$458,836",  color: "#3b82f6", neg: false },
            { label: "Net Operating Income",val: "$525,804",  color: "#00c896", neg: false },
            { label: "Effective Cash Flow", val: "-$85,033",  color: "#ef4444", neg: true  },
          ].map((card, i) => (
            <div key={i} className={`bg-[#181926] rounded-lg p-1.5 border transition-all duration-500 ${hoveredCard === i + 8 ? "border-primary/50 shadow-[0_0_10px_hsl(162_100%_39%/0.3)]" : "border-white/5"}`}>
              <div className="text-[4.5px] text-white/35 mb-0.5">{card.label}</div>
              <div className={`text-[8.5px] font-extrabold mb-1 ${card.neg ? "text-red-400" : i === 2 ? "text-primary" : "text-white"}`}>{card.val}</div>
              <SparkLine color={card.color} negative={card.neg} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MouseCursor = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    className="absolute pointer-events-none z-20"
    animate={{ left: `${x}%`, top: `${y}%` }}
    transition={{ duration: 1.3, ease: "easeInOut" }}
  >
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
      <path d="M0 0L0 13L3.5 9.5L6 16L8 15L5.5 8.5L10 8.5Z" fill="white" stroke="rgba(0,0,0,0.4)" strokeWidth="0.7" />
    </svg>
  </motion.div>
);

const HeroDashboardMockup = () => {
  const [cursorStep, setCursorStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(-1);
  const phoneListRef = useRef<HTMLDivElement>(null);
  const phoneWrapRef = useRef<HTMLDivElement>(null);

  // --- Mouse tilt for phone ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 120, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  // --- Cursor animation loop ---
  useEffect(() => {
    const id = setInterval(() => {
      setCursorStep(s => {
        const next = (s + 1) % (cursorPath.length - 1);
        const { y } = cursorPath[next];
        if (y < 40)      setHoveredCard(next);
        else if (y < 65) setHoveredCard(next + 4);
        else             setHoveredCard(next + 8);
        return next;
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  // --- Phone scroll loop ---
  useEffect(() => {
    const el = phoneListRef.current;
    if (!el) return;
    let pos = 0;
    const id = setInterval(() => {
      pos += 0.5;
      if (pos >= el.scrollHeight / 2) pos = 0;
      el.style.transform = `translateY(-${pos}px)`;
    }, 30);
    return () => clearInterval(id);
  }, []);

  const cursor = cursorPath[cursorStep];

  return (
    <div className="w-full flex items-end justify-center mt-16 mb-0 px-4 relative" style={{ minHeight: "520px" }}>

      {/* ── MacBook-style Laptop ── */}
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
        className="relative z-10 w-full"
        style={{ maxWidth: "900px" }}
      >
        {/* Lid: silver aluminum back + screen */}
        <div
          className="relative rounded-[14px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #e2e2e7 0%, #c8c8ce 100%)",
            padding: "10px 10px 14px 10px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.5) inset, 0 1px 0 rgba(255,255,255,0.8) inset",
          }}
        >
          {/* Camera dot */}
          <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#3a3a3a]/60" />

          {/* Screen */}
          <div
            className="rounded-[6px] overflow-hidden bg-[#0d0f1e]"
            style={{ aspectRatio: "16/10", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4)" }}
          >
            {/* Browser chrome bar */}
            <div className="flex items-center gap-1.5 px-2.5 py-[5px] bg-[#1c1d2e] border-b border-white/5">
              <div className="w-[7px] h-[7px] rounded-full bg-[#ff5f57]" />
              <div className="w-[7px] h-[7px] rounded-full bg-[#febc2e]" />
              <div className="w-[7px] h-[7px] rounded-full bg-[#28c840]" />
              <div className="flex-1 mx-3 bg-[#0d0f1e] rounded text-[5.5px] text-white/20 px-2 py-0.5 text-center">
                app.folioexcel.com/dashboard
              </div>
            </div>
            {/* Dashboard — scaled up to fill screen, clipped by overflow-hidden parent */}
            <div className="relative overflow-hidden" style={{ height: "calc(100% - 22px)" }}>
              <div style={{ transform: "scale(1.22)", transformOrigin: "top center", height: "100%", width: "100%" }}>
                <LaptopDashboard hoveredCard={hoveredCard} />
              </div>
              <MouseCursor x={cursor.x} y={cursor.y} />
            </div>
          </div>
        </div>

        {/* Hinge shadow */}
        <div className="h-[3px] mx-6 bg-gradient-to-r from-transparent via-black/30 to-transparent" />

        {/* Base / keyboard body */}
        <div
          className="rounded-b-[14px] mx-[-6px]"
          style={{
            height: "22px",
            background: "linear-gradient(180deg, #d0d0d6 0%, #b8b8be 100%)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.35) inset",
          }}
        />
        {/* Trackpad */}
        <div className="flex justify-center mt-[-1px]">
          <div
            className="w-[80px] h-[14px] rounded-[4px]"
            style={{
              background: "linear-gradient(180deg, #c8c8ce 0%, #b5b5bb 100%)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.25), 0 0 0 0.5px rgba(0,0,0,0.15)",
            }}
          />
        </div>

        {/* Glow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-[24px] bg-primary/10 blur-2xl rounded-full pointer-events-none" />
      </motion.div>

      {/* ── iPhone-style Phone ── */}
      <motion.div
        ref={phoneWrapRef}
        initial={{ opacity: 0, y: 90 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
        className="absolute bottom-4 right-[calc(50%-490px)] z-20 hidden lg:block"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 800,
        }}
      >
        {/* Phone outer frame */}
        <div
          style={{
            width: "175px",
            borderRadius: "36px",
            background: "linear-gradient(160deg, #e8e8ec 0%, #c8c8ce 50%, #d8d8de 100%)",
            padding: "10px 8px",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.6) inset, 2px 0 0 rgba(255,255,255,0.4) inset, -2px 0 0 rgba(0,0,0,0.1) inset",
          }}
        >
          {/* Side buttons (left - volume) */}
          <div className="absolute left-[-3px] top-[70px] w-[3px] h-[28px] rounded-l bg-[#b0b0b6]" />
          <div className="absolute left-[-3px] top-[106px] w-[3px] h-[28px] rounded-l bg-[#b0b0b6]" />
          {/* Side button (right - power) */}
          <div className="absolute right-[-3px] top-[90px] w-[3px] h-[36px] rounded-r bg-[#b0b0b6]" />

          {/* Screen */}
          <div
            style={{
              borderRadius: "26px",
              overflow: "hidden",
              background: "#0d0f1e",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.5)",
            }}
          >
            {/* Dynamic island */}
            <div className="flex justify-center pt-2 pb-1 bg-[#0d0f1e]">
              <div className="w-[44px] h-[12px] rounded-full bg-black" />
            </div>

            {/* Content */}
            <div style={{ height: "310px", overflow: "hidden" }}>
              {/* Header */}
              <div className="px-3 py-2 border-b border-white/5">
                <div className="text-[8px] font-extrabold text-white">Portfolio Overview</div>
                <div className="text-[5.5px] text-white/30">23 properties · March 2026</div>
              </div>
              {/* Column headers */}
              <div className="grid grid-cols-3 px-3 py-1.5 border-b border-white/5">
                {["Property", "NOI", "Occ%"].map(h => (
                  <div key={h} className="text-[5.5px] font-bold text-primary/80">{h}</div>
                ))}
              </div>
              {/* Scrolling list */}
              <div style={{ height: "260px", overflow: "hidden" }}>
                <div ref={phoneListRef} style={{ willChange: "transform" }}>
                  {[...phoneProperties, ...phoneProperties].map((p, i) => (
                    <div key={i} className="grid grid-cols-3 px-3 py-[5px] border-b border-white/[0.04]">
                      <div className="text-[6px] text-white/65 truncate pr-1">{p.name}</div>
                      <div className="text-[6px] text-primary font-semibold">{p.noi}</div>
                      <div className={`text-[6px] font-semibold ${parseFloat(p.occ) > 90 ? "text-primary" : "text-red-400"}`}>{p.occ}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="flex justify-center py-2 bg-[#0d0f1e]">
              <div className="w-[50px] h-[4px] rounded-full bg-white/25" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroDashboardMockup;
