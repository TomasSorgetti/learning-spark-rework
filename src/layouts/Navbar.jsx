"use client";

import { useState } from "react";
import MainButton from "@/components/buttons/MainButton";
import HamburgerButton from "@/components/buttons/HamburgerButton";
import Logo from "@/components/icons/Logo";
import LanguageChange from "@/components/locale/LanguageChange";

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);

  const toggleNavbar = () => {
    setShowNav(!showNav);
  };

  const hideNavbar = () => {
    setShowNav(false);
  };

  return (
    <header className="bg-white shadow-xl fixed top-0 z-50 w-full py-2 px-4">
      <nav className="w-full max-w-[1440px] mx-auto flex justify-between items-center">
        <a className="z-50 text-gradient" href="#">
          <Logo size="sm" />
        </a>
        <HamburgerButton handleClick={toggleNavbar} />
        <ul
          className={`bg-white h-[100vh] w-full absolute top-0 left-0 flex flex-col items-center justify-center gap-6 transform transition-transform duration-500 ease-in-out ${
            showNav ? "translate-x-0" : "translate-x-[100%]"
          } lg:relative lg:w-auto lg:bg-transparent lg:h-auto lg:flex-row lg:gap-8 lg:translate-x-0 `}
        >
          <li onClick={hideNavbar} className="flex items-center">
            <a href="#pricing">Pricing</a>
          </li>
          <li onClick={hideNavbar} className="flex items-center">
            <a href="#coaching">Coaching</a>
          </li>
          <li onClick={hideNavbar} className="flex items-center">
            <a href="#about">About Us</a>
          </li>
          <li>
            <LanguageChange />
          </li>
          <li onClick={hideNavbar}>
            <MainButton href="#">Book now</MainButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}
