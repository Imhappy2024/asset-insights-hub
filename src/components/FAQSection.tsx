import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What PM software does FolioExcel integrate with?",
    a: "FolioExcel is currently integrated with AppFolio. Because we're built on open API architecture, we can connect with virtually any property management platform — but each integration requires development work specific to that system. If you're on Yardi, Buildium, or another platform, reach out and we'll assess the integration together.",
  },
  {
    q: "What reports and KPIs are available?",
    a: "FolioExcel provides Rent Rolls, Rent Roll Itemized, Delinquency Reports, Income Statements, Cash Flow Statements, Unit Vacancy Detail, and Unit Turn Detail. Dashboard KPIs include NOI, Occupancy, Delinquency, DSCR, Utility Income & Delinquency Ratios, Total Income & Expenses, and 10+ more.",
  },
  {
    q: "How fast is the data compared to pulling reports manually?",
    a: "Getting all this data into the right format manually would take about 20 minutes per property — logging into your PM software, clicking through multiple screens, exporting, reformatting. With FolioExcel, it's instant. That's at least 20x faster.",
  },
  {
    q: "What is the Negative Cash Flow dashboard?",
    a: "The Negative Cash Flow report shows you how your property is actually cash flowing after removing prepaid rents, contributions & distributions, and security deposits. It gives you a true picture of operating cash flow without the noise.",
  },
  {
    q: "Can I export data to Excel?",
    a: "Yes! You can export any dashboard view or report to a structured Excel file with one click. The file is formatted and ready to manipulate, filter, or share however you need.",
  },
  {
    q: "Can I view data month-by-month or over longer periods?",
    a: "Absolutely. You can view any KPI or report on a month-by-month basis or look at trailing 12-month views. This makes it easy to spot trends and track performance over time.",
  },
  {
    q: "Do I need to download or install anything?",
    a: "No. FolioExcel is a web-based application. Just log in from any browser and your data is there — real-time, every time.",
  },
  {
    q: "Is there a limit on the number of properties?",
    a: "No. FolioExcel works for portfolios of any size — whether you have 10 properties or 10,000 units.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-28 px-5 md:px-12 bg-fe-light text-fe-text-light">
      <div className="max-w-[760px] mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-primary mb-5 justify-center">
            <span className="block w-[22px] h-0.5 bg-primary rounded" />
            FAQ
            <span className="block w-[22px] h-0.5 bg-primary rounded" />
          </div>
          <h2 className="text-[clamp(28px,3.8vw,50px)] font-extrabold leading-[1.08] tracking-[-0.028em] text-fe-text-light mb-4">
            Frequently asked <em className="font-serif italic font-normal text-primary">questions</em>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-fe-card-light border border-[hsl(var(--fe-border-light))] rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(13,16,32,0.06)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-[15px] font-bold text-fe-text-light pr-4">{faq.q}</span>
                <span className={`text-primary text-xl font-light shrink-0 transition-transform ${openIndex === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-[14px] text-fe-muted-light leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
