import React from "react";
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Layers, 
  Code2, 
  Palette, 
  Cpu, 
  Smartphone, 
  Coins, 
  PenTool,
  Check
} from "lucide-react";
import { useJobs } from "../context/JobContext";
import { CATEGORIES } from "../data/mockData";

export const JobFilters = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    budgetType,
    setBudgetType,
    minBudget,
    maxBudget,
    setMaxBudget,
    selectedExperience,
    setSelectedExperience,
    sortBy,
    setSortBy
  } = useJobs();

  const handleReset = () => {
    setSelectedCategory("all");
    setBudgetType("all");
    setMaxBudget(10000);
    setSelectedExperience("all");
    setSortBy("newest");
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "Code2": return <Code2 className="w-4 h-4 text-slate-400" />;
      case "Palette": return <Palette className="w-4 h-4 text-slate-400" />;
      case "Cpu": return <Cpu className="w-4 h-4 text-slate-400" />;
      case "Smartphone": return <Smartphone className="w-4 h-4 text-slate-400" />;
      case "Coins": return <Coins className="w-4 h-4 text-slate-400" />;
      case "PenTool": return <PenTool className="w-4 h-4 text-slate-400" />;
      default: return <Layers className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header / Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white text-sm font-heading">Filter Projects</h3>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Categories
        </label>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isSelected ? "text-indigo-400" : "text-slate-500"}>
                    {getCategoryIcon(cat.icon)}
                  </span>
                  <span>{cat.label}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? "bg-indigo-500/20 text-indigo-300" : "bg-white/[0.04] text-slate-500"
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Type Toggle */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Budget Type
        </label>
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#161F30] border border-white/[0.06]">
          <button
            onClick={() => setBudgetType("all")}
            className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
              budgetType === "all"
                ? "bg-indigo-600 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setBudgetType("fixed")}
            className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
              budgetType === "fixed"
                ? "bg-indigo-600 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Fixed
          </button>
          <button
            onClick={() => setBudgetType("hourly")}
            className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
              budgetType === "hourly"
                ? "bg-indigo-600 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Hourly
          </button>
        </div>
      </div>

      {/* Budget Range (for Fixed Price) */}
      {budgetType !== "hourly" && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Fixed Budget Range
            </label>
            <span className="text-xs text-indigo-400 font-mono">
              ${minBudget} - ${maxBudget >= 10000 ? "10k+" : maxBudget}
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-[#1F293D] rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>$0</span>
              <span>$5,000</span>
              <span>$10,000+</span>
            </div>
          </div>
        </div>
      )}

      {/* Experience Level */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Experience Level
        </label>
        <div className="space-y-1">
          {["all", "Entry", "Intermediate", "Expert"].map((lvl) => {
            const isSelected = selectedExperience.toLowerCase() === lvl.toLowerCase();
            return (
              <button
                key={lvl}
                onClick={() => setSelectedExperience(lvl)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                  isSelected
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <span>{lvl === "all" ? "Any Experience Level" : `${lvl} Level`}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sorting */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-[#161F30] border border-white/[0.08] text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="newest">Most Recent</option>
          <option value="budget_high">Highest Budget</option>
          <option value="proposals_low">Lowest Competition</option>
        </select>
      </div>
    </div>
  );
};
