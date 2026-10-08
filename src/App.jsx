import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { JobProvider, useJobs } from "./context/JobContext";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { PricingSection } from "./components/PricingSection";
import { HowItWorks } from "./components/HowItWorks";
import { AuthModal } from "./components/AuthModal";
import { PostJobModal } from "./components/PostJobModal";
import { ProposalModal } from "./components/ProposalModal";
import { UserProfileCard } from "./components/UserProfileCard";
import { ContactSection } from "./components/ContactSection";
import { FAQSection } from "./components/FAQSection";
import { MessagesDrawer } from "./components/MessagesDrawer";
import { AIChatbot } from "./components/AIChatbot";
import { 
  Briefcase, 
  Search, 
  Plus, 
  ArrowRight,
  Sparkles,
  Users,
  ShieldCheck,
  X
} from "lucide-react";

// Main App Single-Page Container
const MainApp = () => {
  const { currentUser, userProfile } = useAuth();
  const { filteredJobs, searchQuery, setSearchQuery } = useJobs();

  // Modals & Drawers
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [authDefaultRole, setAuthDefaultRole] = useState("freelancer");
  
  const [postJobModalOpen, setPostJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // for ProposalModal
  const [viewingProfile, setViewingProfile] = useState(null); // for viewing profile modal
  const [messagesOpen, setMessagesOpen] = useState(false);

  const handleOpenAuth = (mode = "signup", roleChoice = "freelancer") => {
    setAuthMode(mode);
    setAuthDefaultRole(roleChoice);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col relative selection:bg-indigo-600 selection:text-white">
      {/* Global Animated Ambient Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Architectural subtle grid */}
        <div className="absolute inset-0 bg-grid-mask opacity-75" />
        {/* Floating ambient orb 1 */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/[0.14] blur-[130px] anim-float-1" />
        {/* Floating ambient orb 2 */}
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full bg-emerald-500/[0.09] blur-[150px] anim-float-2" />
        {/* Floating ambient orb 3 */}
        <div className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] rounded-full bg-indigo-500/[0.1] blur-[140px] anim-float-3" />
      </div>

      {/* Minimal Top Navbar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenMessages={() => setMessagesOpen(true)}
        onOpenProfile={() => setViewingProfile(userProfile || currentUser)}
        onOpenPostJob={() => setPostJobModalOpen(true)}
      />

      {/* Main Unified Single Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-16">
        
        {/* SECTION 1: HERO SECTION */}
        <section id="hero">
          <HeroBanner onPostJobClick={() => setPostJobModalOpen(true)} />
        </section>

        {/* SECTION 2: PLANS & PRICING */}
        <section id="pricing" className="pt-8 border-t border-white/[0.08]">
          <PricingSection onSelectPlan={() => handleOpenAuth("signup", "client")} />
        </section>

        {/* SECTION 3: HOW IT WORKS & ESCROW PROTECTION */}
        <section id="how-it-works" className="pt-8 border-t border-white/[0.08]">
          <HowItWorks />
        </section>

        {/* SECTION 5: CONTACT SECTION */}
        <section id="contact" className="pt-8 border-t border-white/[0.08]">
          <ContactSection />
        </section>

        {/* SECTION 6: FAQ SECTION */}
        <section id="faq" className="pt-8 border-t border-white/[0.08]">
          <FAQSection />
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#070b13] py-10 mt-16 text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white font-heading">Freelance<span className="text-indigo-400">Hub</span></span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-md">
            A trusted freelance marketplace connecting innovative teams with experienced engineers, designers, and specialists worldwide.
          </p>
          <div className="pt-4 border-t border-white/[0.06] w-full text-center text-[11px] text-slate-500">
            <span>© {new Date().getFullYear()} FreelanceHub Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        defaultRole={authDefaultRole}
      />

      <PostJobModal
        isOpen={postJobModalOpen}
        onClose={() => setPostJobModalOpen(false)}
      />

      <ProposalModal
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
        onOpenAuth={handleOpenAuth}
      />

      {/* Profile Modal View when a profile is selected */}
      {viewingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
            onClick={() => setViewingProfile(null)}
          />
          <div className="relative w-full max-w-4xl z-10 max-h-[90vh] overflow-y-auto rounded-3xl">
            <button
              onClick={() => setViewingProfile(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <UserProfileCard
              profileData={viewingProfile}
              isOwnProfile={viewingProfile?.uid === currentUser?.uid}
              onMessageClick={() => {
                setViewingProfile(null);
                setMessagesOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Floating AI Chatbot in Bottom Right Corner */}
      <AIChatbot />

      <MessagesDrawer
        isOpen={messagesOpen}
        onClose={() => setMessagesOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <MainApp />
      </JobProvider>
    </AuthProvider>
  );
}
