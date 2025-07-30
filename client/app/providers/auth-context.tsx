import { publicRoutes } from "@/lib";
import { extractApiError, fetchData } from "@/lib/axios";
import type { AuthResponse, AuthUser, MeResponse } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: AuthResponse, redirectTo?: string) => void;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const isPublicRoute = publicRoutes.includes(currentPath);

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string | null>(null); // ⬅️ track post-login redirect

  const login = (data: AuthResponse, redirectTo?: string) => {
    if (!data.data) {
      toast.error("User data not found in auth response");
      console.error("No user data received from auth response");
      return;
    }

    setUser(data.data.user);
    setIsAuthenticated(true);
    localStorage.setItem("token", data.data.user.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    if (redirectTo) setRedirectPath(redirectTo); // ⬅️ schedule redirect after auth state sets
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/secret/login");
  };

  const updateUser = (newUser: AuthUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // 🚀 Hydrate from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        logout();
      }
    }
  }, []);

  // 🔒 Validate token unless on public route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isPublicRoute) {
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetchData<MeResponse>("/auth/me");
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (err) {
        console.error(extractApiError(err));
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [currentPath]);

  // 🔁 Post-login redirect handler
  useEffect(() => {
    if (isAuthenticated && redirectPath) {
      navigate(redirectPath);
      setRedirectPath(null); // reset after navigation
    }
  }, [isAuthenticated, redirectPath]);

  // 🧯 Forced logout event
  useEffect(() => {
    const handleForceLogout = () => logout();
    window.addEventListener("force-logout", handleForceLogout);
    return () => window.removeEventListener("force-logout", handleForceLogout);
  }, []);

  // 🚧 Guard private routes
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      navigate("/secret/login");
    }
  }, [isAuthenticated, isLoading, currentPath]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
