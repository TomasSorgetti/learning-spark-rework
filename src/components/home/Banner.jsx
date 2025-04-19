import MainButton from "@/components/ui/buttons/MainButton";

export default async function HomeBanner({ t }) {
  return (
    <section
      id="banner"
      className="min-h-[80vh] pt-6 pb-[300px] px-4 text-center bg-[url('/images/banner/bg_mobile.png')] bg-bottom bg-no-repeat lg:px-8 lg:h-[560px] lg:min-h-[560px] lg:py-20 lg:text-left lg:bg-[url('/images/banner/bg_desktop.png')] lg:bg-center lg:bg-cover lg:flex lg:items-center w-full"
    >
      <div className="max-w-[1440px] w-full mx-auto flex flex-col items-center gap-6 lg:items-start">
        <h1 className="text-[26px] max-w-[400px] sm:text-[32px] sm:max-w-[500px] lg:text-[42px] lg:max-w-[570px]">
          {t("HomePage.Banner.title")}
        </h1>
        <p className="text-[1rem] leading-6 max-w-[370px] lg:max-w-[550px] lg:text-[18px] lg:leading-8">
          {t("HomePage.Banner.description")}
        </p>
        <MainButton href="#pricing">{t("HomePage.Banner.cta")}</MainButton>
      </div>
    </section>
  );
}
