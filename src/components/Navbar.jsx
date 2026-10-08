import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  Home, 
  Layers, 
  MessageSquare, 
  User, 
  LogOut, 
  ChevronDown, 
  ArrowRightLeft,
  Menu,
  X,
  Plus,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  CreditCard
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Navbar = ({ 
  onOpenAuth, 
  onOpenProfile,
  onOpenPostJob
}) => {
  const { currentUser, userProfile, role, logout, toggleRole } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isClient = role === "client";

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "#hero", label: "Home", icon: Home, desc: "Welcome & overview" },
    { href: "#pricing", label: "Plans", icon: CreditCard, desc: "Pricing & tiers" },
    { href: "#how-it-works", label: "Process", icon: Layers, desc: "Milestones & escrow" },
    { href: "#contact", label: "Contact", icon: MessageSquare, desc: "Direct inquiries & help" },
    { href: "#faq", label: "FAQ", icon: HelpCircle, desc: "Common questions & answers" },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full fh-nav border-b border-white/[0.08] transition-all bg-[#0B0F17]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand / Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href="#hero"
              className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all shrink-0">
                <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 group-hover:scale-105 transition-transform" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent tracking-tight font-heading">
                  Freelance<span className="text-indigo-400 font-extrabold">Hub</span>
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Center: Circular Navigation Capsule (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#131926]/95 border border-white/[0.08] shadow-inner backdrop-blur-md">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all text-xs font-medium group"
                  title={item.label}
                >
                  <div className="w-6 h-6 rounded-full bg-white/[0.06] group-hover:bg-indigo-600 flex items-center justify-center transition-colors shrink-0">
                    <Icon className="w-3.5 h-3.5 text-slate-300 group-hover:text-white" />
                  </div>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Action Bar (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-white/[0.05] transition-all border border-transparent hover:border-white/[0.08] focus:outline-none"
                >
                  <img
                    src={userProfile?.photoURL || currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.uid}`}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <span className="text-xs font-semibold text-slate-200 max-w-[120px] truncate">
                    {userProfile?.displayName || currentUser?.displayName || "My Account"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#131926] py-2 shadow-2xl z-50 border border-white/[0.1] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-white/[0.08]">
                      <p className="text-sm font-semibold text-white truncate font-heading">
                        {userProfile?.displayName || currentUser?.displayName || "FreelanceHub User"}
                      </p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {currentUser?.email}
                      </p>
                      <div className="mt-1.5">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          isClient 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                        }`}>
                          {isClient ? "Client Account" : "Freelancer Account"}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onOpenProfile) onOpenProfile();
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] flex items-center gap-2.5 transition-colors"
                      >
                        <User className="w-4 h-4 text-indigo-400" />
                        <span>View Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          toggleRole();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] flex items-center gap-2.5 transition-colors"
                      >
                        <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                        <span>Switch to {isClient ? "Freelancer" : "Client"} Mode</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-white/[0.08]">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth("signup")}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 shadow-sm transition-all shrink-0"
                >
                  Join
                </button>
              </div>
            )}
          </div>

          {/* Mobile Right Bar: Hamburger Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {currentUser && (
              <button
                onClick={() => onOpenProfile && onOpenProfile()}
                className="p-1 rounded-full ring-2 ring-indigo-500/40"
                title="Profile"
              >
                <img
                  src={userProfile?.photoURL || currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.uid}`}
                  alt="User"
                  className="w-7 h-7 rounded-full object-cover"
                />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-xl bg-[#131926] hover:bg-[#182030] text-slate-200 hover:text-white border border-white/[0.08] transition-colors focus:outline-none shadow-sm"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-slate-200" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Collapsible Sidebar Drawer (Slides in from the right) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Dark Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Right Sliding Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-[84%] max-w-sm bg-[#0E1420] border-l border-white/[0.1] shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250">
            
            {/* Drawer Top Header */}
            <div>
              <div className="p-5 flex items-center justify-between border-b border-white/[0.08] bg-[#111726]/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-[1px] shadow-md">
                    <div className="w-full h-full bg-[#0B0F17] rounded-[11px] flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-indigo-400" />
                    </div>
                  </div>
                  <span className="text-base font-bold text-white font-heading">
                    Freelance<span className="text-indigo-400">Hub</span>
                  </span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Badge (if logged in) */}
              {currentUser ? (
                <div className="p-4 mx-4 mt-4 rounded-2xl bg-[#141B2B] border border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <img
                      src={userProfile?.photoURL || currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.uid}`}
                      alt="User"
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/30 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-white truncate font-heading">
                        {userProfile?.displayName || currentUser?.displayName || "FreelanceHub User"}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {currentUser?.email}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          isClient 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                        }`}>
                          {isClient ? "Client" : "Freelancer"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/[0.06]">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onOpenProfile) onOpenProfile();
                      }}
                      className="py-1.5 px-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[11px] font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => toggleRole()}
                      className="py-1.5 px-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[11px] font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Switch Mode</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 mx-4 mt-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-[#131926] border border-indigo-500/20">
                  <p className="text-xs font-semibold text-indigo-300 font-heading mb-1">
                    Welcome to FreelanceHub
                  </p>
                  <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                    Join verified specialists and hiring clients with escrow protection.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth("login");
                      }}
                      className="py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth("signup");
                      }}
                      className="py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-sm transition-all"
                    >
                      Join Free
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Links with Circular Icons */}
              <div className="p-4 space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 font-mono">
                  Navigation
                </div>
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl text-left hover:bg-white/[0.05] active:bg-white/[0.08] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#161F30] border border-white/[0.08] group-hover:bg-indigo-600 group-hover:border-indigo-500 flex items-center justify-center transition-all shrink-0 shadow-sm">
                          <Icon className="w-4 h-4 text-slate-300 group-hover:text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-200 group-hover:text-white font-heading block">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-5 border-t border-white/[0.08] bg-[#0B0F17]/80 space-y-3">
              {onOpenPostJob && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPostJob();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post a Project</span>
                </button>
              )}

              {currentUser && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 pt-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Escrow Protection Guaranteed</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

