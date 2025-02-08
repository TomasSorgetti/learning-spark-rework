"use client";

import { Link } from "@/i18n/routing";

export default function MainButton({ children, href, locale, ...props }) {
  return (
    <>
      {locale ? (
        <Link
          locale={locale}
          className="bg-primary cursor-pointer text-center transition-all duration-500 hover:bg-alter3 focus:bg-alter4 hover:shadow-lg px-10 py-3 text-white rounded-full font-semibold text-[18px] lg:text-[20px]"
          href={href}
          role="button"
          tabIndex={0}
          {...props}
        >
          {children}
        </Link>
      ) : (
        <a
          className="bg-primary cursor-pointer text-center transition-all duration-500 hover:bg-alter3 focus:bg-alter4 hover:shadow-lg px-10 py-3 text-white rounded-full font-semibold text-[18px] lg:text-[20px]"
          href={href}
          role="button"
          tabIndex={0}
          {...props}
        >
          {children}
        </a>
      )}
    </>
  );
}
