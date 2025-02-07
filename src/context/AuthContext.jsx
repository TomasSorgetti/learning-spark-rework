"use client";

import { useLoading } from "@/features/loadingBar/context/loadingContext";
import { getProfile } from "@/queries/auth";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const { isLoading, startLoading, finishLoading } = useLoading();

  const checkAuth = async () => {
    try {
      startLoading();
      const response = await getProfile();
      console.log(response);

      if (response.error) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setUser(response);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      finishLoading();
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isLoading && isAuthenticated) {
      checkAuth();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
