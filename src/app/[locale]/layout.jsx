import "../../styles/globals.css";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

const Poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Bold.ttf", weight: "800", style: "bold" },
    { path: "./fonts/Poppins-SemiBold.ttf", weight: "700", style: "semibold" },
  ],
});

const Manrope = localFont({
  src: [
    { path: "./fonts/Manrope-Regular.ttf", weight: "400", style: "regular" },
  ],
});

export default async function LocaleLayout({ children, params }) {
  const locale = (await params).locale;

  if (!routing.locales.includes(locale)) {
    //? add /en to the url or redirect notFound
    redirect(`/${routing.defaultLocale}/${locale}`);
    // notFound()
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${Poppins.className} ${Manrope.className}`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
