import React, { useState } from "react";
import { 
  Briefcase, 
  FileText, 
  DollarSign, 
  Users, 
  Plus, 
  CheckCircle2, 
  MessageSquare
} from "lucide-react";
import { useJobs } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";

export const ClientDashboard = ({ onOpenPostJob, onSelectJob, onOpenMessages }) => {
  const { jobs, proposals } = useJobs();
  const { userProfile, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("listings"); // 'listings' | 'proposals'

  // Filter client's jobs
  const clientJobs = jobs.filter(
    (j) => j.client?.name === (userProfile?.displayName || currentUser?.displayName) || j.isFeatured
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      
      {/* Top Welcome & KPI Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111724] p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-card">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Client Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Welcome back, {userProfile?.displayName || currentUser?.displayName || "Partner"}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your project openings, review talent proposals, and initiate milestone contracts.
          </p>
        </div>

        <button
          onClick={onOpenPostJob}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Project</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#131926] border border-white/[0.08] shadow-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Active Listings</span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{clientJobs.length}</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-medium">Open in marketplace</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#131926] border border-white/[0.08] shadow-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Proposals Received</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {clientJobs.reduce((acc, curr) => acc + (curr.proposalsCount || 0), 0) + proposals.length}
          </div>
          <div className="text-[11px] text-cyan-400 mt-1 font-medium">Qualified candidates</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#131926] border border-white/[0.08] shadow-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Hire Rate</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">92%</div>
          <div className="text-[11px] text-amber-400 mt-1 font-medium">Verified client status</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#131926] border border-white/[0.08] shadow-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Funded Escrow</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">$12,450</div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">Protected milestones</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab("listings")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "listings"
              ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-heading"
              : "text-slate-400 hover:text-white"
          }`}
        >
          My Project Openings ({clientJobs.length})
        </button>

        <button
          onClick={() => setActiveTab("proposals")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "proposals"
              ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-heading"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Candidate Proposals ({proposals.length > 0 ? proposals.length : 3})
        </button>
      </div>

      {/* Tab 1: Listings */}
      {activeTab === "listings" && (
        <div className="space-y-4">
          {clientJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-[#131926] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-500/30 transition-all shadow-card"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Open
                  </span>
                  <span>{job.category}</span>
                  <span>•</span>
                  <span>Posted {job.postedAt}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-heading">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <span className="font-mono text-emerald-400 font-semibold">
                    ${job.budget} ({job.budgetType})
                  </span>
                  <span className="text-slate-600">•</span>
                  <span>{job.experienceLevel} Level</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-indigo-300 font-medium">
                    {job.proposalsCount || 0} Proposals
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectJob(job)}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold border border-white/[0.08] transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => setActiveTab("proposals")}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  Review Bids
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Proposals */}
      {activeTab === "proposals" && (
        <div className="space-y-4">
          {proposals.length === 0 ? (
            <div className="p-8 text-center bg-[#131926] rounded-2xl border border-white/[0.08]">
              <FileText className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1 font-heading">No proposals submitted yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                Switch role to Freelancer using the top navigation bar to test submitting a proposal to any job.
              </p>
            </div>
          ) : (
            proposals.map((prop) => (
              <div
                key={prop.id}
                className="p-6 rounded-2xl bg-[#131926] border border-white/[0.08] space-y-4 shadow-card"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={prop.freelancerAvatar}
                      alt={prop.freelancerName}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm font-heading">{prop.freelancerName}</h4>
                      <p className="text-xs text-indigo-300 font-medium">Applied for: {prop.jobTitle}</p>
                      <span className="text-[10px] text-slate-400">Delivery in {prop.deliveryTime}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-400 font-mono">
                      ${prop.bidAmount}
                    </div>
                    <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Pending Review
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/[0.06] text-xs text-slate-300 leading-relaxed font-sans">
                  <p className="whitespace-pre-line">{prop.coverLetter}</p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button 
                    onClick={onOpenMessages}
                    className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/[0.08]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accept Proposal</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
