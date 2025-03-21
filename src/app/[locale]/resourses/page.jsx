"use server";

import ResoursesBanner from "@/components/resourses/ResoursesBanner";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params, searchParams }, parent) {
  const locale = (await params).locale;

  const metadata = {
    en: {
      title: "Learning Spark | Study Resources for IB & IGCSE",
      description:
        "Find subject-specific materials to enhance your exam preparation, extended essays, and internal assessments. Access guides, exercises, and key tools to study efficiently at your own pace.",
      keywords:
        "study resources, exam preparation, extended essays, internal assessments",
    },
    es: {
      title: "Learning Spark | Recursos de estudio para IB & IGCSE",
      description:
        "Encuentra materiales organizados por materia para mejorar tu preparación en exámenes, monografías y evaluaciones internas. Accede a guías, ejercicios y herramientas clave para estudiar de manera eficiente y a tu ritmo.",
      keywords:
        "preparación materias, exámenes, monografías, evaluaciones internas",
    },
  };

  const selectedMetadata = metadata[locale] || metadata.en;

  return {
    title: selectedMetadata.title,
    description: selectedMetadata.description,
  };
}

export default async function ResoursesPage({ params, searchParams }) {
  const t = await getTranslations();

  return (
    <main>
      <ResoursesBanner t={t} />
    </main>
  );
}
