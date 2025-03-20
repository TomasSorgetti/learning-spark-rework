"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/lib/store/authStore";
import { useLoading } from "@/features/loadingBar/context/loadingContext";
import { useRouter } from "@/i18n/routing";

export default function GuestGuard({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  const { isLoading, startLoading, finishLoading } = useLoading();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    startLoading();
    setIsHydrated(true);
    if (isHydrated && isAuthenticated) {
      router.replace(`/`);
    }
    finishLoading();
  }, [isAuthenticated, isHydrated]);

  if (isAuthenticated || !isHydrated || isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}
