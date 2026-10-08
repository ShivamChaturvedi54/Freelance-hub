import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2 
} from "lucide-react";

export const HeroBanner = ({ onPostJobClick }) => {

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#111724]/90 backdrop-blur-md border border-white/[0.08] p-5 sm:p-8 lg:p-10 mb-8 shadow-card">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/[0.08] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        
        {/* Left Column: Headlines & Search */}
        <div className="lg:col-span-7">

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-3 sm:mb-4 font-heading">
            Hire proven{" "}
            <span className="dynamic-gradient-text">
              independent talent for your biggest projects.
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-5 sm:mb-6 max-w-xl font-normal">
            Connect directly with verified software engineers, product designers, and technical leaders. Protected by milestone escrows and zero friction.
          </p>


          {/* Genuine Trust Assurance Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-white/[0.08]">
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-white font-heading leading-tight">Milestone Escrow</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">100% Protected</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-white font-heading leading-tight">Direct Contracts</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">Zero Markups</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-white font-heading leading-tight">Verified Portfolios</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">Vetted Talent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Hero Visual */}
        <div className="lg:col-span-5 relative mt-2 lg:mt-0">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl bg-[#151D2D]">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=900"
              alt="Creative team collaborating on digital projects"
              className="w-full h-52 sm:h-72 lg:h-96 object-cover object-center opacity-95 hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
