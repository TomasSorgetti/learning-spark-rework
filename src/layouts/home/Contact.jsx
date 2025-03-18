import MailIcon from "@/components/ui/icons/MailIcon";
import WhatsappIcon from "@/components/ui/icons/WhatsappIcon";
import { constants } from "@/lib/constants";
import Image from "next/image";

export default function Contact({ t }) {
  const whatsapp = "5491139478794";
  return (
    <section
      id="contact"
      className="h-[344px] font-manrope px-10 md:pl-[100px] pb-2 pt-0 mt-6 bg-secondary sm:px-20 lg:flex lg:p-0 lg:mt-20 lg:h-[400px] max-w-[1280px] lg:m-auto lg:justify-between 2xl:h-[400px] 2xl:items-center"
    >
      <article className="lg:w-[460px] lg:py-16 lg:pl-20 2xl:pl-36 flex flex-col h-full justify-evenly py-8 2xl:gap-4 3xl:w-[860px]">
        <h3 className="font-poppins text-white text-[1.5rem] xl:text-[2.188rem] font-extrabold">
          {t("HomePage.Contact.title")}
        </h3>
        <p className="text-white max-w-[500px] text-[0.875rem] font-normal mb-6 mt-2 leading-5 lg:w-[350px]">
          {t("HomePage.Contact.description")}
        </p>
        <div className="flex flex-col gap-2 font-manrope text-[0.875rem] xl:text-[1.063rem]">
          <a
            href={`mailto:${constants.email}`}
            target="blank"
            className="text-white flex gap-2 items-center"
          >
            <MailIcon />
            <p className="w">{constants.email}</p>
          </a>
          <a
            href={constants.whatsappLink}
            target="blank"
            className="text-white flex gap-2 items-center"
          >
            <WhatsappIcon />
            <p className="text-white">{constants.whatsapp}</p>
          </a>
        </div>
      </article>
      <div className="hidden lg:flex justify-start overflow-hidden w-[600px] lg:w-[50%] 2xl:h-[400px] 3xl:w-full">
        <Image
          className="object-cover w-full h-auto"
          src="/images/contact/contact_desktop.png"
          alt="contact collage"
          width={811}
          height={653}
          unoptimized={true}
          draggable={false}
        />
      </div>
    </section>
  );
}
