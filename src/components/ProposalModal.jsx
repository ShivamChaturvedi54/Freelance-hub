import React, { useState } from "react";
import { 
  X, 
  DollarSign, 
  Clock, 
  Star, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Briefcase,
  AlertCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import { useJobs } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";

export const ProposalModal = ({ job, isOpen, onClose, onOpenAuth }) => {
  const { submitProposal } = useJobs();
  const { currentUser, quickDemoLogin } = useAuth();

  const [coverLetter, setCoverLetter] = useState(
    "Hi there!\n\nI have reviewed your project requirements and have extensive experience building scalable solutions with these exact technologies. In my recent work, I built similar architectures that achieved excellent performance and smooth user workflows.\n\nI would love to discuss your timeline and ensure all milestones are achieved on schedule."
  );
  const [bidAmount, setBidAmount] = useState(job?.budget || 2500);
  const [deliveryTime, setDeliveryTime] = useState("2 to 3 weeks");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth("login", "freelancer");
      return;
    }

    setSubmitting(true);
    try {
      await submitProposal({
        jobId: job.id,
        jobTitle: job.title,
        coverLetter,
        bidAmount: Number(bidAmount),
        deliveryTime,
        clientName: job.client?.name || "Client"
      });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Proposal submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#131926] border border-white/[0.1] rounded-3xl shadow-modal overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 max-h-[88vh] overflow-y-auto">
          
          {submitted ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-heading">Proposal Submitted</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                The client has received your proposal, rate, and cover letter. You will be notified when they open a conversation.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Job Scope & Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                    {job.category}
                  </span>
                  <span>Posted {job.postedAt}</span>
                  <span>•</span>
                  <span>{job.proposalsCount || 0} active proposals</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading">
                  {job.title}
                </h2>
              </div>

              {/* Client Credibility Card */}
              <div className="p-4 rounded-2xl bg-[#161F30] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold font-mono">
                    {job.client?.name ? job.client.name.substring(0, 2).toUpperCase() : "AC"}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-white font-heading">
                      <span>{job.client?.name || "Verified Client"}</span>
                      {job.client?.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Verified Client" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{job.client?.location || "United States"}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="text-right">
                    <div className="text-emerald-400 font-mono text-sm">{job.client?.spent || "$75k+"}</div>
                    <div className="text-slate-400 text-[10px]">Total Spent</div>
                  </div>
                  <div className="h-6 w-px bg-white/[0.08]" />
                  <div className="text-right">
                    <div className="text-amber-400 flex items-center justify-end gap-1 font-mono text-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{job.client?.rating || "4.95"}</span>
                    </div>
                    <div className="text-slate-400 text-[10px]">Client Rating</div>
                  </div>
                  <div className="h-6 w-px bg-white/[0.08]" />
                  <div className="text-right">
                    <div className="text-indigo-300 font-mono text-sm">{job.client?.hireRate || "88%"}</div>
                    <div className="text-slate-400 text-[10px]">Hire Rate</div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">
                  Project Description
                </h4>
                <div className="text-sm text-slate-300 leading-relaxed bg-[#161F30]/60 p-4 rounded-2xl border border-white/[0.06]">
                  <p className="whitespace-pre-line">{job.description}</p>
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">
                  Required Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-lg bg-[#161F30] text-slate-200 border border-white/[0.07] text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/[0.08] pt-6">
                
                {/* Auth notice if not logged in */}
                {!currentUser && (
                  <div className="mb-6 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                      <div className="text-xs text-slate-300">
                        <strong className="text-white block mb-0.5">Ready to submit your proposal?</strong>
                        Sign in or click Quick Login to test proposal submission.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => quickDemoLogin("freelancer")}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 transition-colors"
                    >
                      Quick Login
                    </button>
                  </div>
                )}

                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-heading">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  <span>Submit Proposal</span>
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Bid & Delivery Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Proposed Bid ($ USD)
                      </label>
                      <div className="relative">
                        <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="number"
                          required
                          min="1"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#161F30] border border-white/[0.08] text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Client budget: ${job.budget} ({job.budgetType})
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Estimated Delivery Time
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          placeholder="e.g. 2 to 3 weeks"
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#161F30] border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cover letter */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Cover Letter
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Explain your approach, past similar projects, and how you will deliver results..."
                      className="w-full p-3.5 rounded-xl bg-[#161F30] border border-white/[0.08] text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 leading-relaxed font-sans"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] text-sm font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? "Sending..." : "Submit Proposal"}</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
