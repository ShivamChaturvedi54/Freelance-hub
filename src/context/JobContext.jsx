import React, { createContext, useContext, useState, useEffect } from "react";
import { SAMPLE_JOBS, SAMPLE_FREELANCERS } from "../data/mockData";
import { db, isFirebaseConfigured, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "../firebase/firebase";
import { useAuth } from "./AuthContext";

const JobContext = createContext(null);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};

const SAVED_JOBS_KEY = "freelancehub_saved_jobs";
const LOCAL_JOBS_KEY = "freelancehub_custom_jobs";
const LOCAL_PROPOSALS_KEY = "freelancehub_proposals";

export const JobProvider = ({ children }) => {
  const { currentUser, userProfile } = useAuth();
  const [jobs, setJobs] = useState(SAMPLE_JOBS);
  const [proposals, setProposals] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [freelancers] = useState(SAMPLE_FREELANCERS);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [budgetType, setBudgetType] = useState("all"); // 'all' | 'fixed' | 'hourly'
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(10000);
  const [selectedExperience, setSelectedExperience] = useState("all"); // 'all' | 'Entry' | 'Intermediate' | 'Expert'
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'budget_high' | 'proposals_low'

  // Load Initial Jobs & Saved items
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      // Load saved bookmarks from localStorage
      const savedBookmarked = localStorage.getItem(SAVED_JOBS_KEY);
      if (savedBookmarked) {
        try {
          setSavedJobIds(JSON.parse(savedBookmarked));
        } catch {
          setSavedJobIds([]);
        }
      }

      // Load proposals
      const savedProposals = localStorage.getItem(LOCAL_PROPOSALS_KEY);
      if (savedProposals) {
        try {
          setProposals(JSON.parse(savedProposals));
        } catch {
          setProposals([]);
        }
      }

      if (isFirebaseConfigured) {
        try {
          const jobsRef = collection(db, "jobs");
          const q = query(jobsRef, orderBy("createdAt", "desc"));
          const snapshot = await getDocs(q);
          const firestoreJobs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          if (firestoreJobs.length > 0) {
            // Merge with mock sample jobs
            setJobs([...firestoreJobs, ...SAMPLE_JOBS]);
          } else {
            setJobs(SAMPLE_JOBS);
          }
        } catch (err) {
          console.warn("Could not query Firestore jobs, using local store:", err);
          loadLocalCustomJobs();
        }
      } else {
        loadLocalCustomJobs();
      }
      setLoading(false);
    };

    const loadLocalCustomJobs = () => {
      const customJobs = localStorage.getItem(LOCAL_JOBS_KEY);
      if (customJobs) {
        try {
          const parsed = JSON.parse(customJobs);
          setJobs([...parsed, ...SAMPLE_JOBS]);
        } catch {
          setJobs(SAMPLE_JOBS);
        }
      } else {
        setJobs(SAMPLE_JOBS);
      }
    };

    loadInitialData();
  }, []);

  // Post a New Job
  const createJob = async (jobData) => {
    const newJob = {
      ...jobData,
      id: `job-${Date.now()}`,
      client: {
        name: userProfile?.displayName || currentUser?.displayName || "Verified Client",
        verified: true,
        spent: userProfile?.stats?.spent || "$12,000+",
        rating: 5.0,
        location: userProfile?.location || "United States",
        hireRate: "90%",
        paymentVerified: true,
        uid: currentUser?.uid || "client-anon"
      },
      proposalsCount: 0,
      postedAt: "Just now",
      createdAt: new Date().toISOString()
    };

    // If Firestore is available, save there too
    if (isFirebaseConfigured) {
      try {
        const docRef = await addDoc(collection(db, "jobs"), {
          ...newJob,
          createdAt: serverTimestamp()
        });
        newJob.id = docRef.id;
      } catch (err) {
        console.error("Firestore addDoc error:", err);
      }
    }

    // Update in-memory & local storage
    const customJobs = JSON.parse(localStorage.getItem(LOCAL_JOBS_KEY) || "[]");
    const updatedCustom = [newJob, ...customJobs];
    localStorage.setItem(LOCAL_JOBS_KEY, JSON.stringify(updatedCustom));

    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  // Submit Proposal
  const submitProposal = async (proposalData) => {
    const newProposal = {
      ...proposalData,
      id: `prop-${Date.now()}`,
      freelancerId: currentUser?.uid || "guest",
      freelancerName: userProfile?.displayName || currentUser?.displayName || "Anonymous Freelancer",
      freelancerAvatar: userProfile?.photoURL || currentUser?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      freelancerRate: userProfile?.hourlyRate || 80,
      submittedAt: new Date().toISOString(),
      status: "pending"
    };

    if (isFirebaseConfigured) {
      try {
        await addDoc(collection(db, "proposals"), {
          ...newProposal,
          submittedAt: serverTimestamp()
        });
      } catch (err) {
        console.error("Firestore proposal write error:", err);
      }
    }

    // Update proposals list
    const existing = JSON.parse(localStorage.getItem(LOCAL_PROPOSALS_KEY) || "[]");
    const updated = [newProposal, ...existing];
    localStorage.setItem(LOCAL_PROPOSALS_KEY, JSON.stringify(updated));
    setProposals(updated);

    // Increment proposalsCount for that job
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === proposalData.jobId
          ? { ...job, proposalsCount: (job.proposalsCount || 0) + 1 }
          : job
      )
    );

    return newProposal;
  };

  // Bookmark toggle
  const toggleSaveJob = (jobId) => {
    setSavedJobIds(prev => {
      let updated;
      if (prev.includes(jobId)) {
        updated = prev.filter(id => id !== jobId);
      } else {
        updated = [...prev, jobId];
      }
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Filtered & Sorted Jobs
  const filteredJobs = jobs.filter(job => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title?.toLowerCase().includes(q);
      const matchDesc = job.description?.toLowerCase().includes(q);
      const matchSkills = job.skills?.some(skill => skill.toLowerCase().includes(q));
      const matchCategory = job.category?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchSkills && !matchCategory) {
        return false;
      }
    }

    // 2. Category
    if (selectedCategory !== "all") {
      const categoryMap = {
        "web-dev": "Web Development",
        "ui-ux": "UI/UX Design",
        "ai-ml": "AI & Machine Learning",
        "mobile-apps": "Mobile Apps",
        "blockchain": "Blockchain & Web3",
        "copywriting": "Copywriting & Content"
      };
      const mapped = categoryMap[selectedCategory] || selectedCategory;
      if (job.category !== mapped && !job.category?.toLowerCase().includes(selectedCategory)) {
        return false;
      }
    }

    // 3. Budget Type
    if (budgetType !== "all" && job.budgetType !== budgetType) {
      return false;
    }

    // 4. Budget Range (Fixed jobs or Hourly rate)
    if (job.budgetType === "fixed" && (job.budget < minBudget || job.budget > maxBudget)) {
      return false;
    }

    // 5. Experience Level
    if (selectedExperience !== "all" && job.experienceLevel?.toLowerCase() !== selectedExperience.toLowerCase()) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "budget_high") {
      return (b.budget || 0) - (a.budget || 0);
    }
    if (sortBy === "proposals_low") {
      return (a.proposalsCount || 0) - (b.proposalsCount || 0);
    }
    // Default newest
    return 0;
  });

  const value = {
    jobs,
    filteredJobs,
    savedJobIds,
    proposals,
    freelancers,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    budgetType,
    setBudgetType,
    minBudget,
    setMinBudget,
    maxBudget,
    setMaxBudget,
    selectedExperience,
    setSelectedExperience,
    sortBy,
    setSortBy,
    createJob,
    submitProposal,
    toggleSaveJob,
    savedJobs: jobs.filter(j => savedJobIds.includes(j.id)),
    myProposals: proposals.filter(p => p.freelancerId === currentUser?.uid)
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
