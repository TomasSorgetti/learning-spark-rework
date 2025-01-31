import { getTranslations } from "next-intl/server";
import HomeBanner from "@/layouts/home/Banner";
import Pricing from "@/layouts/home/Pricing";
import GroupClass from "@/layouts/home/GroupClass";
import Contact from "@/layouts/home/Contact";
import Coaching from "@/layouts/home/Coaching";
import WhatsappButton from "@/components/buttons/WhatsappButton";

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <main className="">
      <HomeBanner t={t} />
      <Pricing t={t} />
      <GroupClass t={t} />
      <Coaching t={t} />
      <Contact t={t} />
      <WhatsappButton />
    </main>
  );
}
