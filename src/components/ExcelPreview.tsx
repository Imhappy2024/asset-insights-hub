import { useState } from "react";
import { motion } from "framer-motion";

type TabName = "P&L Summary" | "Rent Roll" | "Cash Flow";

const tabData: Record<TabName, { headers: string[]; rows: string[][]; totals: string[] }> = {
  "P&L Summary": {
    headers: ["Property", "Revenue", "Expenses", "NOI", "Variance"],
    rows: [
      ["Maple Ridge Apts", "$128,400", "$72,100", "$56,300", "+4.2%"],
      ["Oak Terrace", "$86,200", "$51,800", "$34,400", "-2.1%"],
      ["Cedar Lofts", "$204,600", "$118,400", "$86,200", "+6.8%"],
      ["Pine View Estates", "$64,800", "$42,200", "$22,600", "-8.3%"],
      ["Birch Creek Landing", "$152,000", "$89,600", "$62,400", "+3.1%"],
      ["Elm Court Commons", "$97,400", "$58,100", "$39,300", "+1.7%"],
      ["Willow Park Place", "$178,200", "$102,800", "$75,400", "+5.4%"],
      ["Aspen Heights", "$43,600", "$31,200", "$12,400", "-12.6%"],
    ],
    totals: ["Portfolio Total", "$955,200", "$566,200", "$389,000", "+2.1%"],
  },
  "Rent Roll": {
    headers: ["Unit", "Tenant", "Lease End", "Monthly Rent", "Status"],
    rows: [
      ["101-A", "J. Martinez", "08/2026", "$1,450", "Current"],
      ["101-B", "S. Thompson", "03/2026", "$1,525", "Current"],
      ["102-A", "— Vacant —", "—", "$1,400", "Vacant"],
      ["102-B", "R. Patel", "11/2025", "$1,380", "30-Day"],
      ["103-A", "M. Davis", "06/2026", "$1,600", "Current"],
      ["103-B", "K. Williams", "01/2027", "$1,550", "Current"],
      ["104-A", "A. Chen", "09/2025", "$1,475", "60-Day"],
      ["104-B", "L. Johnson", "12/2026", "$1,500", "Current"],
    ],
    totals: ["8 Units", "", "", "$11,880/mo", "87.5% Occ"],
  },
  "Cash Flow": {
    headers: ["Property", "Gross Income", "OpEx", "Debt Svc", "Net CF"],
    rows: [
      ["Maple Ridge Apts", "$128,400", "$72,100", "$38,200", "+$18,100"],
      ["Oak Terrace", "$86,200", "$51,800", "$28,400", "+$6,000"],
      ["Cedar Lofts", "$204,600", "$118,400", "$52,000", "+$34,200"],
      ["Pine View Estates", "$64,800", "$42,200", "$24,800", "-$2,200"],
      ["Birch Creek Landing", "$152,000", "$89,600", "$44,100", "+$18,300"],
      ["Elm Court Commons", "$97,400", "$58,100", "$32,600", "+$6,700"],
      ["Willow Park Place", "$178,200", "$102,800", "$48,000", "+$27,400"],
      ["Aspen Heights", "$43,600", "$31,200", "$18,400", "-$6,000"],
    ],
    totals: ["Portfolio Total", "$955,200", "$566,200", "$286,500", "+$102,500"],
  },
};

const ExcelPreview = () => {
  const [activeTab, setActiveTab] = useState<TabName>("P&L Summary");
  const data = tabData[activeTab];

  const isNeg = (val: string) => val.startsWith("-");
  const isPos = (val: string) => val.startsWith("+");

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="py-20 md:py-28 px-5 md:px-12 bg-background"
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-primary mb-4">
            <span className="block w-[22px] h-0.5 bg-primary rounded" />
            Excel Export Preview
            <span className="block w-[22px] h-0.5 bg-primary rounded" />
          </div>
          <h2 className="text-[clamp(28px,3.8vw,50px)] font-extrabold leading-[1.08] tracking-[-0.028em] text-foreground mb-4">
            The spreadsheet you <em className="font-serif italic font-normal text-primary">actually want</em>
          </h2>
          <p className="text-[17px] text-fe-muted-dark max-w-[560px] mx-auto leading-relaxed">
            Export any dashboard view to a clean, structured Excel file — ready to manipulate, share, or analyze however you want.
          </p>
        </div>

        {/* Excel card */}
        <div className="bg-card border border-border rounded-2xl p-4 md:p-7 shadow-[0_8px_40px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.06)_inset] max-w-[900px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-foreground">Portfolio Performance — March 2026</h3>
              <p className="text-sm text-fe-muted-dark">Auto-generated from live PM data</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary/20 transition-colors flex items-center gap-2">
              ↓ Export .xlsx
            </button>
          </div>

          <div className="bg-[#070910] rounded-xl overflow-hidden border border-border shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {/* Tab bar */}
            <div className="flex gap-px bg-[#04060f] px-2 pt-1.5 overflow-x-auto">
              {(Object.keys(tabData) as TabName[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-t-md text-[11px] font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-[#0d1022] text-foreground"
                      : "text-fe-muted-dark hover:text-fe-text-dark"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="p-3 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    {data.headers.map((h, i) => (
                      <th
                        key={h}
                        className={`text-[9px] md:text-[10px] text-primary font-bold border-b border-primary/20 px-2 py-1.5 tracking-wide ${
                          i === 0 ? "text-left" : "text-right"
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-foreground/[0.04] hover:bg-foreground/[0.015] transition-colors">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`text-[9px] md:text-[10px] px-2 py-1 ${
                            ci === 0
                              ? "text-left font-bold text-foreground/80"
                              : `text-right ${
                                  isNeg(cell) ? "text-red-400" : isPos(cell) ? "text-primary" : "text-foreground/70"
                                }`
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr className="border-t-2 border-primary/20">
                    {data.totals.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`text-[9px] md:text-[10px] px-2 py-1.5 font-extrabold ${
                          ci === 0
                            ? "text-left text-primary"
                            : `text-right ${
                                isNeg(cell) ? "text-red-400" : isPos(cell) ? "text-primary" : "text-foreground"
                              }`
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t border-border text-[9px] text-fe-muted-dark">
              <span>Auto-generated · FolioExcel</span>
              <span className="font-bold text-primary cursor-pointer">↓ Export to Excel</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ExcelPreview;
