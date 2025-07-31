import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  name?: string;
  phone?: string;
  user_metadata?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => void;
  signOut: () => Promise<void>;
  requireAuth: (action: () => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "${import.meta.env.VITE_API_BASE_URL}";

  // ✅ Get user from token
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setUser(null);
          localStorage.removeItem("token");
          return;
        }

        setUser(data.user || null);
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [API_BASE]);

  // ✅ Login
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Save token
      localStorage.setItem("token", data.token);

      // ✅ Fetch user info using token
      const userRes = await fetch(`${API_BASE}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const userData = await userRes.json();

      if (!userRes.ok) throw new Error(userData.message || "Failed to fetch user");

      setUser(userData.user);

      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
      });

      navigate("/");
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Signup
  const signUp = async (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, phone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      toast({
        title: "Account created!",
        description: "You can now log in.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Try again later.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Auth
  const signInWithGoogle = () => {
    window.location.href = `${API_BASE}/auth/google`;
  };

  // ✅ Logout
  const signOut = async () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      toast({
        title: "Signed out",
        description: "You have been logged out.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "Try again.",
        variant: "destructive",
      });
    }
  };

  // ✅ Protected actions
  const requireAuth = (action: () => void) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "You must be signed in to perform this action.",
        variant: "destructive",
      });
      navigate("/auth");
    } else {
      action();
    }
  };

  const isAuthenticated = !!user && !loading;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
