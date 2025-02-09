"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/lib/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useLoading } from "@/features/loadingBar/context/loadingContext";

export default function AuthGuard({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1];

  const { startLoading, finishLoading } = useLoading();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    startLoading();
    setIsHydrated(true);
    if (isHydrated && !isAuthenticated) {
      router.push(`/${locale}/auth/login`);
    }
    finishLoading();
  }, [isAuthenticated, isHydrated]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
