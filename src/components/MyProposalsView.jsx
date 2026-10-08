import React from "react";
import { FileText, ArrowRight } from "lucide-react";
import { useJobs } from "../context/JobContext";

export const MyProposalsView = ({ onBrowseJobs, onSelectJob }) => {
  const { proposals } = useJobs();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 font-heading">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>My Submitted Proposals ({proposals.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track your submitted bids, timelines, and client review status.
          </p>
        </div>

        <button
          onClick={onBrowseJobs}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          <span>Find more projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {proposals.length === 0 ? (
        <div className="text-center py-16 p-8 bg-[#131926] rounded-3xl border border-white/[0.08] shadow-card">
          <FileText className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2 font-heading">No proposals submitted yet</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            Browse open projects in web development, AI, UI/UX, and cloud architecture to submit a proposal.
          </p>
          <button
            onClick={onBrowseJobs}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-sm transition-colors"
          >
            Browse Open Jobs
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((prop) => (
            <div
              key={prop.id}
              className="p-6 rounded-2xl bg-[#131926] border border-white/[0.08] space-y-3 shadow-card hover:border-indigo-500/30 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20 mb-1 inline-block">
                    Submitted Proposal
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading">{prop.jobTitle}</h3>
                  <p className="text-xs text-slate-400">
                    Client: <strong className="text-slate-300">{prop.clientName || "Client"}</strong> • Delivery commitment: {prop.deliveryTime}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    ${prop.bidAmount}
                  </span>
                  <span className="block text-[10px] text-amber-400 font-medium mt-0.5">
                    ● Under Client Review
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-white/[0.06] text-xs text-slate-300 leading-relaxed font-sans">
                <p className="whitespace-pre-line line-clamp-3">{prop.coverLetter}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
