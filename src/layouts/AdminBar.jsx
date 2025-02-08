"use client";

import { useState } from "react";
import {
  SlidersVertical,
  FolderKanban,
  Coins,
  ChartNoAxesCombined,
  UserRoundCog,
  Bell,
  Settings,
  ScrollText,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";

export default function AdminBar() {
  const [collapsed, setCollapsed] = useState(false);
  const { locale } = useRouter();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`bg-secondary py-32 px-6 h-full absolute top-0 left-0 transform transition-all duration-500 ease-in-out ${
        collapsed ? "w-[220px]" : "w-[80px]"
      }`}
    >
      <div className="relative flex flex-col gap-8">
        <button onClick={toggleCollapsed} className="absolute -right-16">
          <SlidersVertical color="black" />
        </button>

        <span
          className={`text-white font-bold h-[40px] transform transition-all duration-500 ease-in-out ${
            collapsed
              ? "opacity-1 overflow-visible"
              : "overflow-hidden opacity-0"
          }`}
        >
          Admin Dashboard
        </span>

        <nav>
          <ul className="text-white flex flex-col gap-6">
            <li>
              <Link
                locale={locale}
                href="/admin"
                className="flex items-center gap-2 py-2"
              >
                <FolderKanban />
                <span className={collapsed ? "" : "hidden"}>Overview</span>
              </Link>
            </li>
            <li>
              <Link
                locale={locale}
                href="/admin/sales"
                className="flex items-center gap-2 py-2"
              >
                <Coins />
                <span className={collapsed ? "" : "hidden"}>Sales</span>
              </Link>
            </li>
            <li>
              <Link
                locale={locale}
                href="/admin/analytics"
                className="flex items-center gap-2 py-2"
              >
                <ChartNoAxesCombined />
                <span className={collapsed ? "" : "hidden"}>Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                locale={locale}
                href="/admin/blog"
                className="flex items-center gap-2 py-2"
              >
                <ScrollText />
                <span className={collapsed ? "" : "hidden"}>Blog</span>
              </Link>
            </li>
            <li>
              <Link
                locale={locale}
                href="/admin/users"
                className="flex items-center gap-2 py-2"
              >
                <UserRoundCog />
                <span className={collapsed ? "" : "hidden"}>Users</span>
              </Link>
            </li>
            <li>
              <Link
                locale={locale}
                href="/admin/notifications"
                className="flex items-center gap-2 py-2"
              >
                <Bell />
                <span className={collapsed ? "" : "hidden"}>Notifications</span>
              </Link>
            </li>
            <li>
              <Link
                locale={locale}
                href="/admin/settings"
                className="flex items-center gap-2 py-2"
              >
                <Settings />
                <span className={collapsed ? "" : "hidden"}>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
