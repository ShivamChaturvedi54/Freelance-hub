import React from "react";
import { Bookmark, ArrowRight } from "lucide-react";
import { useJobs } from "../context/JobContext";
import { JobCard } from "./JobCard";

export const SavedJobsView = ({ onSelectJob, onBrowseJobs }) => {
  const { savedJobs } = useJobs();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 font-heading">
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>Saved Projects ({savedJobs.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Projects you've bookmarked to review or apply to later.
          </p>
        </div>

        <button
          onClick={onBrowseJobs}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          <span>Browse all jobs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {savedJobs.length === 0 ? (
        <div className="text-center py-16 p-8 bg-[#131926] rounded-3xl border border-white/[0.08] shadow-card">
          <Bookmark className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2 font-heading">No saved projects yet</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            Click the bookmark icon on any job card in the marketplace feed to save it for later review.
          </p>
          <button
            onClick={onBrowseJobs}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-sm transition-colors"
          >
            Browse Open Jobs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} onSelectJob={onSelectJob} />
          ))}
        </div>
      )}
    </div>
  );
};
