import React from "react";
import { 
  Clock, 
  DollarSign, 
  Bookmark, 
  Star, 
  MapPin, 
  FileText, 
  ArrowUpRight, 
  CheckCircle2 
} from "lucide-react";
import { useJobs } from "../context/JobContext";

export const JobCard = ({ job, onSelectJob }) => {
  const { savedJobIds, toggleSaveJob } = useJobs();
  const isSaved = savedJobIds.includes(job.id);

  const clientInitial = job.client?.name ? job.client.name.substring(0, 2).toUpperCase() : "AC";

  return (
    <div 
      onClick={() => onSelectJob(job)}
      className="group relative rounded-2xl bg-[#111726]/85 hover:bg-[#141C2E] border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-300 shadow-card hover:shadow-2xl hover:shadow-indigo-500/10 p-5 sm:p-6 flex flex-col justify-between cursor-pointer overflow-hidden backdrop-blur-sm"
    >
      {/* Subtle Top Accent Highlight on Hover */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/0 group-hover:via-indigo-500/80 to-transparent transition-all duration-500" />
      
      {/* Top Meta Line: Client Avatar, Title, Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3">
          
          <div className="flex items-start gap-3 sm:gap-3.5 flex-1 min-w-0">
            {/* Company Badge Avatar */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-900/40 to-[#161F30] border border-white/[0.1] group-hover:border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold font-mono text-xs sm:text-sm shrink-0 shadow-inner group-hover:text-indigo-200 transition-all">
              {clientInitial}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-1">
                <span className="font-semibold text-slate-200 truncate">{job.client?.name || "Client"}</span>
                {job.client?.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>Verified</span>
                  </span>
                )}
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{job.postedAt}</span>
                </span>
              </div>

              <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug font-heading tracking-tight mt-0.5">
                {job.title}
              </h3>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job.id);
            }}
            className={`p-2 sm:p-2.5 rounded-xl transition-all shrink-0 ${
              isSaved
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm"
                : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.07]"
            }`}
            title={isSaved ? "Remove from bookmarks" : "Save this job"}
          >
            <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSaved ? "fill-amber-400" : ""}`} />
          </button>
        </div>

        {/* Budget & Scope Details */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 my-3.5 text-xs font-semibold">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center gap-1.5 font-mono font-bold shadow-sm shadow-emerald-500/5">
            <DollarSign className="w-3.5 h-3.5 shrink-0" />
            <span>
              {job.budgetType === "fixed" 
                ? `$${job.budget?.toLocaleString()} Fixed Price`
                : `$${job.budget || 50} - $${job.hourlyRateMax || 90}/hr`}
            </span>
          </div>

          <div className="px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium">
            <span>{job.experienceLevel || "Intermediate"} Level</span>
          </div>

          <div className="px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium flex items-center gap-1">
            <span>Est. {job.scope || "1-3 months"}</span>
          </div>

          <div className="px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs font-medium flex items-center gap-1.5">
            <FileText className="w-3 h-3 text-slate-500" />
            <span>{job.proposalsCount || 0} Proposals</span>
          </div>
        </div>

        {/* Project Description */}
        <p className="text-xs sm:text-sm text-slate-300/90 line-clamp-2 my-3.5 leading-relaxed font-normal">
          {job.description}
        </p>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
          {job.skills?.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-lg bg-[#161F30] hover:bg-[#1A253A] text-slate-300 hover:text-white border border-white/[0.07] transition-colors"
            >
              {skill}
            </span>
          ))}
          {job.skills?.length > 4 && (
            <span className="text-[11px] sm:text-xs font-medium px-2 py-1 rounded-lg bg-white/[0.03] text-slate-400">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Footer / Client Meta & Action Button */}
      <div className="pt-3.5 sm:pt-4 border-t border-white/[0.07] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        
        {/* Client credibility metrics */}
        <div className="flex flex-wrap items-center gap-2 text-slate-400">
          <div className="flex items-center gap-1 text-amber-400 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{job.client?.rating || "5.0"}</span>
          </div>
          <span className="text-slate-600">•</span>
          <span>{job.client?.spent || "$50k+"} spent</span>
          <span className="text-slate-600">•</span>
          <span>{job.client?.location || "United States"}</span>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectJob(job);
          }}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 group-hover:shadow-indigo-500/30"
        >
          <span>Apply Now</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

    </div>
  );
};
