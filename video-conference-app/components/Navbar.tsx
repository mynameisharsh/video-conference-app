"use client";

import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="w-full bg-dark-1 fixed flex justify-between z-50 px-6 py-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg" width={40} height={40} alt="Logo" />
        <p className="text-2xl text-white font-extrabold max-sm:hidden">
          Livedeo
        </p>
      </Link>

      <div className="flex justify-center items-center">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
