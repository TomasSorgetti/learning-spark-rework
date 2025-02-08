"use client";

import { useLoading } from "@/features/loadingBar/context/loadingContext";
import useClickOutside from "@/hooks/useClickOutside";
import { Link, useRouter } from "@/i18n/routing";
import useAuthStore from "@/lib/store/authStore";
import useUserStore from "@/lib/store/userStore";
import { logoutSession } from "@/queries/auth";
import Image from "next/image";
import { useRef, useState } from "react";

export default function AuthSelector({ t }) {
  const { locale } = useRouter();
  const { isAuthenticated, cleanAuth } = useAuthStore();
  const { isAdmin } = useUserStore();
  const { startLoading, finishLoading } = useLoading();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    setShowMenu(false);
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useClickOutside(dropdownRef, closeDropdown);

  const handleLogout = async () => {
    try {
      startLoading();
      const response = await logoutSession();
      cleanAuth();
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      finishLoading();
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div
          className="relative flex items-center justify-center"
          ref={dropdownRef}
        >
          <button onClick={toggleMenu}>
            <Image
              src="/icons/authIcon.svg"
              alt="auth icon"
              width={36}
              height={36}
              draggable="false"
              loading="lazy"
            />
          </button>
          <ul
            className={`absolute top-16 right-0 bg-white py-4 px-6 flex flex-col gap-2 rounded-[8px] shadow-lg ${
              showMenu ? "block" : "hidden"
            }`}
          >
            {isAdmin && (
              <li className="flex items-center">
                <Link
                  href="/admin"
                  locale={locale}
                  className="hover:text-secondary hover:font-bold"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="flex items-center">
              <Link
                href="/profile"
                locale={locale}
                className="hover:text-secondary hover:font-bold"
              >
                Profile
              </Link>
            </li>
            <li className="flex items-center">
              <button
                className="hover:text-secondary hover:font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link
          href="/auth/login"
          locale={locale}
          className="hover:text-secondary hover:font-bold"
        >
          Sign in
        </Link>
      )}
    </>
  );
}
