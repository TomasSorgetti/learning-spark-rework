import { constants } from "@/lib/constants";
import Image from "next/image";

export default function WhatsappButton() {
  return (
    <a
      href={constants.whatsappLink}
      className="fixed bottom-24 right-8 z-50"
      target="_blank"
      referrerPolicy="no-referrer-when-downgrade"
      aria-label="whatsapp"
      rel="noreferrer"
    >
      <Image src="/icons/whatsapp.png" alt="whatsapp" width={80} height={80} />
    </a>
  );
}
