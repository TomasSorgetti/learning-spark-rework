import Image from "next/image";

export default function About({ t }) {
  return (
    <section
      id="about"
      className="mx-auto my-24 px-4 sm:px-8 md:px-16 lg:px-0 flex flex-col gap-4 items-center lg:gap-12 lg:max-w-[1280px] lg:flex-row lg:items-start lg:justify-between lg:my-32"
    >
      <Image
        className="w-full h-auto lg:w-auto lg:max-w-[50%]"
        src="/images/about/about.png"
        alt={t("HomePage.About.title")}
        width={604}
        height={505}
        draggable="false"
        loading="lazy"
      />

      <article>
        <span className="text-[14px] text-subTitleColor font-medium">
          {t("HomePage.About.span")}
        </span>
        <h3 className="font-poppins text-[26px] mb-5 font-extrabold text-left text-titleColor xl:text-[2.188rem]">
          {t("HomePage.About.title")}
        </h3>
        <div className="flex flex-col gap-2 mt-6 leading-7 lg:gap-8 lg:mt-10">
          <p className="text-[1rem] font-normal text-textColor xl:text-[1.063rem]">
            {t("HomePage.About.description1")}
          </p>
          <p className="text-[16px] font-normal text-textColor">
            {t("HomePage.About.description2")}
          </p>
        </div>
      </article>
    </section>
  );
}
