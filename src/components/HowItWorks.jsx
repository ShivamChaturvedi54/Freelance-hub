import React from "react";
import { 
  Briefcase, 
  ShieldCheck, 
  MessageSquare, 
  CheckCircle2 
} from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      title: "Post a Project or Send a Proposal",
      desc: "Clients post clear project specifications and desired timelines. Freelancers review requirements and submit tailored proposals with their portfolio examples.",
      icon: <Briefcase className="w-5 h-5 text-indigo-400" />
    },
    {
      title: "Fund Secure Milestones",
      desc: "Before work starts, the client deposits milestone funds safely into escrow. Freelancers work with 100% confidence they will be paid upon approved completion.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    },
    {
      title: "Collaborate & Iterate",
      desc: "Keep all communication, file sharing, and project iterations in one centralized workspace. Review draft deliverables and give direct feedback.",
      icon: <MessageSquare className="w-5 h-5 text-cyan-400" />
    },
    {
      title: "Approve Deliverables & Release Payout",
      desc: "When deliverables meet expectations, the client approves the milestone and funds release immediately to the freelancer with mutual 5-star reviews.",
      icon: <CheckCircle2 className="w-5 h-5 text-indigo-400" />
    }
  ];

  return (
    <div className="space-y-16 max-w-4xl mx-auto py-6 animate-in fade-in duration-200">
      
      {/* Hero Headline */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2.5 inline-block">
          Simple & Transparent
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 font-heading">
          How FreelanceHub Works
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          A modern marketplace built for trust, clear expectations, and protected payouts for both clients and talent.
        </p>
      </div>

      {/* Single Unified Box for All 4 Steps */}
      <div className="rounded-2xl sm:rounded-3xl bg-[#131926] border border-white/[0.08] shadow-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {steps.map((st, i) => (
            <div
              key={i}
              className={`p-6 sm:p-8 hover:bg-white/[0.02] transition-colors relative group ${
                i === 0 ? "border-b md:border-r border-white/[0.08]" :
                i === 1 ? "border-b border-white/[0.08]" :
                i === 2 ? "border-b md:border-b-0 md:border-r border-white/[0.08]" :
                ""
              }`}
            >
              <div className="mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#161F30] border border-white/[0.08] flex items-center justify-center">
                  {st.icon}
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-heading">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Box */}
      <div className="p-5 sm:p-8 lg:p-10 rounded-2xl bg-[#111724] border border-white/[0.08] shadow-card">
        <h2 className="text-2xl font-bold text-white text-center mb-8 font-heading">
          Why Clients and Freelancers Partner Here
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-heading mb-1">Low 5% Fee</div>
            <div className="text-sm font-semibold text-white mb-1">Fair Platform Rates</div>
            <div className="text-xs text-slate-400">Freelancers take home up to 95% of their hard-earned earnings.</div>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-400 font-heading mb-1">&lt; 2 Hours</div>
            <div className="text-sm font-semibold text-white mb-1">Fast Response Time</div>
            <div className="text-xs text-slate-400">Receive qualified proposals from available specialists quickly.</div>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-heading mb-1">100% Escrow</div>
            <div className="text-sm font-semibold text-white mb-1">Milestone Protection</div>
            <div className="text-xs text-slate-400">Deposits held securely until deliverables are verified.</div>
          </div>
        </div>
      </div>

    </div>
  );
};
