"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useToast } from "./useToast";
import Toast from "./Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastData = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toastContainer = (
    <div
      className="fixed z-[9999] right-8 flex flex-col-reverse gap-2 max-h-[80vh] overflow-y-auto"
      style={{ top: "6rem" }}
    >
      {toastData.toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => toastData.removeToast(toast.id)}
        />
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={toastData}>
      {children}
      {isMounted ? createPortal(toastContainer, document.body) : null}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
