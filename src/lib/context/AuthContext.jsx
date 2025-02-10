"use client";

import { useLoading } from "@/features/loadingBar/context/loadingContext";
import useAuthStore from "@/lib/store/authStore";
import useUserStore from "@/lib/store/userStore";
import { getProfile, logoutSession } from "@/lib/queries/auth";
import { createContext, useEffect, useContext } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { setIsAuthenticated, isAuthenticated, setIsAdmin } = useAuthStore();
  const { setUser, user } = useUserStore();
  const { isLoading, startLoading, finishLoading } = useLoading();

  const checkAuth = async () => {
    startLoading();
    try {
      const response = await getProfile();

      if (response.error) {
        throw new Error(response.message);
      } else {
        response.roles.forEach((role) => {
          if (role.name === "admin") {
            setIsAdmin(true);
          }
        });
        setUser(response);
      }
    } catch (error) {
      setIsAuthenticated(false);
      await logoutSession();
    } finally {
      finishLoading();
    }
  };

  useEffect(() => {
    if ((isAuthenticated && !isLoading) || (!user && isAuthenticated)) {
      console.log("Ejecutando checkAuth()");
      checkAuth();
    }
  }, [isAuthenticated, user]);

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
