import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, animate } from "framer-motion";

// Mini dashboard data
const phoneProperties = [
  { name: "Cedar View",    noi: "$125,153", occ: "95.35%", cf: "$102,787", pos: true },
  { name: "Sunset Commons",noi: "$84,180",  occ: "92.59%", cf: "$106,844", pos: true },
  { name: "913 Lake",      noi: "$54,045",  occ: "97.83%", cf: "$52,012",  pos: true },
  { name: "Cedar Lofts",   noi: "$48,954",  occ: "95.18%", cf: "$39,987",  pos: true },
  { name: "Valley Terrace",noi: "$47,918",  occ: "92.86%", cf: "$8,743",   pos: true },
  { name: "Grand Square",  noi: "$41,079",  occ: "95.83%", cf: "$32,564",  pos: true },
  { name: "Magnolia Res.", noi: "$39,815",  occ: "94.20%", cf: "$39,815",  pos: true },
  { name: "Sunset Heights",noi: "$36,718",  occ: "94.74%", cf: "$11,503",  pos: true },
  { name: "642 Pine",      noi: "$24,361",  occ: "87.50%", cf: "$13,060",  pos: true },
  { name: "Park Place",    noi: "$16,755",  occ: "100.0%", cf: "$16,755",  pos: true },
  { name: "427 Cedar",     noi: "$6,570",   occ: "100.0%", cf: "$6,570",   pos: true },
  { name: "Elm Station",   noi: "$179,131", occ: "0.00%",  cf: "-$1,725",  pos: false },
];

// Cursor path: sequence of [x%, y%] positions within the laptop screen
const cursorPath = [
  { x: 38, y: 32 },  // hover Weighted Physical Occ card
  { x: 62, y: 32 },  // hover Weighted Economic Occ card
  { x: 22, y: 55 },  // hover Negative ECF metric
  { x: 48, y: 55 },  // hover Expense Ratio metric
  { x: 70, y: 75 },  // hover NOI sparkline card
  { x: 88, y: 75 },  // hover Eff Cash Flow card
  { x: 38, y: 32 },  // loop back
];

// Sparkline path (simplified SVG)
const SparkLine = ({ color, negative }: { color: string; negative?: boolean }) => (
  <svg viewBox="0 0 80 24" className="w-full h-6" preserveAspectRatio="none">
    <defs>
      <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    {negative ? (
      <>
        <path d="M0,4 L10,6 L20,5 L30,8 L40,12 L50,16 L60,14 L70,18 L80,20" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M0,4 L10,6 L20,5 L30,8 L40,12 L50,16 L60,14 L70,18 L80,20 L80,24 L0,24 Z" fill={`url(#sg-${color})`} />
      </>
    ) : (
      <>
        <path d="M0,18 L10,16 L20,17 L30,14 L40,12 L50,10 L60,8 L70,6 L80,4" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M0,18 L10,16 L20,17 L30,14 L40,12 L50,10 L60,8 L70,6 L80,4 L80,24 L0,24 Z" fill={`url(#sg-${color})`} />
      </>
    )}
  </svg>
);

// Simple donut gauge
const Gauge = ({ pct, color }: { pct: number; color: string }) => {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ * 0.75; // 75% arc
  const gap = circ - dash;
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12">
      <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4"
        strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
        strokeDashoffset={circ * 0.125}
        strokeLinecap="round" />
      <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={`${dash} ${gap + circ * 0.25}`}
        strokeDashoffset={circ * 0.125}
        strokeLinecap="round" />
      <text x="24" y="27" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">{pct}%</text>
    </svg>
  );
};

const LaptopDashboard = ({ hoveredCard }: { hoveredCard: number }) => (
  <div className="flex h-full text-white overflow-hidden" style={{ fontSize: "7px" }}>
    {/* Sidebar */}
    <div className="w-[90px] flex-shrink-0 bg-[#181926] border-r border-white/5 flex flex-col py-2 px-1.5 gap-0.5">
      <div className="font-extrabold text-[8px] text-primary px-1.5 mb-2">Folio<span className="text-white">Excel</span></div>
      {["Dashboard", "Overview", "Neg. Cash Flow", "Prop. Groups"].map((item, i) => (
        <div key={item} className={`px-1.5 py-1 rounded text-[6.5px] ${i === 0 ? "bg-primary/15 text-primary font-bold" : "text-white/40 hover:text-white/70"}`}>
          {item}
        </div>
      ))}
      <div className="mt-2 px-1.5 text-[5.5px] font-bold text-white/20 tracking-widest uppercase">Silverlake Cap…</div>
      {["Financials", "Properties", "Unit Tracker", "Unit Vacancy", "Accounts"].map((item) => (
        <div key={item} className="px-1.5 py-1 rounded text-[6.5px] text-white/40">{item}</div>
      ))}
    </div>

    {/* Main */}
    <div className="flex-1 bg-[#0f1020] overflow-hidden flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 flex-shrink-0">
        <div>
          <div className="font-extrabold text-[8px]">Financial Dashboard</div>
          <div className="text-white/40 text-[5.5px]">Overview for March 2026 · 23 properties · 1,129 units</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="px-2 py-0.5 rounded border border-white/10 text-[5.5px] text-white/60">March 2026</div>
          <div className="px-2 py-0.5 rounded border border-primary/30 text-[5.5px] text-primary font-bold">Filters</div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-2 flex flex-col gap-2">
        {/* Row 1: Occupancy gauges */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: "Weighted Physical Occ", pct: 97, color: "#00c896" },
            { label: "Physical Occ Distribution", pct: 91, color: "#00c896", donut: true },
            { label: "Weighted Economic Occ", pct: 98, color: "#00c896" },
            { label: "Economic Occ Distribution", pct: 87, color: "#00c896", donut: true },
          ].map((card, i) => (
            <div key={i} className={`bg-[#181926] rounded-lg p-1.5 border transition-all duration-300 ${hoveredCard === i ? "border-primary/40 shadow-[0_0_8px_hsl(162_100%_39%/0.25)]" : "border-white/5"}`}>
              <div className="text-[5px] text-white/40 mb-1 leading-tight">{card.label}</div>
              <div className="flex items-center justify-center">
                <Gauge pct={card.pct} color={card.color} />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Property Metrics */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: "Negative Eff Cash Flow", val: "10", sub: "43% of properties", red: true },
            { label: "UI Ratio < 75%", val: "9", sub: "39% of properties", red: true },
            { label: "Expense Ratio > 50%", val: "0", sub: "0% of properties", green: true },
            { label: "Negative NOI", val: "2", sub: "9% of properties" },
          ].map((card, i) => (
            <div key={i} className={`bg-[#181926] rounded-lg p-1.5 border transition-all duration-300 ${hoveredCard === i + 4 ? "border-primary/40 shadow-[0_0_8px_hsl(162_100%_39%/0.25)]" : "border-white/5"}`}>
              <div className="text-[5px] text-white/40 mb-1">{card.label}</div>
              <div className={`text-[14px] font-extrabold leading-none ${card.red ? "text-white" : card.green ? "text-white" : "text-white"}`}>{card.val}</div>
              <div className={`text-[5px] mt-0.5 ${card.red ? "text-white/40" : "text-white/40"}`}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Row 3: Financial Performance sparklines */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: "Operating Income", val: "$984,640", color: "#3b82f6", neg: false },
            { label: "Operating Expense", val: "$458,836", color: "#3b82f6", neg: false },
            { label: "Net Operating Income", val: "$525,804", color: "#00c896", neg: false },
            { label: "Effective Cash Flow", val: "-$85,033", color: "#ef4444", neg: true },
          ].map((card, i) => (
            <div key={i} className={`bg-[#181926] rounded-lg p-1.5 border transition-all duration-300 ${hoveredCard === i + 8 ? "border-primary/40 shadow-[0_0_8px_hsl(162_100%_39%/0.25)]" : "border-white/5"}`}>
              <div className="text-[5px] text-white/40 mb-1">{card.label}</div>
              <div className={`text-[9px] font-extrabold mb-1 ${card.neg ? "text-red-400" : i === 2 ? "text-primary" : "text-white"}`}>{card.val}</div>
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
    transition={{ duration: 1.2, ease: "easeInOut" }}
    style={{ transform: "translate(-4px, -4px)" }}
  >
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <path d="M0 0L0 15L4 11L7 18L9 17L6 10L11 10Z" fill="white" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
    </svg>
  </motion.div>
);

const HeroDashboardMockup = () => {
  const [cursorStep, setCursorStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cursor animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorStep((s) => {
        const next = (s + 1) % (cursorPath.length - 1);
        // Map cursor position to card index
        const pos = cursorPath[next];
        if (pos.y < 40) setHoveredCard(next < 4 ? next : -1);
        else if (pos.y < 65) setHoveredCard(next + 4 > 7 ? -1 : next + 4);
        else setHoveredCard(next + 8 > 11 ? -1 : next + 8);
        return next;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  // Phone scroll animation
  const phoneListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!phoneListRef.current) return;
    const el = phoneListRef.current;
    let pos = 0;
    const step = () => {
      pos += 0.4;
      if (pos >= el.scrollHeight / 2) pos = 0;
      el.style.transform = `translateY(-${pos}px)`;
    };
    const id = setInterval(step, 30);
    return () => clearInterval(id);
  }, []);

  const cursor = cursorPath[cursorStep];

  return (
    <div className="w-full flex items-end justify-center gap-[-20px] md:gap-0 mt-14 mb-0 px-4 relative">
      {/* Laptop */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[680px] mx-auto md:mx-0 md:flex-1"
      >
        {/* Screen bezel */}
        <div className="rounded-xl border-[7px] border-[#252638] bg-[#0f1020] shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]"
          style={{ aspectRatio: "16/10" }}>
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-white/5 bg-[#1a1b2e]">
            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
            <div className="flex-1 mx-2 bg-[#0f1020] rounded text-[6px] text-white/20 px-2 py-0.5 text-center">app.folioexcel.com/dashboard</div>
          </div>

          {/* Dashboard content */}
          <div className="relative h-[calc(100%-28px)] overflow-hidden">
            <LaptopDashboard hoveredCard={hoveredCard} />
            <MouseCursor x={cursor.x} y={cursor.y} />
          </div>
        </div>

        {/* Laptop base */}
        <div className="h-[10px] bg-gradient-to-b from-[#252638] to-[#1a1b2e] rounded-b-lg mx-8 shadow-lg" />
        <div className="h-[4px] bg-[#141525] rounded-b-xl mx-2 shadow-[0_8px_30px_rgba(0,0,0,0.6)]" />

        {/* Glow under laptop */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-primary/10 blur-2xl rounded-full" />
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.8, ease: "easeOut" }}
        className="absolute right-4 md:right-8 lg:right-[calc(50%-380px)] bottom-0 z-20 hidden md:block"
        style={{ animation: "phoneFloat 3s ease-in-out infinite" }}
      >
        {/* Phone frame */}
        <div className="w-[130px] rounded-[20px] border-[5px] border-[#252638] bg-[#0f1020] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden">
          {/* Status bar */}
          <div className="bg-[#1a1b2e] px-3 py-1 flex items-center justify-between">
            <div className="w-10 h-2.5 bg-[#252638] rounded-full mx-auto" />
          </div>

          {/* Screen content */}
          <div className="bg-[#0f1020] overflow-hidden" style={{ height: "260px" }}>
            {/* Header */}
            <div className="px-2 py-1.5 border-b border-white/5">
              <div className="text-[7px] font-extrabold text-white">Portfolio Overview</div>
              <div className="text-[5px] text-white/30">23 properties</div>
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-3 px-2 py-1 border-b border-white/5">
              {["Property", "NOI", "Occ%"].map((h) => (
                <div key={h} className="text-[5px] font-bold text-primary/80">{h}</div>
              ))}
            </div>

            {/* Scrolling rows */}
            <div className="overflow-hidden" style={{ height: "220px" }}>
              <div ref={phoneListRef} style={{ willChange: "transform" }}>
                {/* Duplicate for seamless loop */}
                {[...phoneProperties, ...phoneProperties].map((p, i) => (
                  <div key={i} className="grid grid-cols-3 px-2 py-1 border-b border-white/[0.04]">
                    <div className="text-[5.5px] text-white/70 truncate pr-1">{p.name}</div>
                    <div className="text-[5.5px] text-primary font-semibold">{p.noi}</div>
                    <div className={`text-[5.5px] font-semibold ${parseFloat(p.occ) > 90 ? "text-primary" : "text-red-400"}`}>{p.occ}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Home indicator */}
          <div className="bg-[#1a1b2e] py-1.5 flex justify-center">
            <div className="w-8 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default HeroDashboardMockup;
