import React from "react";
import { 
  ArrowUpDown, 
  Search 
} from "lucide-react";
import { useJobs } from "../context/JobContext";

export const CategoryNav = () => {
  const { 
    budgetType, 
    setBudgetType, 
    sortBy, 
    setSortBy, 
    filteredJobs, 
    searchQuery, 
    setSearchQuery 
  } = useJobs();

  return (
    <div className="mb-6">

      {/* Sub-toolbar: Search, Count, Type Toggle & Sort */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3 sm:px-4 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-white/[0.08] shadow-card">
        {/* Left: Quick Search Input & Count */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, skill..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#0B0F17]/90 border border-white/[0.08] text-white placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="text-xs text-slate-400 shrink-0 hidden sm:block">
            <span><strong className="text-white font-semibold font-mono">{filteredJobs.length}</strong> openings</span>
          </div>
        </div>

        {/* Right Controls: Budget type + Sort */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto justify-between lg:justify-end">
          {/* Budget type selector */}
          <div className="flex items-center p-0.5 rounded-xl bg-[#0B0F17]/90 border border-white/[0.08] text-[11px] sm:text-xs">
            <button
              onClick={() => setBudgetType("all")}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-medium transition-all ${
                budgetType === "all" ? "bg-indigo-600 text-white font-semibold shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setBudgetType("fixed")}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-medium transition-all ${
                budgetType === "fixed" ? "bg-indigo-600 text-white font-semibold shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Fixed
            </button>
            <button
              onClick={() => setBudgetType("hourly")}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-medium transition-all ${
                budgetType === "hourly" ? "bg-indigo-600 text-white font-semibold shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Hourly
            </button>
          </div>

          {/* Sort Selector */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-[#0B0F17]/90 border border-white/[0.08] hover:border-white/[0.15] text-[11px] sm:text-xs text-slate-200 font-medium focus:outline-none focus:border-indigo-500 cursor-pointer transition-colors"
            >
              <option value="newest">Most Recent</option>
              <option value="budget_high">Highest Budget</option>
              <option value="proposals_low">Lowest Competition</option>
            </select>
            <ArrowUpDown className="w-3 h-3 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
