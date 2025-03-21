export default function ResoursesBanner({ t }) {
  return (
    <section className="h-[400px] bg-gray-50">
      <h1>{t("ResoursesPage.title")}</h1>
      <p>{t("ResoursesPage.description")}</p>
    </section>
  );
}
