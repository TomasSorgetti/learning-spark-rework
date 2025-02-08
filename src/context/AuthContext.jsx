"use client";

import { useLoading } from "@/features/loadingBar/context/loadingContext";
import useAuthStore from "@/lib/store/authStore";
import useUserStore from "@/lib/store/userStore";
import { getProfile } from "@/queries/auth";
import { createContext, useEffect, useContext } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { setIsAuthenticated, isAuthenticated } = useAuthStore();
  const { setUser, setIsAdmin } = useUserStore();
  const { isLoading, startLoading, finishLoading } = useLoading();

  const checkAuth = async () => {
    startLoading();
    try {
      const response = await getProfile();

      if (response.error) {
        setIsAuthenticated(false);
      } else {
        setUser(response);
        response.roles.forEach((role) => {
          if (role.name === "admin") {
            setIsAdmin(true);
          }
        });
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      finishLoading();
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      checkAuth();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
