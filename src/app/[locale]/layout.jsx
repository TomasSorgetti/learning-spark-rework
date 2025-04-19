import "../../styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { LoadingProvider } from "@/features/loadingBar/context/loadingContext";
import { AuthProvider } from "@/context/AuthContext";
import LoadingBar from "@/features/loadingBar/components/LoadingBar";
import { ToastProvider } from "@/features/toast/ToastContext";

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

export async function generateMetadata({ params, searchParams }, parent) {
  const locale = (await params).locale;

  const metadata = {
    en: {
      title:
        "Learning Spark | Expert Online Tutors for IB and IGCSE Exams, Essays and Assesments",
      description:
        "Expert coaching for Extended Essays, Internal Assessments, and exam preparation in Mathematics, Biology, Physics, and more. Learn anywhere, anytime!",
      keywords: "online tutors, IB, IGCSE, exams, essays, assessments",
    },
    es: {
      title:
        "Learning Spark | Tutores Online Expertos para Exámenes, Ensayos y Evaluaciones del IB e IGCSE",
      description:
        "Coaching experto para Ensayos Extendidos, Evaluaciones Internas y preparación de exámenes en Matemáticas, Biología, Física y más. ¡Aprende desde cualquier lugar, en cualquier momento!",
      keywords: "tutores online, IB, IGCSE, exámenes, essays, assessments",
    },
  };

  const selectedMetadata = metadata[locale] || metadata.en;

  return {
    title: selectedMetadata.title,
    description: selectedMetadata.description,
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_ES",
      title: selectedMetadata.title || metadata.en.title,
      description: selectedMetadata.description || metadata.en.description,
      url: `https://learning-spark.com/${locale}`,
      images: [
        {
          url: `https://learning-spark.com/metadata/opengraph.png`,
          width: 1200,
          height: 630,
          alt: "A preview of the Learning Spark website",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: selectedMetadata.title,
      description: selectedMetadata.description,
      images: [`https://learning-spark.com/metadata/opengraph.png`],
    },
    alternates: {
      canonical: `https://learning-spark.com/${locale}`,
      languages: {
        en: "https://learning-spark.com/en",
        es: "https://learning-spark.com/es",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const locale = (await params).locale;

  if (!routing.locales.includes(locale)) {
    // TODO => routing.defaultLocale = en , locale=en|es, fix => /en/en
    //? add /en to the url or redirect notFound
    redirect(`/${routing.defaultLocale}/${locale}`);
    // notFound()
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${Poppins.className} ${Manrope.className}`}>
        <LoadingProvider>
          <NextIntlClientProvider messages={messages}>
            <AuthProvider>
              <Navbar />
              <LoadingBar />
              <ToastProvider>{children}</ToastProvider>
              <Footer />
            </AuthProvider>
          </NextIntlClientProvider>
        </LoadingProvider>
        
        {/* vercel analytics */}
        <Analytics />
      </body>
    </html>
  );
}
