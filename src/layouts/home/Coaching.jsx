import MainButton from "@/components/buttons/MainButton";
import { constants } from "@/constants";
import Image from "next/image";

export default function Coaching({ t }) {
  return (
    <section id="coaching" className="px-4 sm:px-8 md:px-16 lg:my-32">
      <article className="relative flex flex-col bg-[url('/images/coaching/bg_mobile.png')] bg-cover bg-bottom min-h-[calc(700px+30vh)] h-screen w-full px-6 py-8 rounded-[20px] sm:min-h-[calc(800px+30vh)] md:min-h-[1000px] md:max-w-[800px] md:mx-auto md:bg-[url('/images/coaching/bg_tablet.png')] lg:bg-[url('/images/coaching/bg_desktop.png')] lg:w-full lg:max-w-[1280px] lg:min-h-[400px] lg:h-[600px] lg:flex-row lg:px-0 lg:justify-between">
        <div className="absolute top-0 right-0 w-full bg-alter1 flex justify-center rounded-t-[20px] lg:w-auto lg:right-0 lg:rounded-tl-none lg:rounded-tr-[19px] lg:px-6 lg:py-2">
          <strong className="text-[32px] font-bold flex justify-center items-start">
            US$ 79
            <sup className="text-[12px] font-bold pt-2">99</sup>
          </strong>
        </div>
        <Image
          src={"/images/coaching/coaching_statue.png"}
          alt="coaching statue"
          width={544}
          height={585}
          className="absolute bottom-0 left-0 lg:relative w-auto h-auto"
          loading="lazy"
          draggable="false"
        />
        <div className="pt-12 flex flex-col items-center gap-6 text-center max-w-[500px] mx-auto lg:mx-0 lg:text-left lg:items-start lg:max-w-[580px] lg:pr-8 xl:pr-16">
          <h2 className="text-white text-[20px] sm:text-[24px] md:text-[32px] lg:text-[38px]">
            {t("HomePage.Coaching.title")}
          </h2>
          <Image
            src={"/images/coaching/coaching_decoration.png"}
            alt="coaching statue"
            width={342}
            height={25}
            className="hidden lg:block"
            loading="lazy"
            draggable="false"
          />
          <p className="text-white text-[16px] lg:text-[18px]">
            {t("HomePage.Coaching.description")}
          </p>
          <MainButton href={constants.whatsappLink} target="_blank">
            {t("HomePage.Coaching.cta")}
          </MainButton>
        </div>
      </article>
    </section>
  );
}
