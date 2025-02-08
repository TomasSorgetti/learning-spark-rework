"use client";

import { useLoading } from "@/features/loadingBar/context/loadingContext";
import useAuthStore from "@/lib/store/authStore";
import { getProfile } from "@/queries/auth";
import { createContext, useEffect, useContext } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { setUser, setIsAuthenticated } = useAuthStore();
  const { startLoading, finishLoading } = useLoading();

  const checkAuth = async () => {
    startLoading();
    try {
      const response = await getProfile();
      console.log("RESPONSE:", response);

      if (response.error) {
        setIsAuthenticated(false);
      } else {
        setUser(response);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      finishLoading();
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

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
