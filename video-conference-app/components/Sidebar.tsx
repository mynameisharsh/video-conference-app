"use client";

import { Routes } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <section className="sticky left-0 top-0 w-fit h-screen flex flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 gap-8 flex-col">
        {Routes.map((route) => {
          const isActive =
            pathName === route.path ||
            (route.path !== "/" && pathName.startsWith(route.path));
          return (
            <Link
              key={route.label}
              href={route.path}
              className={cn(
                "flex justify-start gap-4 items-center rounded-lg p-3",
                {
                  "bg-blue-1": isActive,
                }
              )}
            >
              <Image
                src={route.icon}
                alt={route.label}
                height={24}
                width={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {route.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
