"use client";

import { useState } from "react";
import MainButton from "@/components/ui/buttons/MainButton";
import HamburgerButton from "@/components/ui/buttons/HamburgerButton";
import Logo from "@/components/ui/icons/Logo";
import LanguageChange from "@/components/ui/locale/LanguageChange";
import { useTranslations } from "next-intl";
import AuthSelector from "@/components/auth/AuthSelector";
import { Link } from "@/i18n/routing";
import ResoursesDropdown from "@/components/ui/dropdowns/ResoursesDropdown";
import useAuthStore from "@/lib/store/authStore";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [showNav, setShowNav] = useState(false);
  const { isAuthenticated, isAdmin } = useAuthStore();

  const toggleNavbar = () => {
    setShowNav(!showNav);
  };

  const hideNavbar = () => {
    setShowNav(false);
  };

  return (
    <header className="bg-white shadow-xl fixed top-0 z-50 w-full py-2 px-4">
      <nav className="w-full max-w-[1440px] mx-auto flex justify-between items-center">
        <Link className="z-50 text-gradient" href="/#">
          <Logo size="sm" />
        </Link>
        <HamburgerButton handleClick={toggleNavbar} />
        <ul
          className={`bg-white h-[100vh] w-full absolute top-0 left-0 flex flex-col items-center justify-center gap-6 transform transition-transform duration-500 ease-in-out ${
            showNav ? "translate-x-0" : "translate-x-[100%]"
          } lg:relative lg:w-auto lg:bg-transparent lg:h-auto lg:flex-row lg:justify-end lg:gap-8 lg:translate-x-0 `}
        >
          <li onClick={hideNavbar} className="flex items-center">
            <Link href="/#" className="hover:text-secondary hover:font-bold">
              Home
            </Link>
          </li>
          {/* <li onClick={hideNavbar} className="flex items-center">
            <a href="#pricing">{t("Pricing")}</a>
          </li>
          <li onClick={hideNavbar} className="flex items-center">
            <a href="#coaching">{t("Coaching")}</a>
          </li>
          <li onClick={hideNavbar} className="flex items-center">
            <a href="#about">{t("About")}</a>
          </li> */}

          <li onClick={hideNavbar} className="flex items-center">
            <Link
              href="/blog?page=1"
              className="hover:text-secondary hover:font-bold"
            >
              Blog
            </Link>
          </li>
          <li>
            <ResoursesDropdown />
          </li>
          {/* TODO => Remove isAdmin when needs */}
          {isAuthenticated && (
            <li>
              <AuthSelector t={t} />
            </li>
          )}
          <li>
            <LanguageChange />
          </li>
          <li onClick={hideNavbar}>
            <MainButton href="/#contact">{t("BookNow")}</MainButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}
