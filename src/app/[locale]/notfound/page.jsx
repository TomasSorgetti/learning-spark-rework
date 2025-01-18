import MainButton from "@/components/buttons/MainButton";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1>{t("NotFound.title")}</h1>
      <p>{t("NotFound.description")} </p>
      <MainButton href="/">{t("NotFound.button")}</MainButton>
    </main>
  );
}
