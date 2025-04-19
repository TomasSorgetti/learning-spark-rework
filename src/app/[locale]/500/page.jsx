import { getTranslations } from "next-intl/server";

export default async function ServerErrorPage({ params, searchParams }) {
  const t = await getTranslations();

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1>Server Error 500</h1>
    </main>
  );
}
