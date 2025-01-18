"use client";

import { redirect, usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  redirect(`/${locale}/notfound`);
}
