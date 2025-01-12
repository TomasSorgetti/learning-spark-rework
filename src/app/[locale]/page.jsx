"use server";

import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div>
      <section>
        <h1>{t("title")}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti enim
          qui voluptates consequatur laborum velit nisi atque alias unde quidem
          iusto minima dicta, eaque optio sed est tempora doloremque
          exercitationem!
        </p>
      </section>
    </div>
  );
}
