import { useState } from "react";
import { motion } from "framer-motion";

type TabName = "Portfolio Overview" | "Rent Roll" | "Cash Flow" | "Delinquency";

const tabData: Record<TabName, { headers: string[]; rows: (string | number)[][]; totals: string[] }> = {
  "Portfolio Overview": {
    headers: ["Property", "Units", "Phys Occ", "Eco Occ", "NOI", "NOI/Unit", "Eff Cash Flow"],
    rows: [
      ["427 Cedar",          "7",   "100.00%", "95.46%",  "$6,570",    "$938",   "$6,570"],
      ["Grand Square",       "72",  "95.83%",  "100.56%", "$41,079",   "$570",   "$32,564"],
      ["Cedar Lofts",        "83",  "95.18%",  "104.33%", "$48,954",   "$590",   "$39,987"],
      ["Valley Terrace",     "42",  "92.86%",  "128.55%", "$47,918",   "$1,141", "$8,743"],
      ["913 Lake",           "46",  "97.83%",  "103.25%", "$54,045",   "$1,175", "$52,012"],
      ["Magnolia Residences","69",  "94.20%",  "88.97%",  "$39,815",   "$577",   "$39,815"],
      ["Park Place",         "82",  "100.00%", "0.00%",   "$16,755",   "$204",   "$16,755"],
      ["Sunset Commons",     "81",  "92.59%",  "89.47%",  "$84,180",   "$1,039", "$106,844"],
      ["642 Pine",           "56",  "87.50%",  "85.44%",  "$24,361",   "$435",   "$13,060"],
      ["Cedar View",         "172", "95.35%",  "92.81%",  "$125,153",  "$728",   "$102,787"],
      ["Sunset Heights",     "38",  "94.74%",  "91.60%",  "$36,718",   "$966",   "$11,503"],
      ["Elm Station",        "0",   "0.00%",   "0.00%",   "$179,131",  "$0",     "-$1,725"],
    ],
    totals: ["Portfolio (23 props)", "1,129", "97.5% wtd", "98.5% wtd", "$984,640", "$466 avg", "$525,804"],
  },
  "Rent Roll": {
    headers: ["Property", "Unit", "Tenant", "Lease End", "Rent/Mo", "Status"],
    rows: [
      ["Grand Square",       "101A", "J. Martinez",  "08/2026", "$1,200", "Current"],
      ["Cedar Lofts",        "204B", "S. Thompson",  "03/2026", "$1,350", "Current"],
      ["Valley Terrace",     "312",  "— Vacant —",  "—",       "$1,100", "Vacant"],
      ["913 Lake",           "108A", "R. Patel",     "11/2025", "$1,475", "30-Day"],
      ["Magnolia Residences","215",  "M. Davis",     "06/2026", "$1,280", "Current"],
      ["Sunset Commons",     "403B", "K. Williams",  "01/2027", "$1,520", "Current"],
      ["642 Pine",           "116",  "A. Chen",      "09/2025", "$1,150", "60-Day"],
      ["Cedar View",         "522A", "L. Johnson",   "12/2026", "$1,650", "Current"],
      ["Cedar View",         "631",  "T. Wilson",    "05/2026", "$1,700", "Current"],
      ["Park Place",         "201",  "D. Miller",    "07/2026", "$1,300", "Current"],
      ["642 Pine",           "108",  "B. Garcia",    "10/2026", "$1,200", "Current"],
      ["Sunset Heights",     "305A", "C. Anderson",  "04/2027", "$1,450", "Current"],
    ],
    totals: ["12 Units shown", "", "", "", "$15,375/mo", "83.3% Occ"],
  },
  "Cash Flow": {
    headers: ["Property", "Gross Income", "OpEx", "Debt Svc", "Eff Cash Flow"],
    rows: [
      ["427 Cedar",           "$8,400",   "$1,830",   "$0",      "$6,570"],
      ["Grand Square",        "$71,540",  "$30,461",  "$8,515",  "$32,564"],
      ["Cedar Lofts",         "$101,580", "$52,626",  "$8,967",  "$39,987"],
      ["Valley Terrace",      "$60,860",  "$12,942",  "$39,175", "$8,743"],
      ["913 Lake",            "$71,180",  "$17,135",  "$2,033",  "$52,012"],
      ["Magnolia Residences", "$62,620",  "$22,805",  "$0",      "$39,815"],
      ["Park Place",          "$17,090",  "$335",     "$0",      "$16,755"],
      ["Sunset Commons",      "$117,840", "$33,660",  "-$22,664","$106,844"],
      ["642 Pine",            "$46,240",  "$21,880",  "$11,300", "$13,060"],
      ["Cedar View",          "$210,800", "$85,647",  "$22,366", "$102,787"],
      ["Sunset Heights",      "$51,240",  "$14,522",  "$25,215", "$11,503"],
      ["Elm Station",         "$0",       "$1,725",   "$0",      "-$1,725"],
    ],
    totals: ["Portfolio Total", "$819,390", "$295,568", "$94,907", "$428,915"],
  },
  "Delinquency": {
    headers: ["Property", "Units", "Del Ratio", "30-Day Bal", "60-Day Bal", "90-Day+ Bal"],
    rows: [
      ["427 Cedar",           "7",   "20.58%", "$1,200",  "$0",      "$0"],
      ["Grand Square",        "72",  "14.92%", "$8,420",  "$2,140",  "$1,180"],
      ["Cedar Lofts",         "83",  "1.52%",  "$2,800",  "$0",      "$0"],
      ["Valley Terrace",      "42",  "8.09%",  "$4,100",  "$1,850",  "$690"],
      ["913 Lake",            "46",  "5.38%",  "$3,200",  "$850",    "$0"],
      ["Magnolia Residences", "69",  "5.06%",  "$4,800",  "$1,200",  "$0"],
      ["Park Place",          "82",  "0.00%",  "$0",      "$0",      "$0"],
      ["Sunset Commons",      "81",  "7.66%",  "$6,300",  "$2,100",  "$950"],
      ["642 Pine",            "56",  "5.86%",  "$2,900",  "$900",    "$0"],
      ["Cedar View",          "172", "20.49%", "$18,600", "$5,200",  "$2,100"],
      ["Sunset Heights",      "38",  "9.88%",  "$4,200",  "$1,100",  "$450"],
      ["Elm Station",         "0",   "0.00%",  "$0",      "$0",      "$0"],
    ],
    totals: ["Portfolio", "1,129", "9.72% avg", "$56,520", "$15,340", "$5,370"],
  },
};

const isNeg = (val: string | number) => String(val).startsWith("-");
const isHighPct = (val: string | number, header: string) => {
  if (header === "Del Ratio" || header === "Exp Ratio") {
    const num = parseFloat(String(val));
    return num > 10;
  }
  return false;
};
const isOccPct = (val: string | number, header: string) =>
  (header === "Phys Occ" || header === "Eco Occ") && parseFloat(String(val)) > 90;
const isStatus = (val: string | number) =>
  val === "Current" ? "current" : val === "Vacant" ? "vacant" : val === "30-Day" || val === "60-Day" ? "warn" : null;

const ExcelPreview = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Portfolio Overview");
  const data = tabData[activeTab];

  const getCellClass = (cell: string | number, ci: number, header: string) => {
    if (ci === 0) return "text-left font-semibold text-foreground/90";
    const cellStr = String(cell);
    const status = isStatus(cell);
    if (status === "current") return "text-right text-primary font-semibold";
    if (status === "vacant") return "text-right text-red-400 font-semibold";
    if (status === "warn") return "text-right text-yellow-400 font-semibold";
    if (isNeg(cell)) return "text-right text-red-400";
    if (isOccPct(cell, header)) return "text-right text-primary";
    if (isHighPct(cell, header)) return "text-right text-yellow-400";
    if (cellStr.startsWith("$") || cellStr.includes("%")) return "text-right text-foreground/80";
    return "text-right text-foreground/70";
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="py-20 md:py-28 px-5 md:px-12 bg-background"
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-machine font-bold tracking-[0.1em] uppercase text-primary mb-4">
            <span className="block w-[22px] h-0.5 bg-primary rounded" />
            Excel Export Preview
            <span className="block w-[22px] h-0.5 bg-primary rounded" />
          </div>
          <h2 className="font-display text-[clamp(28px,3.8vw,50px)] font-bold leading-[1.08] tracking-[-0.02em] text-foreground mb-4">
            The spreadsheet you <em className="font-serif italic font-normal text-primary">actually want</em>
          </h2>
          <p className="text-[17px] text-fe-muted-dark max-w-[580px] mx-auto leading-relaxed">
            Export any dashboard view to a clean, structured Excel file — built from your live PM data, ready to manipulate and share however you need.
          </p>
        </div>

        {/* Excel card — full width */}
        <div className="bg-card border border-border rounded-2xl p-4 md:p-7 shadow-[0_8px_40px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.06)_inset]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-extrabold text-foreground">Portfolio Performance — March 2026</h3>
              <p className="text-sm text-fe-muted-dark">23 properties · 1,129 units · Auto-generated from live AppFolio data</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary/20 transition-colors flex items-center gap-2 whitespace-nowrap">
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
                  className={`px-3.5 py-1.5 rounded-t-md text-[11px] font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-[#0d1022] text-foreground border-b-2 border-primary"
                      : "text-fe-muted-dark hover:text-fe-text-dark"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="p-3 overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-primary/20">
                    {data.headers.map((h, i) => (
                      <th
                        key={h}
                        className={`text-[9.5px] md:text-[11px] text-primary font-bold px-2.5 py-2 tracking-wide ${
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
                    <tr key={ri} className={`border-b border-foreground/[0.04] hover:bg-foreground/[0.02] transition-colors ${ri % 2 === 0 ? "" : "bg-foreground/[0.01]"}`}>
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`text-[9.5px] md:text-[11px] px-2.5 py-1.5 ${getCellClass(cell, ci, data.headers[ci])}`}
                        >
                          {String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr className="border-t-2 border-primary/20 bg-primary/[0.03]">
                    {data.totals.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`text-[9.5px] md:text-[11px] px-2.5 py-2 font-extrabold ${
                          ci === 0
                            ? "text-left text-primary"
                            : `text-right ${isNeg(cell) ? "text-red-400" : "text-foreground"}`
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-3 py-2.5 border-t border-border text-[9px] text-fe-muted-dark">
              <span>Auto-generated · FolioExcel · March 2026</span>
              <span className="font-bold text-primary cursor-pointer hover:underline">↓ Export to Excel</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ExcelPreview;
