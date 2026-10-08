import React, { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  db,
  googleProvider,
  isFirebaseConfigured,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "../firebase/firebase";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Storage key for local persistence in demo/offline mode
const LOCAL_STORAGE_USER_KEY = "freelancehub_current_user";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to fetch or initialize Firestore user profile
  const fetchUserProfile = async (uid, defaultData = {}) => {
    try {
      if (isFirebaseConfigured) {
        const userDocRef = doc(db, "users", uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const profileData = userSnap.data();
          setUserProfile(profileData);
          return profileData;
        } else if (defaultData && Object.keys(defaultData).length > 0) {
          // Initialize user in Firestore if not existing
          const initialProfile = {
            uid,
            email: defaultData.email || "",
            displayName: defaultData.displayName || "FreelanceHub User",
            photoURL: defaultData.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uid}`,
            role: defaultData.role || "freelancer",
            bio: defaultData.bio || (defaultData.role === "client" ? "Verified Project Manager & Tech Founder" : "Passionate Full-Stack Developer"),
            hourlyRate: defaultData.hourlyRate || 75,
            skills: defaultData.skills || ["React", "JavaScript", "Tailwind CSS"],
            location: defaultData.location || "Remote / Global",
            createdAt: serverTimestamp()
          };
          await setDoc(userDocRef, initialProfile, { merge: true });
          setUserProfile(initialProfile);
          return initialProfile;
        }
      } else {
        // Fallback local storage profile for demo mode
        const saved = localStorage.getItem(`profile_${uid}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          setUserProfile(parsed);
          return parsed;
        } else {
          const fallbackProfile = {
            uid,
            email: defaultData.email || "demo@freelancehub.io",
            displayName: defaultData.displayName || "Alex Vance",
            photoURL: defaultData.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
            role: defaultData.role || "freelancer",
            bio: defaultData.bio || "Senior React & Full-Stack Engineer creating high-converting digital solutions.",
            hourlyRate: defaultData.hourlyRate || 85,
            skills: defaultData.skills || ["React", "Tailwind CSS", "Next.js", "Firebase", "Node.js"],
            location: defaultData.location || "San Francisco, CA",
            createdAt: new Date().toISOString()
          };
          localStorage.setItem(`profile_${uid}`, JSON.stringify(fallbackProfile));
          setUserProfile(fallbackProfile);
          return fallbackProfile;
        }
      }
    } catch (err) {
      console.warn("Could not retrieve Firestore profile, using local fallback:", err);
      // Fallback object so UI does not freeze
      const fallback = {
        uid,
        email: defaultData.email || "",
        displayName: defaultData.displayName || "FreelanceHub User",
        photoURL: defaultData.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uid}`,
        role: defaultData.role || "freelancer",
        bio: "Senior Digital Professional",
        hourlyRate: 80,
        skills: ["React", "TypeScript", "Tailwind CSS"],
        location: "United States",
        createdAt: new Date().toISOString()
      };
      setUserProfile(fallback);
      return fallback;
    }
  };

  // Auth state listener
  useEffect(() => {
    let unsubscribe = () => {};

    if (isFirebaseConfigured) {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setCurrentUser(firebaseUser);
        if (firebaseUser) {
          await fetchUserProfile(firebaseUser.uid, {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
          });
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      });
    } else {
      // Check demo persistence
      const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setCurrentUser(parsed);
          fetchUserProfile(parsed.uid, parsed);
        } catch {
          setCurrentUser(null);
          setUserProfile(null);
        }
      }
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  // 1. Signup with Email and Password
  const signupWithEmail = async (email, password, displayName, role = "freelancer") => {
    setError(null);
    try {
      if (isFirebaseConfigured) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName || email)}`;
        await updateProfile(user, {
          displayName,
          photoURL: defaultAvatar
        });

        const newProfileData = {
          uid: user.uid,
          email: user.email,
          displayName,
          photoURL: defaultAvatar,
          role,
          bio: role === "client" ? "Looking for world-class talent to scale ambitious ideas." : "Passionate professional dedicated to delivering excellence.",
          hourlyRate: role === "freelancer" ? 65 : 0,
          skills: role === "freelancer" ? ["React", "JavaScript", "Tailwind CSS"] : [],
          location: "Global",
          createdAt: serverTimestamp()
        };

        await setDoc(doc(db, "users", user.uid), newProfileData);
        setUserProfile(newProfileData);
        return user;
      } else {
        // Demo mode implementation
        const demoUid = `demo-${Date.now()}`;
        const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName || email)}`;
        const demoUser = {
          uid: demoUid,
          email,
          displayName,
          photoURL: defaultAvatar,
          role
        };
        const demoProfile = {
          ...demoUser,
          bio: role === "client" ? "Verified client seeking top tech talent for high-impact projects." : "Creative engineer focused on robust web applications.",
          hourlyRate: role === "freelancer" ? 75 : 0,
          skills: role === "freelancer" ? ["React", "Tailwind CSS", "JavaScript"] : [],
          location: "San Francisco, CA",
          createdAt: new Date().toISOString()
        };

        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(demoUser));
        localStorage.setItem(`profile_${demoUid}`, JSON.stringify(demoProfile));
        setCurrentUser(demoUser);
        setUserProfile(demoProfile);
        return demoUser;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 2. Login with Email and Password
  const loginWithEmail = async (email, password) => {
    setError(null);
    try {
      if (isFirebaseConfigured) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } else {
        // Demo mode login
        const demoUser = {
          uid: "demo-user-1",
          email,
          displayName: email.split("@")[0],
          photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
          role: "freelancer"
        };
        const demoProfile = {
          ...demoUser,
          bio: "Senior Software Developer & UI/UX Specialist",
          hourlyRate: 85,
          skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
          location: "Austin, TX",
          createdAt: new Date().toISOString()
        };

        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(demoUser));
        localStorage.setItem(`profile_${demoUser.uid}`, JSON.stringify(demoProfile));
        setCurrentUser(demoUser);
        setUserProfile(demoProfile);
        return demoUser;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 3. Google OAuth Provider
  const loginWithGoogle = async (selectedRole = "freelancer") => {
    setError(null);
    try {
      if (isFirebaseConfigured) {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        // Check if profile exists, if not initialize with selected role
        const userDocRef = doc(db, "users", user.uid);
        const snap = await getDoc(userDocRef);

        if (!snap.exists()) {
          const profileData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "Google User",
            photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
            role: selectedRole,
            bio: selectedRole === "client" ? "Verified Client & Tech Founder" : "Specialized Full-Stack Developer",
            hourlyRate: selectedRole === "freelancer" ? 75 : 0,
            skills: ["React", "TypeScript", "Tailwind CSS"],
            location: "United States",
            createdAt: serverTimestamp()
          };
          await setDoc(userDocRef, profileData);
          setUserProfile(profileData);
        } else {
          setUserProfile(snap.data());
        }

        return user;
      } else {
        // Simulated Google One-Click Auth for instant live testing
        const googleUser = {
          uid: "google-demo-user",
          email: "alex.demo@gmail.com",
          displayName: "Alex Rivera",
          photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
          role: selectedRole
        };
        const googleProfile = {
          ...googleUser,
          bio: selectedRole === "client" 
            ? "VP of Engineering at Aetherial Labs. Hiring elite talent for DeFi & AI scale."
            : "Senior Web3 & React Architect with 7+ years building enterprise applications.",
          hourlyRate: selectedRole === "freelancer" ? 95 : 0,
          skills: selectedRole === "freelancer" ? ["React", "Tailwind CSS", "TypeScript", "Node.js", "Web3.js"] : [],
          location: "San Francisco, CA",
          createdAt: new Date().toISOString()
        };

        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(googleUser));
        localStorage.setItem(`profile_${googleUser.uid}`, JSON.stringify(googleProfile));
        setCurrentUser(googleUser);
        setUserProfile(googleProfile);
        return googleUser;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 4. Quick Demo Switcher (Instant Client / Instant Freelancer for testing)
  const quickDemoLogin = (role = "freelancer") => {
    const isClient = role === "client";
    const demoUser = {
      uid: isClient ? "demo-client-123" : "demo-freelancer-456",
      email: isClient ? "client@freelancehub.io" : "alex.rivera@freelancehub.io",
      displayName: isClient ? "Sarah Jenkins (Acme AI)" : "Alex Rivera",
      photoURL: isClient 
        ? "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      role
    };

    const demoProfile = {
      ...demoUser,
      bio: isClient 
        ? "Founder & Product Lead at Acme AI. Fast payments, crystal-clear specs, and eager to partner with top 1% talent."
        : "Ex-Meta senior engineer crafting bulletproof decentralized web apps, ultra-responsive dashboards, and high-conversion SaaS products.",
      hourlyRate: isClient ? 0 : 85,
      skills: isClient ? [] : ["React", "TypeScript", "Tailwind CSS", "Next.js", "Node.js", "Firebase", "Wagmi"],
      location: isClient ? "New York, NY" : "San Francisco, CA",
      createdAt: new Date().toISOString(),
      stats: isClient 
        ? { spent: "$125,000+", jobsPosted: 18, hireRate: "92%" }
        : { rating: 4.98, completedProjects: 47, earnings: "$240k+" }
    };

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(demoUser));
    localStorage.setItem(`profile_${demoUser.uid}`, JSON.stringify(demoProfile));
    setCurrentUser(demoUser);
    setUserProfile(demoProfile);
    return demoUser;
  };

  // 5. Update Profile
  const updateUserProfile = async (updatedFields) => {
    if (!currentUser) return;
    try {
      if (isFirebaseConfigured) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, updatedFields, { merge: true });
        setUserProfile(prev => ({ ...prev, ...updatedFields }));
      } else {
        const existing = userProfile || {};
        const updated = { ...existing, ...updatedFields };
        localStorage.setItem(`profile_${currentUser.uid}`, JSON.stringify(updated));
        setUserProfile(updated);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
    }
  };

  // 6. Sign Out
  const logout = async () => {
    try {
      if (isFirebaseConfigured) {
        await firebaseSignOut(auth);
      }
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      setCurrentUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  // Helper toggle between client/freelancer for testing user perspective
  const toggleRole = async () => {
    if (!userProfile) return;
    const nextRole = userProfile.role === "client" ? "freelancer" : "client";
    await updateUserProfile({ role: nextRole });
  };

  const value = {
    currentUser,
    userProfile,
    role: userProfile?.role || currentUser?.role || "freelancer",
    isFirebaseConfigured,
    loading,
    error,
    signupWithEmail,
    loginWithEmail,
    loginWithGoogle,
    quickDemoLogin,
    updateUserProfile,
    toggleRole,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
