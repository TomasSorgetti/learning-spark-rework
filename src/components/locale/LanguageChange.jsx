"use client";

import { useState, useRef, useEffect } from "react";
import LanguageIcon from "../icons/LanguageIcon";
import useClickOutside from "@/hooks/useClickOutside";
import { Link } from "@/i18n/routing";

export default function LanguageChange() {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const firstMenuItemRef = useRef(null); // Ref para el primer elemento del menú

  const toggleDropdown = () => {
    setShow((prev) => !prev);
  };

  const closeDropdown = () => {
    setShow(false);
  };

  useClickOutside(dropdownRef, closeDropdown);

  // Cuando el menú se abre, establecer el foco en el primer elemento del menú
  useEffect(() => {
    if (show && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [show]);

  return (
    <div
      className="relative flex items-center justify-center"
      ref={dropdownRef}
    >
      <button
        aria-label="Change language"
        aria-expanded={show} // Indica si el menú está abierto
        onClick={toggleDropdown}
      >
        <LanguageIcon />
      </button>
      <ul
        role="menu"
        className={`absolute bg-white shadow-md top-16 right-0 transition-all duration-300 ${
          show
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } flex flex-col gap-4 px-6 py-2 rounded-md`}
      >
        <li role="menuitem" onClick={closeDropdown}>
          <Link
            href="/"
            locale="es"
            ref={firstMenuItemRef}
            className="hover:font-bold hover:text-secondary p-2"
          >
            Español
          </Link>
        </li>
        <li role="menuitem" onClick={closeDropdown}>
          <Link
            href="/"
            locale="en"
            className="hover:font-bold hover:text-secondary p-2"
          >
            English
          </Link>
        </li>
      </ul>
    </div>
  );
}
