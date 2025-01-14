import Logo from "@/components/icons/Logo";
import TikTokIcon from "@/components/icons/TikTokIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";

const Footer = ({ t }) => {
  const whatsapp = "5491139478794";
  return (
    <section className="font-manrope px-4 sm:px-16 border-t-2">
      <article className="flex flex-col gap-6 pb-20 border-b-[1px] border-gray-300 lg:flex-row lg:justify-center lg:pb-24 lg:pt-4 lg:gap-12 xl:gap-20 3xl:justify-around">
        <a href="#header">
          <Logo />
        </a>
        <div className="flex flex-col gap-10 lg:flex-row lg:pt-16 lg:pl-16 xl:gap-32">
          <div className="text-subTitleColor flex flex-col gap-2">
            <h5 className="text-[1.25rem] font-poppins font-semibold">
              Contact Info
            </h5>
            <a href="mailto:contacto@learning-spark.com" target="blank">
              contacto@learning-spark.com
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=${whatsapp}`}
              target="blank"
            >
              (+54 9)11 3947-8794
            </a>
            <div className="flex gap-3">
              <a
                target="blank"
                href="https://www.instagram.com/learningspark_/"
                className="h-[28px] flex items-center justify-center rounded-full w-[28px] bg-gray-100"
              >
                <InstagramIcon />
              </a>
              <a
                target="blank"
                href="https://www.tiktok.com/@learning.spark"
                className="h-[28px] flex items-center justify-center rounded-full w-[28px] bg-gray-100"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>
          <div className=" text-subTitleColor">
            <h5 className="text-[1.27rem] font-poppins font-semibold pb-1">
              Company
            </h5>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#clases" className="hover:font-bold">
                  Classes
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:font-bold">
                  About us
                </a>
              </li>
              <li className="relative">
                <a href="#contactanos" className="hover:font-bold absolute">
                  Get in touch
                </a>
              </li>
            </ul>
          </div>
        </div>
      </article>
      <p className="pt-12 pb-16 text-[0.65rem] font-normal text-subTitleColor lg:text-center xl:text-[0.875rem]">
        ©Copyright {new Date().getFullYear()} Learning Spark. All rights
        reserved.
      </p>
    </section>
  );
};

export default Footer;
