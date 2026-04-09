import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────
   LAPTOP DASHBOARD
───────────────────────────────────────────── */
const LaptopDashboard = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dbRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lastHighlightRef = useRef<string | null>(null);

  // Count-up for metric cards
  const [counts, setCounts] = useState({ c5: 0, c6: 0, c7: 0, c8: 0 });

  useEffect(() => {
    const targets = { c5: 10, c6: 9, c7: 0, c8: 2 };
    const duration = 700;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounts({
        c5: Math.round(ease * targets.c5),
        c6: Math.round(ease * targets.c6),
        c7: Math.round(ease * targets.c7),
        c8: Math.round(ease * targets.c8),
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    const timeout = setTimeout(() => requestAnimationFrame(tick), 600);
    return () => clearTimeout(timeout);
  }, []);

  // Cursor animation
  useEffect(() => {
    const ids = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"];
    let idx = 0;

    const moveCursor = () => {
      const id = ids[idx];
      const card = cardRefs.current[id];
      const db = dbRef.current;
      const cur = cursorRef.current;
      if (!card || !db || !cur) { idx = (idx + 1) % ids.length; setTimeout(moveCursor, 50); return; }

      const dr = db.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      cur.style.left = (cr.left - dr.left + cr.width * 0.3 + Math.random() * cr.width * 0.4) + "px";
      cur.style.top = (cr.top - dr.top + cr.height * 0.25 + Math.random() * cr.height * 0.35) + "px";

      if (lastHighlightRef.current) {
        cardRefs.current[lastHighlightRef.current]?.classList.remove("db-hv");
      }
      setTimeout(() => {
        card.classList.add("db-hv");
        lastHighlightRef.current = id;
        idx = (idx + 1) % ids.length;
        setTimeout(moveCursor, 1400 + Math.random() * 400);
      }, 550);
    };

    const t = setTimeout(moveCursor, 900);
    return () => clearTimeout(t);
  }, []);

  const cardStyle: React.CSSProperties = {
    background: "#414143",
    borderRadius: "8px",
    padding: "8px 10px",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.22s cubic-bezier(0.4,0,0.2,1), box-shadow 0.22s",
  };
  const labelStyle: React.CSSProperties = { fontSize: "9px", color: "#565869", marginBottom: "4px", lineHeight: "1.4", fontWeight: 400 };
  const sectionHdrStyle: React.CSSProperties = { fontSize: "10px", fontWeight: 600, color: "#c5c8d8", marginTop: "2px", marginBottom: "-1px", letterSpacing: "-0.01em" };
  const svalStyle = (color?: string): React.CSSProperties => ({ fontSize: "15px", fontWeight: 700, color: color || "#e8eaee", lineHeight: 1.2, letterSpacing: "-0.02em" });
  const bigValStyle: React.CSSProperties = { fontSize: "22px", fontWeight: 700, color: "#e8eaee", lineHeight: 1, letterSpacing: "-0.03em", display: "inline-block" };
  const subStyle: React.CSSProperties = { fontSize: "8px", color: "#3e4155", marginLeft: "5px", letterSpacing: "0.01em", verticalAlign: "middle" };

  return (
    <div
      ref={dbRef}
      style={{
        width: "100%", height: "100%",
        background: "#252629",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
        display: "flex", overflow: "hidden", position: "relative",
      }}
    >
      {/* ── Sidebar ── */}
      <div style={{
        width: "124px", background: "#1c1d22", flexShrink: 0,
        display: "flex", flexDirection: "column", borderRight: "1px solid #2c2d35",
      }}>
        <div style={{ padding: "14px 9px 8px", borderBottom: "1px solid #2c2d35" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "8px", color: "#393b4a", cursor: "pointer" }}>
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M3.5 1L1 3.5L3.5 6L6 3.5Z" stroke="#393b4a" strokeWidth="1.1" /></svg>
            Previous
          </div>
        </div>
        <div style={{ padding: "6px 5px 4px", display: "flex", flexDirection: "column" }}>
          {/* Dashboard (active) */}
          <div style={{
            display: "flex", alignItems: "center", gap: "5px",
            padding: "4px 7px", fontSize: "10px", color: "#93b4fd", cursor: "pointer",
            borderRadius: "5px", margin: "1px 2px",
            background: "rgba(37,99,235,0.18)", fontWeight: 500, letterSpacing: "0.01em",
          }}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor" style={{ flexShrink: 0 }}>
              <rect x="1" y="1" width="3.2" height="3.2" rx=".5" /><rect x="4.8" y="1" width="3.2" height="3.2" rx=".5" />
              <rect x="1" y="4.8" width="3.2" height="3.2" rx=".5" /><rect x="4.8" y="4.8" width="3.2" height="3.2" rx=".5" />
            </svg>
            Dashboard
          </div>

          {/* Reports section */}
          <div style={{ fontSize: "7.5px", color: "#2e3047", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.08em", padding: "7px 9px 2px", marginTop: "40px" }}>Reports</div>
          {[
            { label: "Overview", icon: <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"><rect x="1" y="1" width="7" height="7" rx=".8"/><line x1="1" y1="3.5" x2="8" y2="3.5"/><line x1="1" y1="5.8" x2="8" y2="5.8"/><line x1="3.5" y1="1" x2="3.5" y2="8"/></svg> },
            { label: "Negative Cash Flow", icon: <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"><path d="M1 7.5L3 4.5L5 6L7 3L8.5 7.5"/><line x1="1" y1="7.5" x2="8.5" y2="7.5"/></svg> },
            { label: "Property Groups", icon: <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.1"><circle cx="4.5" cy="4.5" r="3.5"/><circle cx="4.5" cy="4.5" r="1.5"/></svg> },
          ].map(({ label, icon }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "4px 7px", fontSize: "10px", color: "#6b6e82", cursor: "pointer",
              borderRadius: "5px", margin: "1px 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              letterSpacing: "0.01em",
            }}>
              <span style={{ flexShrink: 0, opacity: 0.6 }}>{icon}</span>
              {label}
            </div>
          ))}

          {/* Silverlake dropdown */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "4px 7px", fontSize: "10px", color: "#5e6175", cursor: "pointer",
            margin: "1px 2px", borderRadius: "5px", marginTop: "40px",
          }}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>Silverlake Capital R...</span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 3l2 2 2-2" stroke="#5e6175" strokeWidth="1.1" strokeLinecap="round" /></svg>
          </div>

          {[
            { label: "Financials", icon: <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"><circle cx="4.5" cy="4.5" r="3.5"/></svg> },
            { label: "Properties", icon: <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor"><rect x="1" y="4" width="2.2" height="4.5" rx=".3"/><rect x="3.9" y="2" width="2.2" height="6.5" rx=".3"/><rect x="6.8" y="5.5" width="1.2" height="3" rx=".3"/></svg> },
            { label: "Unit Tracker", icon: <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"><path d="M4.5 1L8 3V7L4.5 9L1 7V3Z"/><circle cx="4.5" cy="5" r="1.2"/></svg> },
            { label: "Unit Vacancy", icon: <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"><rect x="1" y="1" width="7" height="7" rx=".8"/><line x1="4.5" y1="3" x2="4.5" y2="6"/><line x1="3" y1="4.5" x2="6" y2="4.5"/></svg> },
            { label: "Accounts", icon: <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"><line x1="1" y1="2.5" x2="8" y2="2.5"/><line x1="1" y1="4.5" x2="8" y2="4.5"/><line x1="1" y1="6.5" x2="8" y2="6.5"/></svg> },
          ].map(({ label, icon }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "4px 7px", fontSize: "10px", color: "#6b6e82", cursor: "pointer",
              borderRadius: "5px", margin: "1px 2px", letterSpacing: "0.01em",
            }}>
              <span style={{ flexShrink: 0, opacity: 0.6 }}>{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Header */}
        <div style={{
          padding: "14px 16px 12px", borderBottom: "1px solid #2c2d35",
          flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#e8eaee", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Financial Dashboard
            </div>
            <div style={{ fontSize: "8.5px", color: "#585b70", marginTop: "2px", letterSpacing: "0.01em" }}>
              Overview for March 2026 &nbsp;•&nbsp; 23 properties
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{
              background: "#272729", border: "1px solid #30323e", borderRadius: "6px",
              padding: "3.5px 8px", fontSize: "9px", color: "#8a8ea8",
              display: "flex", alignItems: "center", gap: "4px", cursor: "pointer",
            }}>
              March 2026
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 3L4 5.5L6.5 3" stroke="#8a8ea8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{
              background: "#2563eb", borderRadius: "6px", padding: "3.5px 9px",
              fontSize: "9px", color: "#fff", display: "flex", alignItems: "center",
              gap: "4px", fontWeight: 600, cursor: "pointer", letterSpacing: "0.01em",
            }}>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 2.5h7M2.5 4.5h4M4 6.5h1" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" /></svg>
              Filters
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: "7px 9px 5px", overflow: "hidden", display: "flex", flexDirection: "column", gap: "5px" }}>

          {/* Row 1: Donut gauges */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "5px" }}>
            {[
              { id: "c1", label: "Weighted Physical Occupancy", pct: "97.5%", dashArc: "156.9", fill: "#22c55e", hasTick: true, tickDeg: "350.1" },
              { id: "c2", label: "Physical Occupancy Distribution", pct: "91.3%", dashArc: "149.4", fill: "#22c55e", hasTick: false, red: "9.96", redOffset: "-149.4", amber: "4.25", amberOffset: "-159.3" },
              { id: "c3", label: "Weighted Economic Occupancy", pct: "98.5%", dashArc: "159.3", fill: "#22c55e", hasTick: true, tickDeg: "352.8" },
              { id: "c4", label: "Economic Occupancy Distribution", pct: "87.0%", dashArc: "142.2", fill: "#22c55e", hasTick: false, red: "14.3", redOffset: "-142.2", amber: "7.06", amberOffset: "-156.5" },
            ].map(({ id, label, pct, dashArc, fill, hasTick, tickDeg, red, redOffset, amber, amberOffset }) => (
              <div
                key={id}
                id={id}
                ref={el => { cardRefs.current[id] = el; }}
                style={{ ...cardStyle, display: "flex", flexDirection: "column", alignItems: "center", height: "102px", padding: "8px 8px 5px", justifyContent: "flex-start" }}
              >
                <div style={{ ...labelStyle, alignSelf: "flex-start", marginBottom: "5px" }}>{label}</div>
                <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="70" height="70" viewBox="0 0 70 70">
                    <circle cx="35" cy="35" r="26" fill="none" stroke="#2a2c38" strokeWidth="8" />
                    <circle cx="35" cy="35" r="26" fill="none" stroke={fill} strokeWidth="8"
                      strokeDasharray={`${dashArc} 163.4`} strokeLinecap="butt" transform="rotate(-90 35 35)"
                    />
                    {red && <circle cx="35" cy="35" r="26" fill="none" stroke="#ef4444" strokeWidth="8"
                      strokeDasharray={`${red} 163.4`} strokeDashoffset={redOffset} strokeLinecap="butt" transform="rotate(-90 35 35)" />}
                    {amber && <circle cx="35" cy="35" r="26" fill="none" stroke="#f59e0b" strokeWidth="8"
                      strokeDasharray={`${amber} 163.4`} strokeDashoffset={amberOffset} strokeLinecap="butt" transform="rotate(-90 35 35)" />}
                    {hasTick && (
                      <>
                        <rect x="32" y="10" width="6" height="4" rx="1.1" fill="#b8bac8" transform={`rotate(${tickDeg} 35 35)`} />
                        <text x="35" y="39" textAnchor="middle" fill="#e8eaee" fontSize="11.5" fontWeight="700"
                          fontFamily="-apple-system,sans-serif" letterSpacing="-0.5">{pct}</text>
                      </>
                    )}
                    {!hasTick && (
                      <text x="35" y="51" textAnchor="middle" fill="#e8eaee" fontSize="7.5" fontWeight="700"
                        fontFamily="-apple-system,sans-serif">{pct}</text>
                    )}
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Section: Property Metrics */}
          <div style={sectionHdrStyle}>Property Metrics</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "5px" }}>
            {[
              { id: "c5", label: "Negative Effective Cash Flow", val: counts.c5, sub: "43%" },
              { id: "c6", label: "Utility Income Ratio < 75%", val: counts.c6, sub: "39%" },
              { id: "c7", label: "Expense Ratio > 50%", val: counts.c7, sub: "0%" },
              { id: "c8", label: "Negative NOI", val: counts.c8, sub: "9%" },
            ].map(({ id, label, val, sub }) => (
              <div key={id} id={id} ref={el => { cardRefs.current[id] = el; }} style={cardStyle}>
                <div style={labelStyle}>{label}</div>
                <span style={bigValStyle}>{val}</span>
                <span style={subStyle}>{sub}</span>
              </div>
            ))}
          </div>

          {/* Section: Financial Performance */}
          <div style={sectionHdrStyle}>Financial Performance</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "5px" }}>
            {[
              { label: "Operating Income", val: "$984,640", valColor: "#e8eaee", pts: "0,17 20,15 40,16 58,12 78,14 98,11 118,12 140,9", strokeColor: "#0ea5e9", gradId: "cg1" },
              { label: "Operating Expense", val: "$458,836", valColor: "#e8eaee", pts: "0,13 25,12 50,16 70,10 95,13 115,10 140,8", strokeColor: "#0ea5e9", gradId: "cg2" },
              { label: "Net Operating Income", val: "$525,804", valColor: "#22c55e", pts: "0,18 22,15 48,16 72,11 95,13 115,9 140,7", strokeColor: "#22c55e", gradId: "cg3" },
              { label: "Effective Cash Flow", val: "-$85,033", valColor: "#ef4444", pts: "0,8 18,13 38,7 56,19 74,10 90,17 108,8 128,20 140,14", strokeColor: "#ef4444", gradId: "cg4" },
            ].map(({ label, val, valColor, pts, strokeColor, gradId }) => (
              <div key={label} style={{ ...cardStyle, height: "80px", padding: "9px 9px 0", display: "flex", flexDirection: "column" }}>
                <div style={labelStyle}>{label}</div>
                <div style={svalStyle(valColor)}>{val}</div>
                <svg width="100%" height="28" viewBox="0 0 140 28" preserveAspectRatio="none" style={{ display: "block", marginTop: "auto" }}>
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={strokeColor} stopOpacity="0.55" />
                      <stop offset="100%" stopColor={strokeColor} stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <polygon points={`${pts} 140,28 0,28`} fill={`url(#${gradId})`} />
                  <polyline points={pts} fill="none" stroke={strokeColor} strokeWidth="1.6" />
                </svg>
              </div>
            ))}
          </div>

          {/* Trend charts row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
            {[
              {
                label: "Income vs Expense Trends",
                lines: [
                  { pts: "30,8 65,9 100,7 135,10 170,8 205,9 240,7 280,8", color: "#22c55e" },
                  { pts: "30,26 65,28 100,24 135,30 170,25 205,27 240,23 280,26", color: "#0ea5e9" },
                ],
              },
              {
                label: "NOI vs Effective Cash Flow",
                lines: [
                  { pts: "30,12 65,9 100,15 135,7 170,17 205,10 240,6 280,13", color: "#22c55e" },
                  { pts: "30,28 65,22 100,35 135,25 170,37 205,27 240,18 280,33", color: "#ef4444" },
                ],
              },
            ].map(({ label, lines }) => (
              <div key={label} style={{ ...cardStyle, height: "80px", padding: "9px 9px 5px" }}>
                <div style={labelStyle}>{label}</div>
                <svg width="100%" height="46" viewBox="0 0 290 46" preserveAspectRatio="none" style={{ display: "block" }}>
                  {lines.map(({ pts, color }, i) => (
                    <polyline key={i} points={pts} fill="none" stroke={color} strokeWidth="1.5" />
                  ))}
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "absolute", pointerEvents: "none", zIndex: 100,
          transition: "left 0.65s cubic-bezier(0.25,0.1,0.25,1), top 0.65s cubic-bezier(0.25,0.1,0.25,1)",
          left: "300px", top: "220px",
          filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6))",
        }}
      >
        <svg width="14" height="18" viewBox="0 0 14 18">
          <path d="M1.5 1.5L1.5 16L4.8 12.5L7.5 19L9.5 18L6.8 11.8L12.5 11.8Z" fill="#fff" stroke="#1a1b1f" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </div>

      {/* css for hover highlight */}
      <style>{`
        .db-hv { background: #505052 !important; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,.35) !important; }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────────────
   IPHONE SCREEN CONTENT — scroll → menu → loop
───────────────────────────────────────────── */
const PhoneScreen = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [tapVisible, setTapVisible] = useState(false);

  useEffect(() => {
    let rafId: number;
    let phaseTimer: ReturnType<typeof setTimeout>;
    let scrollStart = 0;
    const SCROLL_DURATION = 9000;  // ms to scroll through content
    const MAX_SCROLL = 280;        // px to scroll down
    let running = true;

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const doScroll = (ts: number) => {
      if (!running) return;
      if (!scrollStart) scrollStart = ts;
      const elapsed = ts - scrollStart;
      const progress = Math.min(elapsed / SCROLL_DURATION, 1);
      const pos = easeInOut(progress) * MAX_SCROLL;
      if (contentRef.current) contentRef.current.style.transform = `translateY(-${pos}px)`;

      if (progress < 1) {
        rafId = requestAnimationFrame(doScroll);
      } else {
        // Scroll done — show tap ripple on hamburger
        setTapVisible(true);
        phaseTimer = setTimeout(() => {
          setTapVisible(false);
          setMenuVisible(true);

          // Menu visible for 2.2s
          phaseTimer = setTimeout(() => {
            setMenuVisible(false);
            // Fade out content, reset scroll, fade back in
            phaseTimer = setTimeout(() => {
              setContentOpacity(0);
              phaseTimer = setTimeout(() => {
                if (contentRef.current) contentRef.current.style.transform = "translateY(0)";
                scrollStart = 0;
                setContentOpacity(1);
                // Restart scroll after brief pause
                phaseTimer = setTimeout(() => {
                  rafId = requestAnimationFrame(doScroll);
                }, 400);
              }, 350);
            }, 500);
          }, 2200);
        }, 600);
      }
    };

    // Initial delay before first scroll
    phaseTimer = setTimeout(() => {
      rafId = requestAnimationFrame(doScroll);
    }, 800);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      clearTimeout(phaseTimer);
    };
  }, []);

  const mc = (color?: string): React.CSSProperties => ({
    background: "#363840", borderRadius: "10px", padding: "10px 12px", overflow: "hidden",
    color: color || "#e8eaee",
  });
  const mcLabel: React.CSSProperties = { fontSize: "9px", color: "#565869", marginBottom: "5px", lineHeight: 1.3 };
  const mcVal = (color?: string): React.CSSProperties => ({
    fontSize: "22px", fontWeight: 700, color: color || "#e8eaee", lineHeight: 1, letterSpacing: "-0.03em",
  });
  const secHdr: React.CSSProperties = { fontSize: "12px", fontWeight: 600, color: "#c5c8d8", margin: "6px 0 3px", letterSpacing: "-0.01em" };

  return (
    <div style={{
      width: "100%", height: "100%", background: "#252629", overflow: "hidden", position: "relative",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
    }}>
      {/* ── Slide-in menu overlay ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "#1c1d22", zIndex: 20,
        transform: menuVisible ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Status row inside menu */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "48px 20px 8px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#e8eaee" }}>9:41</div>
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><rect x="0" y="6" width="2" height="3" rx=".5" fill="#e8eaee"/><rect x="3" y="4" width="2" height="5" rx=".5" fill="#e8eaee"/><rect x="6" y="2" width="2" height="7" rx=".5" fill="#e8eaee"/><rect x="9" y="0" width="2" height="9" rx=".5" fill="#e8eaee" opacity=".35"/></svg>
            <svg width="17" height="9" viewBox="0 0 17 9" fill="none"><rect x=".5" y=".5" width="13" height="8" rx="2" stroke="#e8eaee" strokeOpacity=".35"/><rect x="1.5" y="1.5" width="10" height="6" rx="1.2" fill="#22c55e"/><path d="M14.5 3v3" stroke="#e8eaee" strokeOpacity=".4" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>
        <div style={{ padding: "8px 20px 12px", borderBottom: "1px solid #2c2d35" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#e8eaee", letterSpacing: "-0.02em" }}>Navigation</div>
        </div>
        {[
          { label: "Dashboard", active: true },
          { label: "Overview", active: false },
          { label: "Negative Cash Flow", active: false },
          { label: "Financials", active: false },
          { label: "Properties", active: false },
          { label: "Unit Tracker", active: false },
          { label: "Unit Vacancy", active: false },
          { label: "Accounts", active: false },
        ].map(({ label, active }, i) => (
          <div key={label} style={{
            padding: "14px 20px",
            fontSize: "13px",
            color: active ? "#93b4fd" : "#6b6e82",
            background: active ? "rgba(37,99,235,0.18)" : "transparent",
            fontWeight: active ? 600 : 400,
            borderBottom: "1px solid rgba(44,45,53,0.6)",
            transition: `opacity 0.15s ${i * 0.03}s`,
            opacity: menuVisible ? 1 : 0,
          }}>
            {label}
          </div>
        ))}
      </div>

      {/* ── Dashboard content (scrolls) ── */}
      <div style={{
        opacity: contentOpacity,
        transition: "opacity 0.3s",
        height: "100%", display: "flex", flexDirection: "column",
      }}>
        {/* Status bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px 14px 4px", flexShrink: 0 }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#e8eaee", letterSpacing: "0.02em" }}>9:41</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><rect x="0" y="6" width="2" height="3" rx=".5" fill="#e8eaee"/><rect x="3" y="4" width="2" height="5" rx=".5" fill="#e8eaee"/><rect x="6" y="2" width="2" height="7" rx=".5" fill="#e8eaee"/><rect x="9" y="0" width="2" height="9" rx=".5" fill="#e8eaee" opacity=".35"/></svg>
            <svg width="17" height="9" viewBox="0 0 17 9" fill="none"><rect x=".5" y=".5" width="13" height="8" rx="2" stroke="#e8eaee" strokeOpacity=".35"/><rect x="1.5" y="1.5" width="10" height="6" rx="1.2" fill="#22c55e"/><path d="M14.5 3v3" stroke="#e8eaee" strokeOpacity=".4" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>

        {/* Header */}
        <div style={{
          padding: "4px 18px 10px", borderBottom: "1px solid #2c2d35",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#e8eaee", letterSpacing: "-0.02em" }}>Dashboard</div>
            <div style={{ fontSize: "9px", color: "#565869", marginTop: "2px" }}>March 2026 · 23 properties</div>
          </div>
          {/* Hamburger with tap ripple */}
          <div style={{ position: "relative", padding: "4px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: "18px", height: "1.5px", background: "#6b6e82", borderRadius: "1px" }} />)}
            </div>
            {/* Tap ripple */}
            {tapVisible && (
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(147, 180, 253, 0.25)",
                animation: "tapRipple 0.6s ease-out forwards",
              }} />
            )}
          </div>
        </div>

        {/* Scrollable area */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <div ref={contentRef} style={{ padding: "8px 14px", display: "flex", flexDirection: "column", gap: "8px", willChange: "transform" }}>

            {/* Occ gauges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[
                { label: "Wtd Physical Occ", val: "97.5%", arc: "126.3", circ: "131.9" },
                { label: "Phys Occ Distribution", val: "91.3%", arc: "120.4", circ: "131.9" },
              ].map(({ label, val, arc, circ }) => (
                <div key={label} style={{ background: "#363840", borderRadius: "10px", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ ...mcLabel, alignSelf: "flex-start" }}>{label}</div>
                  <svg width="72" height="72" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="26" fill="none" stroke="#2a2c38" strokeWidth="7" />
                    <circle cx="36" cy="36" r="26" fill="none" stroke="#22c55e" strokeWidth="7"
                      strokeDasharray={`${arc} ${circ}`} strokeLinecap="butt" transform="rotate(-90 36 36)" />
                    <text x="36" y="40" textAnchor="middle" fill="#e8eaee" fontSize="11" fontWeight="700">{val}</text>
                  </svg>
                </div>
              ))}
            </div>

            {/* Econ occ gauges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[
                { label: "Wtd Economic Occ", val: "98.5%", arc: "129.7", circ: "131.9" },
                { label: "Eco Occ Distribution", val: "87.0%", arc: "114.7", circ: "131.9" },
              ].map(({ label, val, arc, circ }) => (
                <div key={label} style={{ background: "#363840", borderRadius: "10px", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ ...mcLabel, alignSelf: "flex-start" }}>{label}</div>
                  <svg width="72" height="72" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="26" fill="none" stroke="#2a2c38" strokeWidth="7" />
                    <circle cx="36" cy="36" r="26" fill="none" stroke="#22c55e" strokeWidth="7"
                      strokeDasharray={`${arc} ${circ}`} strokeLinecap="butt" transform="rotate(-90 36 36)" />
                    <text x="36" y="40" textAnchor="middle" fill="#e8eaee" fontSize="11" fontWeight="700">{val}</text>
                  </svg>
                </div>
              ))}
            </div>

            {/* Property Metrics */}
            <div style={secHdr}>Property Metrics</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div style={mc()}><div style={mcLabel}>Neg Cash Flow</div><span style={mcVal()}>10</span></div>
              <div style={mc()}><div style={mcLabel}>Negative NOI</div><span style={mcVal()}>2</span></div>
              <div style={mc()}><div style={mcLabel}>UI Ratio &lt;75%</div><span style={mcVal()}>9</span></div>
              <div style={mc()}><div style={mcLabel}>Expense Ratio &gt;50%</div><span style={mcVal()}>0</span></div>
            </div>

            {/* Financial Performance */}
            <div style={secHdr}>Financial Performance</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div style={{ background: "#363840", borderRadius: "10px", padding: "10px 12px 0", height: "78px", overflow: "hidden" }}>
                <div style={mcLabel}>Net Op Income</div>
                <div style={mcVal("#22c55e")}>$525K</div>
                <svg width="100%" height="26" viewBox="0 0 120 26" preserveAspectRatio="none" style={{ display: "block" }}>
                  <polyline points="0,20 30,16 60,17 85,10 105,13 120,8" fill="none" stroke="#22c55e" strokeWidth="1.6" />
                </svg>
              </div>
              <div style={{ background: "#363840", borderRadius: "10px", padding: "10px 12px 0", height: "78px", overflow: "hidden" }}>
                <div style={mcLabel}>Eff Cash Flow</div>
                <div style={mcVal("#ef4444")}>-$85K</div>
                <svg width="100%" height="26" viewBox="0 0 120 26" preserveAspectRatio="none" style={{ display: "block" }}>
                  <polyline points="0,8 20,14 38,7 56,20 75,10 90,18 105,8 120,20" fill="none" stroke="#ef4444" strokeWidth="1.6" />
                </svg>
              </div>
              <div style={{ background: "#363840", borderRadius: "10px", padding: "10px 12px 0", height: "78px", overflow: "hidden" }}>
                <div style={mcLabel}>Operating Income</div>
                <div style={mcVal()}>$985K</div>
                <svg width="100%" height="26" viewBox="0 0 120 26" preserveAspectRatio="none" style={{ display: "block" }}>
                  <polyline points="0,20 20,18 40,19 60,14 80,16 100,12 120,10" fill="none" stroke="#0ea5e9" strokeWidth="1.6" />
                </svg>
              </div>
              <div style={{ background: "#363840", borderRadius: "10px", padding: "10px 12px 0", height: "78px", overflow: "hidden" }}>
                <div style={mcLabel}>Operating Expense</div>
                <div style={mcVal()}>$459K</div>
                <svg width="100%" height="26" viewBox="0 0 120 26" preserveAspectRatio="none" style={{ display: "block" }}>
                  <polyline points="0,15 25,14 50,18 70,11 95,15 115,11 120,9" fill="none" stroke="#0ea5e9" strokeWidth="1.6" />
                </svg>
              </div>
            </div>

            {/* Extra padding so scroll reveals content fully */}
            <div style={{ height: "60px" }} />
          </div>
        </div>

        {/* Tab bar */}
        <div style={{
          display: "flex", justifyContent: "space-around", alignItems: "center",
          padding: "6px 8px", height: "56px", borderTop: "1px solid #2c2d35",
          background: "#1c1d22", flexShrink: 0,
        }}>
          {[
            { label: "Dashboard", active: true, icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="6.5" height="6.5" rx="1.2" fill="#e8eaee"/><rect x="10.5" y="1" width="6.5" height="6.5" rx="1.2" fill="#e8eaee"/><rect x="1" y="10.5" width="6.5" height="6.5" rx="1.2" fill="#e8eaee"/><rect x="10.5" y="10.5" width="6.5" height="6.5" rx="1.2" fill="#e8eaee"/></svg> },
            { label: "Reports", active: false, icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#e8eaee" strokeWidth="1.3" strokeLinecap="round"><rect x="1.5" y="1.5" width="15" height="15" rx="2"/><line x1="1.5" y1="6.5" x2="16.5" y2="6.5"/><line x1="6.5" y1="1.5" x2="6.5" y2="16.5"/></svg> },
            { label: "Properties", active: false, icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#e8eaee" strokeWidth="1.3" strokeLinecap="round"><rect x="2" y="3" width="5" height="12" rx="1.2"/><rect x="9.5" y="7" width="5" height="8" rx="1.2"/></svg> },
          ].map(({ label, active, icon }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", flex: 1, opacity: active ? 1 : 0.4 }}>
              {icon}
              <span style={{ fontSize: "9px", color: "#e8eaee", letterSpacing: "0.01em" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Home indicator */}
        <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", width: "90px", height: "4px", borderRadius: "4px", background: "rgba(255,255,255,0.28)" }} />
      </div>

      <style>{`
        @keyframes tapRipple {
          0%   { opacity: 1; transform: translate(-50%,-50%) scale(0.4); }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(1.6); }
        }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const HeroDashboardMockup = () => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 120, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <div
      className="w-full flex items-end justify-center mt-16 mb-0 px-4 relative"
      style={{ minHeight: "700px" }}
    >
      {/* ── MacBook Pro ── */}
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
        style={{ maxWidth: "900px", width: "100%", position: "relative", zIndex: 10 }}
      >
        {/* ── Lid (aluminum back + screen) ── */}
        <div style={{
          width: "100%",
          background: "linear-gradient(175deg, #e0e0e5 0%, #c8c8ce 60%, #b8b8be 100%)",
          borderRadius: "14px 14px 0 0",
          border: "1.5px solid #a8a8ae",
          borderBottom: "none",
          boxShadow: "0 -2px 0 rgba(255,255,255,0.6) inset, 0 40px 80px rgba(0,0,0,0.5)",
          padding: "12px 12px 0",
          position: "relative",
        }}>
          {/* Camera dot */}
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#5a5a5a", margin: "0 auto 8px",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
          }} />

          {/* Screen glass — dark bezel around display */}
          <div style={{
            background: "#1a1a1a",
            borderRadius: "6px 6px 0 0",
            padding: "6px",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.8)",
          }}>
            {/* Display */}
            <div style={{
              borderRadius: "3px",
              overflow: "hidden",
              position: "relative",
              aspectRatio: "16/10",
              background: "#0d0e11",
            }}>
              {/* Browser chrome */}
              <div style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "5px 10px",
                background: "#1c1d28",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f57", flexShrink: 0 }} />
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#febc2e", flexShrink: 0 }} />
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#28c840", flexShrink: 0 }} />
                <div style={{
                  flex: 1, margin: "0 12px",
                  background: "#0d0e11", borderRadius: "4px",
                  fontSize: "6px", color: "rgba(255,255,255,0.25)",
                  padding: "2px 8px", textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  app.folioexcel.com/dashboard
                </div>
              </div>
              {/* Dashboard content */}
              <div style={{ position: "relative", height: "calc(100% - 28px)", overflow: "hidden" }}>
                <LaptopDashboard />
              </div>
            </div>
          </div>
        </div>

        {/* ── Hinge ── */}
        <div style={{
          height: "5px",
          background: "linear-gradient(180deg, #a0a0a6 0%, #b8b8be 100%)",
          borderLeft: "1.5px solid #a8a8ae",
          borderRight: "1.5px solid #a8a8ae",
        }} />

        {/* ── Base / keyboard deck ── */}
        <div style={{
          background: "linear-gradient(180deg, #cacace 0%, #b8b8be 100%)",
          borderRadius: "0 0 10px 10px",
          border: "1.5px solid #a8a8ae",
          borderTop: "none",
          height: "28px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          display: "flex", justifyContent: "center", alignItems: "center",
        }}>
          {/* Trackpad */}
          <div style={{
            width: "100px", height: "16px", borderRadius: "3px",
            background: "linear-gradient(180deg, #c0c0c6 0%, #b0b0b6 100%)",
            border: "1px solid #a0a0a6",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
          }} />
        </div>

        {/* Glow under laptop */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-[24px] bg-primary/15 blur-2xl rounded-full pointer-events-none" />
      </motion.div>

      {/* ── iPhone 16 Pro ── */}
      <motion.div
        initial={{ opacity: 0, y: 90 }}
        animate={{
          opacity: 1,
          y: [0, -12, 0],
        }}
        transition={{
          opacity: { delay: 0.9, duration: 0.9, ease: "easeOut" },
          y: { delay: 0.9, duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "calc(50% - 510px)",
          zIndex: 20,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 900,
        }}
        className="hidden lg:block"
      >
        {/* iPhone 16 Pro outer body — scaled to 210×438 (72% of spec) */}
        <div style={{
          width: "210px",
          height: "438px",
          background: "#f2f2f7",
          borderRadius: "36px",
          border: "2.5px solid #d1d1d6",
          boxShadow: "0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)",
          padding: "3px",
          position: "relative",
        }}>
          {/* Hardware buttons — scaled positions */}
          {/* Action button */}
          <div style={{ background: "#c8c8ce", position: "absolute", borderRadius: "2px", width: "3px", height: "14px", left: "-5px", top: "79px" }} />
          {/* Vol up */}
          <div style={{ background: "#c8c8ce", position: "absolute", borderRadius: "2px", width: "3px", height: "32px", left: "-5px", top: "108px" }} />
          {/* Vol down */}
          <div style={{ background: "#c8c8ce", position: "absolute", borderRadius: "2px", width: "3px", height: "32px", left: "-5px", top: "148px" }} />
          {/* Power */}
          <div style={{ background: "#c8c8ce", position: "absolute", borderRadius: "2px", width: "3px", height: "43px", right: "-5px", top: "119px" }} />
          {/* Camera control */}
          <div style={{ background: "#c8c8ce", position: "absolute", borderRadius: "3px", width: "3px", height: "29px", right: "-5px", top: "252px" }} />

          {/* Screen */}
          <div style={{
            width: "100%", height: "100%",
            background: "#000",
            borderRadius: "32px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Dynamic Island */}
            <div style={{
              width: "56px", height: "17px",
              background: "#000", borderRadius: "14px",
              position: "absolute", top: "8px", left: "50%",
              transform: "translateX(-50%)", zIndex: 10,
            }} />
            <PhoneScreen />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroDashboardMockup;
