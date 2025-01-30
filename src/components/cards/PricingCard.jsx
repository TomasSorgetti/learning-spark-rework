import CardButton from "../buttons/CardButton";
import CheckIcon from "../icons/CheckIcon";
import { constants } from "@/constants";

export default function PricingCard({
  id,
  title,
  price,
  salePrice,
  list,
  cta,
  active = false,
}) {
  return (
    <div
      className={`w-full max-w-[300px] px-6 py-8 flex flex-col items-start justify-between rounded-[20px] border border-[1px]-terciary shadow-sm ${
        active ? "bg-secondary" : "bg-white"
      } lg:max-w-[400px] lg:px-8 lg:py-10 h-[580px]`}
    >
      <div className="flex flex-col items-start gap-8">
        <h3
          className={`text-[18px] font-bold uppercase ${
            active ? "text-white" : "text-secondary"
          }`}
        >
          {title}
        </h3>
        <div className="text-left">
          <p
            className={`line-through text-[18px] ${
              active ? "text-white" : "text-secondary"
            }`}
          >
            {price}
          </p>
          <p
            className={`relative font-bold text-[42px] ${
              active ? "text-white" : "text-secondary"
            }`}
          >
            {salePrice}{" "}
            <span className="absolute font-bold text-[12px] top-3 right-[-18px]">
              99
            </span>
          </p>
        </div>
        <ul className="mb-16 flex flex-col gap-1 items-start">
          {list.map((item) => (
            <li
              className={`flex items-center gap-2 font-light text-[16px] ${
                active ? "text-white" : "text-terciary"
              }`}
              key={`${item.id}-${id}`}
            >
              <CheckIcon color={active ? "white" : "#211842"} />
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      <CardButton href={`${constants.whatsappLink}`}>{cta}</CardButton>
    </div>
  );
}
