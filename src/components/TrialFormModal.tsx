import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const WEBHOOK_URL = "https://leavenwealth.app.n8n.cloud/webhook/3470630d-9810-4e70-b1fd-bd32f9d29ef1";

interface TrialFormModalProps {
  open: boolean;
  onClose: () => void;
}

const TrialFormModal = ({ open, onClose }: TrialFormModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    portfolioSize: "",
    pmSoftware: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "trial_modal" }),
      });
    } catch (err) {
      console.error("Webhook error:", err);
    }
    setSubmitted(true);
    toast.success("Early Access Request Sent!", { description: "We will contact you soon!" });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", portfolioSize: "", pmSoftware: "", notes: "" });
    }, 300);
  };

  const inputClass =
    "px-3.5 py-2.5 bg-foreground/5 border border-foreground/10 rounded-lg text-foreground text-sm outline-none focus:border-primary/40 focus:bg-foreground/[0.07] focus:ring-[3px] focus:ring-primary/[0.08] transition-all shadow-[0_2px_6px_rgba(0,0,0,0.2)] placeholder:text-foreground/20";

  const selectClass =
    "px-3.5 py-2.5 bg-[hsl(var(--fe-dark2))] border border-foreground/10 rounded-lg text-foreground text-sm outline-none focus:border-primary/40 cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.2)] [&>option]:bg-[hsl(230,30%,12%)] [&>option]:text-foreground [&>option]:py-2";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center px-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-2xl border border-foreground/10 p-6 md:p-8 shadow-[0_8px_48px_rgba(0,0,0,0.5)]"
            style={{
              background: "linear-gradient(160deg, hsl(var(--fe-dark2)) 0%, hsl(230 30% 10%) 100%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-fe-muted-dark hover:text-foreground transition-colors text-xl leading-none"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <h3 className="font-display text-[22px] font-bold text-foreground mb-1">
                  Start Your Free Trial
                </h3>
                <p className="text-sm text-fe-muted-dark mb-6">
                  Fill in your details and we'll schedule a quick setup call.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Marcus Reid"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@ridgelinecapital.com"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Ridgeline Capital"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">
                        Portfolio Size
                      </label>
                      <select
                        value={formData.portfolioSize}
                        onChange={(e) => setFormData({ ...formData, portfolioSize: e.target.value })}
                        className={selectClass}
                      >
                        <option value="">Select range</option>
                        <option>Under 100 units</option>
                        <option>100–500 units</option>
                        <option>500–1,000 units</option>
                        <option>1,000–5,000 units</option>
                        <option>5,000+ units</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">
                      PM Software You Use
                    </label>
                    <select
                      value={formData.pmSoftware}
                      onChange={(e) => setFormData({ ...formData, pmSoftware: e.target.value })}
                      className={selectClass}
                    >
                      <option value="">Select platform</option>
                      <option>AppFolio</option>
                      <option>Yardi Breeze</option>
                      <option>Yardi Voyager</option>
                      <option>Buildium</option>
                      <option>Rent Manager</option>
                      <option>RealPage</option>
                      <option>Entrata</option>
                      <option>Multiple platforms</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-6">
                    <label className="text-xs font-bold text-fe-muted-dark tracking-wider uppercase">
                      Anything specific you'd like to see? (optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. negative cash flow tracking, multi-platform reporting..."
                      className={`${inputClass} resize-none h-[70px]`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-primary-foreground rounded-lg font-bold text-[15px] shadow-[0_6px_28px_hsl(162_100%_39%/0.38)] hover:bg-[#00e0aa] hover:-translate-y-0.5 hover:shadow-[0_14px_44px_hsl(162_100%_39%/0.45)] transition-all"
                  >
                    Start Free Trial →
                  </button>
                  <p className="text-xs text-fe-muted-dark mt-3 text-center">
                    🔒 No payment required · You'll be redirected to schedule a call
                  </p>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary/20 to-accent/15 border-2 border-primary/30 flex items-center justify-center mx-auto mb-5 text-3xl shadow-[0_8px_32px_hsl(162_100%_39%/0.2)]">
                  ✓
                </div>
                <h3 className="font-display text-[22px] font-bold text-foreground mb-3">
                  You're on the list!
                </h3>
                <p className="text-sm text-fe-muted-dark max-w-[400px] mx-auto leading-relaxed">
                  Thanks, {formData.name}! We've opened our scheduling page in a new tab — book a
                  quick call and we'll get you set up.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrialFormModal;
