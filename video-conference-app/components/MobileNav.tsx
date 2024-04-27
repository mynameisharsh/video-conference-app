import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Routes } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          height={32}
          width={32}
          alt="Logo"
          className="cursor-pointer sm:hidden"
        />
      </SheetTrigger>
      <SheetContent side="left" className="border-none bg-dark-1">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/icons/logo.svg" width={32} height={32} alt="yoom logo" />
          <p className="text-[26px] font-extrabold text-white">YOOM</p>
        </Link>
        <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className=" flex h-full flex-col gap-6 pt-16 text-white">
              {Routes.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <SheetClose asChild key={item.path}>
                    <Link
                      href={item.path}
                      key={item.label}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                        {
                          "bg-blue-1": isActive,
                        }
                      )}
                    >
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={20}
                        height={20}
                      />
                      <p className="font-semibold">{item.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
