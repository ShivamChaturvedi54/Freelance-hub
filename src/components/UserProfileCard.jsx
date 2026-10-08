import React, { useState } from "react";
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  Edit3, 
  Save, 
  X,
  MessageSquare
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const UserProfileCard = ({ profileData, isOwnProfile = false, onMessageClick }) => {
  const { updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields
  const [displayName, setDisplayName] = useState(profileData?.displayName || profileData?.name || "");
  const [bio, setBio] = useState(profileData?.bio || "");
  const [hourlyRate, setHourlyRate] = useState(profileData?.hourlyRate || 85);
  const [location, setLocation] = useState(profileData?.location || "San Francisco, CA");
  const [skillsStr, setSkillsStr] = useState((profileData?.skills || []).join(", "));
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const skillsArr = skillsStr.split(",").map(s => s.trim()).filter(Boolean);
      await updateUserProfile({
        displayName,
        bio,
        hourlyRate: Number(hourlyRate),
        location,
        skills: skillsArr
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const currentName = profileData?.displayName || profileData?.name || "Professional Talent";
  const currentBio = profileData?.bio || "Experienced specialist building next-generation digital products.";
  const currentSkills = profileData?.skills || ["React", "JavaScript", "Tailwind CSS"];
  const currentAvatar = profileData?.photoURL || profileData?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(currentName)}`;
  const currentBanner = profileData?.banner || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
      
      {/* Profile Header Hero Card */}
      <div className="rounded-3xl bg-[#131926] overflow-hidden border border-white/[0.08] shadow-card relative">
        
        {/* Banner image with overlay */}
        <div className="h-44 sm:h-56 w-full relative overflow-hidden bg-slate-900">
          <img 
            src={currentBanner} 
            alt="Banner" 
            className="w-full h-full object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131926] via-transparent to-transparent" />
          
          {/* Own Profile Edit Button */}
          {isOwnProfile && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white border border-white/[0.15] text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>
          )}
        </div>

        {/* Profile Details Container */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            
            {/* Avatar & Basic Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <div className="relative">
                <img 
                  src={currentAvatar} 
                  alt={currentName} 
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-[#131926] shadow-xl bg-slate-800" 
                />
                <span 
                  className={`absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full ring-2 ring-[#131926] ${
                    profileData?.online !== false ? "bg-emerald-500" : "bg-slate-500"
                  }`} 
                  title={profileData?.online !== false ? "Online now" : "Offline"}
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                    {currentName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    <Award className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{profileData?.badge || "Top Rated Specialist"}</span>
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-300 mb-2">
                  {profileData?.title || (profileData?.role === "client" ? "Verified Client" : "Senior Software Engineer")}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{profileData?.location || "San Francisco, CA"}</span>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-amber-400 font-medium">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{profileData?.rating || "4.98"} ({profileData?.reviewsCount || "40+"} reviews)</span>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 font-medium">
                    {profileData?.jobSuccess || "99%"} Job Success
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="flex items-center justify-center sm:justify-end gap-3">
              {profileData?.role !== "client" && (
                <div className="px-4 py-2 rounded-xl bg-[#161F30] border border-white/[0.08] text-center">
                  <span className="text-xs text-slate-400 block font-medium">Hourly Rate</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    ${profileData?.hourlyRate || 85}/hr
                  </span>
                </div>
              )}

              {!isOwnProfile && onMessageClick && (
                <button
                  onClick={onMessageClick}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              )}
            </div>
          </div>

          {/* Edit Form Drawer */}
          {isEditing && (
            <form onSubmit={handleSave} className="my-6 p-5 rounded-2xl bg-[#161F30] border border-indigo-500/30 space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 font-heading">
                  <Edit3 className="w-4 h-4 text-indigo-400" />
                  <span>Update Profile Details</span>
                </h4>
                <button type="button" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B0F17] border border-white/[0.1] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B0F17] border border-white/[0.1] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hourly Rate ($/hr)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B0F17] border border-white/[0.1] text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Skills (comma separated)</label>
                  <input
                    type="text"
                    value={skillsStr}
                    onChange={(e) => setSkillsStr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B0F17] border border-white/[0.1] text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B0F17] border border-white/[0.1] text-white text-sm leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          )}

          {/* Bio Section */}
          <div className="pt-4 border-t border-white/[0.07]">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">
              About
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {currentBio}
            </p>
          </div>

          {/* Skills Overview Chips */}
          <div className="pt-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-heading">
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-lg bg-[#161F30] text-slate-200 border border-white/[0.07] text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Portfolio Showcase Grid */}
      {profileData?.portfolio && profileData.portfolio.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight font-heading">
              Portfolio & Selected Work
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {profileData.portfolio.length} projects
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.portfolio.map((project) => (
              <div 
                key={project.id}
                className="rounded-2xl bg-[#131926] overflow-hidden border border-white/[0.08] hover:border-indigo-500/40 shadow-card hover:shadow-card-hover transition-all duration-200 group"
              >
                <div className="h-44 w-full overflow-hidden relative bg-slate-900">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131926] via-transparent to-transparent opacity-70" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white backdrop-blur-md border border-white/[0.1]">
                    {project.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-indigo-300 transition-colors font-heading">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags?.map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-[#161F30] text-slate-400 border border-white/[0.05]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>View Project Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past Reviews & Work History Feed */}
      {profileData?.reviews && profileData.reviews.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight font-heading">
            Verified Client Reviews
          </h2>

          <div className="space-y-4">
            {profileData.reviews.map((rev) => (
              <div 
                key={rev.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#131926] border border-white/[0.08] shadow-card"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-white text-sm font-heading">
                    {rev.projectTitle}
                  </h4>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono text-emerald-400 font-bold">{rev.earnings}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">{rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mb-3 text-amber-400 text-xs">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-mono font-bold">{rev.rating}</span>
                  <span className="text-slate-400 ml-1">by {rev.clientName}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
