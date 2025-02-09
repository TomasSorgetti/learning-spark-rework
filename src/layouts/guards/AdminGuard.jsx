"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/lib/store/authStore";

export default function AdminGuard({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const { isAdmin } = useAuthStore();

  useEffect(() => {
    setIsHydrated(true);

    if (isHydrated && !isAdmin) {
      router.replace("/auth/login");
    }
  }, [isAdmin, isHydrated]);

  if (!isAdmin) return null;

  return <>{children}</>;
}
