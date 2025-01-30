import PricingCard from "@/components/cards/PricingCard";

export default async function Pricing({ t }) {
  const miArr = [
    {
      id: 1,
      title: t("HomePage.Pricing.OneOnOne.title"),
      price: t("HomePage.Pricing.OneOnOne.price"),
      salePrice: t("HomePage.Pricing.OneOnOne.salePrice"),
      list: [
        {
          id: 1,
          text: t("HomePage.Pricing.OneOnOne.List.1"),
        },
        {
          id: 2,
          text: t("HomePage.Pricing.OneOnOne.List.2"),
        },
        {
          id: 3,
          text: t("HomePage.Pricing.OneOnOne.List.3"),
        },
        {
          id: 4,
          text: t("HomePage.Pricing.OneOnOne.List.4"),
        },
      ],
      cta: t("HomePage.Pricing.OneOnOne.cta"),
      active: false,
    },
    {
      id: 2,
      title: t("HomePage.Pricing.10Class.title"),
      price: t("HomePage.Pricing.10Class.price"),
      salePrice: t("HomePage.Pricing.10Class.salePrice"),
      list: [
        {
          id: 1,
          text: t("HomePage.Pricing.10Class.List.1"),
        },
        {
          id: 2,
          text: t("HomePage.Pricing.10Class.List.2"),
        },
        {
          id: 3,
          text: t("HomePage.Pricing.10Class.List.3"),
        },
        {
          id: 4,
          text: t("HomePage.Pricing.10Class.List.4"),
        },
        {
          id: 5,
          text: t("HomePage.Pricing.10Class.List.5"),
        },
      ],
      cta: t("HomePage.Pricing.10Class.cta"),
      active: true,
    },
    {
      id: 3,
      title: t("HomePage.Pricing.20Class.title"),
      price: t("HomePage.Pricing.20Class.price"),
      salePrice: t("HomePage.Pricing.20Class.salePrice"),
      list: [
        {
          id: 1,
          text: t("HomePage.Pricing.20Class.List.1"),
        },
        {
          id: 2,
          text: t("HomePage.Pricing.20Class.List.2"),
        },
        {
          id: 3,
          text: t("HomePage.Pricing.20Class.List.3"),
        },
        {
          id: 4,
          text: t("HomePage.Pricing.20Class.List.4"),
        },
        {
          id: 5,
          text: t("HomePage.Pricing.20Class.List.5"),
        },
        {
          id: 6,
          text: t("HomePage.Pricing.20Class.List.6"),
        },
      ],
      cta: t("HomePage.Pricing.20Class.cta"),
      active: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="px-4 py-16 flex flex-col items-center text-center gap-6 sm:py-24 lg:py-36"
    >
      <h2 className="text-[24px] max-w-[400px] sm:text-[28px] sm:max-w-[500px] lg:text-[38px] lg:max-w-[796px]">
        {t("HomePage.Pricing.title")}
      </h2>
      <p className="text-[1rem] leading-6 max-w-[370px] lg:max-w-[640px] lg:text-[18px] lg:leading-8">
        {t("HomePage.Pricing.description")}
      </p>
      <div className="mt-4 flex flex-col items-center gap-8 w-full md:flex-row md:gap-2 md:justify-center lg:gap-8">
        {miArr.map((item) => (
          <PricingCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
