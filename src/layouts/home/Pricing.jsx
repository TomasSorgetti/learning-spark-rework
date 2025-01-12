import PricingCard from "@/components/cards/PricingCard";

export default async function Pricing({ t }) {
  const miArr = [
    {
      title: t("HomePage.Pricing.OneOnOne.title"),
      price: t("HomePage.Pricing.OneOnOne.price"),
      salePrice: t("HomePage.Pricing.OneOnOne.salePrice"),
      list: [
        t("HomePage.Pricing.OneOnOne.List.1"),
        t("HomePage.Pricing.OneOnOne.List.2"),
      ],
      cta: t("HomePage.Pricing.OneOnOne.cta"),
      active: false,
    },
    {
      title: t("HomePage.Pricing.10Class.title"),
      price: t("HomePage.Pricing.10Class.price"),
      salePrice: t("HomePage.Pricing.10Class.salePrice"),
      list: [
        t("HomePage.Pricing.10Class.List.1"),
        t("HomePage.Pricing.10Class.List.2"),
      ],
      cta: t("HomePage.Pricing.10Class.cta"),
      active: true,
    },
    {
      title: t("HomePage.Pricing.20Class.title"),
      price: t("HomePage.Pricing.20Class.price"),
      salePrice: t("HomePage.Pricing.20Class.salePrice"),
      list: [
        t("HomePage.Pricing.20Class.List.1"),
        t("HomePage.Pricing.20Class.List.2"),
      ],
      cta: t("HomePage.Pricing.20Class.cta"),
      active: false,
    },
  ];

  return (
    <section className="flex flex-col items-center text-center">
      <h2>{t("HomePage.Pricing.title")}</h2>
      <p>{t("HomePage.Pricing.description")}</p>
      <div className="flex gap-4">
        {miArr.map((item) => (
          <PricingCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
