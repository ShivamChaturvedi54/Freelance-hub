import React, { useState } from "react";
import { 
  X, 
  Plus, 
  Trash2, 
  DollarSign, 
  Layers, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Clock,
  Briefcase
} from "lucide-react";
import confetti from "canvas-confetti";
import { useJobs } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../data/mockData";

export const PostJobModal = ({ isOpen, onClose }) => {
  const { createJob } = useJobs();
  const { currentUser, userProfile } = useAuth();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [description, setDescription] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(["React", "TypeScript", "Tailwind CSS"]);
  const [budgetType, setBudgetType] = useState("fixed"); // 'fixed' | 'hourly'
  const [budgetAmount, setBudgetAmount] = useState(3000);
  const [hourlyMax, setHourlyMax] = useState(85);
  const [experienceLevel, setExperienceLevel] = useState("Expert");
  const [scope, setScope] = useState("1 to 3 months");

  if (!isOpen) return null;

  const handleAddSkill = (e) => {
    e?.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleQuickAddSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createJob({
        title,
        category,
        description,
        skills,
        budgetType,
        budget: Number(budgetAmount),
        hourlyRateMax: budgetType === "hourly" ? Number(hourlyMax) : undefined,
        experienceLevel,
        scope,
        isFeatured: true
      });

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setStep(1);
        onClose();
      }, 1400);
    } catch (err) {
      console.error("Job creation failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const PRESET_SKILLS = [
    "Next.js", "Python", "GraphQL", "Solidity", "Figma", 
    "Node.js", "AI/ML", "React Native", "Docker", "PostgreSQL"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#131926] border border-white/[0.1] rounded-3xl shadow-modal overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Step {step} of 3</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-heading">
              Post a Project Listing
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Connect with top-tier developers and designers ready to start.
            </p>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? "bg-indigo-500" : "bg-white/[0.08]"}`} />
              <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? "bg-indigo-500" : "bg-white/[0.08]"}`} />
              <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? "bg-indigo-500" : "bg-white/[0.08]"}`} />
            </div>
          </div>

          {success ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Project Published Successfully!</h3>
              <p className="text-sm text-slate-400">
                Your project is now live on the global marketplace. Freelancers are reviewing your requirements.
              </p>
            </div>
          ) : (
            <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
              
              {/* STEP 1: Title & Category */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Senior Full-Stack Engineer for DeFi Yield Portal"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      A clear, descriptive title attracts higher quality proposals.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Primary Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.label)}
                          className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                            category === cat.label
                              ? "bg-indigo-600/20 text-indigo-300 border-indigo-500 shadow-md shadow-indigo-600/10"
                              : "bg-slate-800/50 text-slate-400 border-slate-700/60 hover:text-white hover:bg-slate-800"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Estimated Project Duration
                    </label>
                    <select
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Less than 1 month">Less than 1 month (Short sprint)</option>
                      <option value="1 to 3 months">1 to 3 months (Standard project)</option>
                      <option value="3 to 6 months">3 to 6 months (Medium-scale)</option>
                      <option value="Ongoing / Retainer">Ongoing / Long-term contract</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: Description & Skills */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Project Description & Deliverables
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Outline the core responsibilities, key milestones, architecture preferences, and expected deliverables..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Required Skills & Technologies
                    </label>
                    
                    {/* Input to add custom skill */}
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                        placeholder="Add skill (e.g. Next.js, Solana, Figma) and press Enter"
                        className="flex-1 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>

                    {/* Active Skills Chips */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="hover:text-rose-400"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Preset Suggestions */}
                    <div className="text-[11px] text-slate-400">
                      <span>Quick suggestions: </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {PRESET_SKILLS.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => handleQuickAddSkill(item)}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
                          >
                            + {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Budget & Experience */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Compensation Model
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBudgetType("fixed")}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          budgetType === "fixed"
                            ? "bg-indigo-600/20 border-indigo-500 text-white"
                            : "bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white"
                        }`}
                      >
                        <DollarSign className="w-5 h-5 text-indigo-400 mb-1" />
                        <div className="text-sm font-bold text-white">Fixed Price</div>
                        <div className="text-xs text-slate-400">Pay a milestone or total price</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBudgetType("hourly")}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          budgetType === "hourly"
                            ? "bg-indigo-600/20 border-indigo-500 text-white"
                            : "bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white"
                        }`}
                      >
                        <Clock className="w-5 h-5 text-emerald-400 mb-1" />
                        <div className="text-sm font-bold text-white">Hourly Rate</div>
                        <div className="text-xs text-slate-400">Pay by tracked time</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      {budgetType === "fixed" ? "Total Project Budget ($ USD)" : "Hourly Rate Range ($ USD/hr)"}
                    </label>
                    <div className="relative">
                      <DollarSign className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="number"
                        min="1"
                        required
                        value={budgetAmount}
                        onChange={(e) => setBudgetAmount(e.target.value)}
                        placeholder={budgetType === "fixed" ? "e.g. 3500" : "Min rate, e.g. 60"}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Desired Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Entry", "Intermediate", "Expert"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setExperienceLevel(lvl)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                            experienceLevel === lvl
                              ? "bg-indigo-600/20 text-indigo-300 border-indigo-500"
                              : "bg-slate-800/50 text-slate-400 border-slate-700 hover:text-white"
                          }`}
                        >
                          {lvl} Level
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-60"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isSubmitting ? "Publishing Listing..." : "Publish Project"}</span>
                  </button>
                )}
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
