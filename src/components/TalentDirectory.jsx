import React from "react";
import { 
  Star, 
  MapPin, 
  CheckCircle2 
} from "lucide-react";
import { SAMPLE_FREELANCERS } from "../data/mockData";

export const TalentDirectory = ({ onSelectFreelancer }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-2.5 inline-block">
          Verified Talent Directory
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 font-heading">
          Hire Top-Rated Independent Specialists
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Browse verified developers and product designers with public portfolios, client reviews, and direct hiring availability.
        </p>
      </div>

      {/* Freelancers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {SAMPLE_FREELANCERS.map((freelancer) => (
          <div
            key={freelancer.id}
            className="rounded-2xl bg-[#131926] hover:bg-[#151D2D] border border-white/[0.08] hover:border-white/[0.15] p-4 sm:p-6 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all duration-200"
          >
            <div>
              {/* Header Info */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-[#0B0F17] ${
                        freelancer.online ? "bg-emerald-500" : "bg-slate-500"
                      }`}
                      title={freelancer.online ? "Available now" : "Offline"}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {freelancer.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{freelancer.rating}</span>
                      <span className="text-slate-400">({freelancer.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    ${freelancer.hourlyRate}/hr
                  </span>
                  <span className="block text-[10px] text-slate-400 font-medium">
                    {freelancer.jobSuccess} Success
                  </span>
                </div>
              </div>

              {/* Title & Location */}
              <div className="mb-3">
                <p className="text-xs font-semibold text-indigo-300 mb-1">
                  {freelancer.title}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{freelancer.location}</span>
                </p>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-slate-300/90 line-clamp-3 mb-4 leading-relaxed font-normal">
                {freelancer.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {freelancer.skills.slice(0, 4).map((sk, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#161F30] text-slate-300 border border-white/[0.06]"
                  >
                    {sk}
                  </span>
                ))}
                {freelancer.skills.length > 4 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-400">
                    +{freelancer.skills.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
