import React, { createContext, useContext, useEffect, useState } from "react";

// ─── Demo Auth System ────────────────────────────────────────────────────────
// Replaces Firebase auth with a fully local demo system.
// Credentials are stored in localStorage. No external services needed.
// ─────────────────────────────────────────────────────────────────────────────

export interface InvestorProfile {
  fullName: string;
  age: number;
  occupation: string;
  annualIncome: string;
  experience: string;
  goal: string;
  horizon: string;
  capacity: number;
  riskAppetite: string;
}

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
} | null;

interface AuthContextType {
  user: AuthUser;
  loading: boolean;
  onboarded: boolean;
  profile: InvestorProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  submitOnboarding: (profileData: InvestorProfile) => Promise<void>;
  updateProfileData: (profileData: InvestorProfile) => Promise<void>;
  resendVerification: () => Promise<void>;
  reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple hash to generate a deterministic uid from email
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return "demo_" + Math.abs(hash).toString(36);
}

interface StoredUser {
  uid: string;
  email: string;
  displayName: string;
  password: string;
}

const USERS_STORAGE_KEY = "dhani_demo_users";
const SESSION_KEY = "dhani_demo_session";

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY) || localStorage.getItem("nidhi_demo_users");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [profile, setProfile] = useState<InvestorProfile | null>(null);
  const [onboarded, setOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    try {
      const sessionRaw = localStorage.getItem(SESSION_KEY) || localStorage.getItem("nidhi_demo_session");
      if (sessionRaw) {
        const sessionUser: AuthUser = JSON.parse(sessionRaw);
        if (sessionUser) {
          setUser(sessionUser);
          // Load profile
          const storedProfile = localStorage.getItem(`dhani_profile_${sessionUser.uid}`) || localStorage.getItem(`nidhi_profile_${sessionUser.uid}`);
          if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
            setOnboarded(true);
          }
        }
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const users = getStoredUsers();
      const found = users.find(u => u.email === email.toLowerCase().trim());
      
      if (!found) {
        throw { code: "auth/user-not-found", message: "No account found with this email. Please sign up first." };
      }
      if (found.password !== password) {
        throw { code: "auth/wrong-password", message: "Incorrect password. Please try again." };
      }

      const authUser: AuthUser = {
        uid: found.uid,
        email: found.email,
        displayName: found.displayName,
        emailVerified: true, // Always verified in demo mode
      };

      setUser(authUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));

      // Load profile
      const storedProfile = localStorage.getItem(`dhani_profile_${found.uid}`) || localStorage.getItem(`nidhi_profile_${found.uid}`);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
        setOnboarded(true);
      } else {
        setProfile(null);
        setOnboarded(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const users = getStoredUsers();
      const normalizedEmail = email.toLowerCase().trim();
      
      if (users.find(u => u.email === normalizedEmail)) {
        throw { code: "auth/email-already-in-use", message: "This email is already registered. Please log in." };
      }

      if (password.length < 6) {
        throw { code: "auth/weak-password", message: "Password must be at least 6 characters." };
      }

      const uid = simpleHash(normalizedEmail);
      const newUser: StoredUser = {
        uid,
        email: normalizedEmail,
        displayName: name,
        password,
      };

      users.push(newUser);
      saveStoredUsers(users);

      const authUser: AuthUser = {
        uid,
        email: normalizedEmail,
        displayName: name,
        emailVerified: true, // Auto-verified in demo mode
      };

      setUser(authUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
      setProfile(null);
      setOnboarded(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
      setProfile(null);
      setOnboarded(false);
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    // No-op in demo mode — email is always verified
    console.log("[Demo Auth] resendVerification called — no-op in demo mode");
  };

  const reloadUser = async () => {
    // No-op in demo mode — user state is already current
    console.log("[Demo Auth] reloadUser called — no-op in demo mode");
  };

  const submitOnboarding = async (profileData: InvestorProfile) => {
    if (!user) return;
    localStorage.setItem(`dhani_profile_${user.uid}`, JSON.stringify(profileData));
    setProfile(profileData);
    setOnboarded(true);
  };

  const updateProfileData = async (profileData: InvestorProfile) => {
    if (!user) return;
    localStorage.setItem(`dhani_profile_${user.uid}`, JSON.stringify(profileData));
    setProfile(profileData);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        onboarded, 
        profile, 
        login, 
        signup, 
        logout, 
        submitOnboarding, 
        updateProfileData,
        resendVerification,
        reloadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
