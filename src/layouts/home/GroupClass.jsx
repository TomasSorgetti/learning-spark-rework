import MainButton from "@/components/buttons/MainButton";
import { constants } from "@/lib/constants";
import Image from "next/image";

export default function GroupClass({ t }) {
  return (
    <section className="flex flex-col-reverse items-center gap-8 px-4 my-16 lg:flex-row lg:items-center lg:px-8 max-w-[1280px] mx-auto lg:my-[100px] lg:justify-between">
      <div className="text-center flex flex-col items-center gap-4 lg:items-start lg:text-left">
        <h2 className="text-[24px] max-w-[400px] sm:text-[28px] sm:max-w-[543px] lg:text-[38px] lg:max-w-[550px]">
          {t("HomePage.GroupClass.title")}
        </h2>
        <p className="text-[1rem] leading-6 max-w-[370px] lg:max-w-[580px] lg:text-[18px] lg:leading-8">
          {t("HomePage.GroupClass.description")}
        </p>
        <span className="relative font-bold text-[42px]">
          {t("HomePage.GroupClass.price")}
          <span className="absolute top-3 right-[-12px] text-[12px]">99</span>
        </span>
        <MainButton href={constants.whatsappLink} target="_blank">
          {t("HomePage.GroupClass.cta")}
        </MainButton>
      </div>
      <Image
        className="w-full h-auto max-w-[702.93px] lg:max-w-[50%]"
        src="/images/group_class/group.png"
        alt="online group class"
        width={702.93}
        height={482.7}
      />
    </section>
  );
}
