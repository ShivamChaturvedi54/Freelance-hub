import React, { useState } from "react";
import { 
  Send, 
  CheckCircle2, 
  Loader2,
  Wifi,
  Battery
} from "lucide-react";
import confetti from "canvas-confetti";

export const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Project Inquiry");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 }
      });
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setSubmitted(false);
      }, 3500);
    }, 600);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto">
      {/* Section Header */}
      <div className="text-center">
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2.5 inline-block">
          Direct Inquiries
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading">
          Get in Touch
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
          Have an enterprise hiring requirement, partnership proposal, or questions about milestone protection? We respond promptly.
        </p>
      </div>

      {/* Realistic Smartphone Shape Form Chassis */}
      <div className="relative mx-auto w-full max-w-[380px] rounded-[44px] p-3 sm:p-3.5 bg-gradient-to-b from-[#253046] via-[#161F30] to-[#0D131F] border-2 border-white/[0.14] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_40px_rgba(99,102,241,0.15)]">
        {/* Hardware side buttons */}
        <div className="absolute -left-[5px] top-24 w-[4px] h-8 bg-slate-600 rounded-l-sm" />
        <div className="absolute -left-[5px] top-36 w-[4px] h-10 bg-slate-600 rounded-l-sm" />
        <div className="absolute -right-[5px] top-28 w-[4px] h-12 bg-slate-600 rounded-r-sm" />

        {/* Mobile Screen Surface */}
        <div className="rounded-[34px] bg-[#0A0E17] border border-white/[0.08] p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between shadow-inner">
          
          {/* Top Status Bar & Dynamic Island */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3 px-1">
            <span className="font-semibold text-white font-mono text-[11px]">9:41</span>
            
            {/* Dynamic Island Capsule */}
            <div className="w-20 h-4 bg-black rounded-full border border-white/10 flex items-center justify-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-indigo-400/40" />
              <span className="w-6 h-1 rounded-full bg-slate-700" />
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Screen Header Bar */}
          <div className="text-center pb-2.5 border-b border-white/[0.06] mb-3.5">
            <h3 className="text-xs sm:text-sm font-bold text-white font-heading">FreelanceHub Direct Inquiries</h3>
          </div>

          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2 shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white font-heading">Message Sent!</h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                Thank you! An agent has received your inquiry and will reply to your email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3 py-2 rounded-xl bg-[#121826] border border-white/[0.08] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#121826] border border-white/[0.08] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Topic / Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#121826] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 cursor-pointer transition-all"
                >
                  <option value="Project Inquiry">Hiring / Project Scope</option>
                  <option value="Freelancer Question">Freelancer Account Help</option>
                  <option value="Escrow Milestone">Milestone Escrow Guidance</option>
                  <option value="Partnership">Enterprise Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project requirements or question..."
                  className="w-full p-2.5 rounded-xl bg-[#121826] border border-white/[0.08] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 leading-relaxed font-sans transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-1.5 flex justify-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Bottom Home Indicator Bar */}
          <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-3.5" />
        </div>
      </div>
    </div>
  );
};


