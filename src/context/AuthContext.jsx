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
      // TODO => manage when server is down and user logout (sessions will not be deleted, but user will not be authenticated)
      await logoutSession().then((res) => {
        if (!res.error) {
          setIsAuthenticated(false);
          setIsAdmin(false);
        } else {
          console.log("Server is down");
        }
      });
    } finally {
      finishLoading();
    }
  };

  useEffect(() => {
    if ((isAuthenticated && !isLoading) || (!user && isAuthenticated)) {
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
