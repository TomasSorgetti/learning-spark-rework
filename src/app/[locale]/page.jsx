import { getTranslations } from "next-intl/server";
import HomeBanner from "@/components/home/Banner";
import Pricing from "@/components/home/Pricing";
import GroupClass from "@/components/home/GroupClass";
import Contact from "@/components/home/Contact";
import Coaching from "@/components/home/Coaching";
import WhatsappButton from "@/components/ui/buttons/WhatsappButton";
import About from "@/components/home/About";

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
  };
}

export default async function HomePage({ params, searchParams }) {
  const t = await getTranslations();

  return (
    <main className="pt-20 md:pt-26 lg:pt-20">
      <HomeBanner t={t} />
      <Pricing t={t} />
      <GroupClass t={t} />
      <Coaching t={t} />
      <About t={t} />
      <Contact t={t} />
      <WhatsappButton />
    </main>
  );
}
