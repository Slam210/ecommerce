"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-transparent px-3.5 py-2 text-lg font-medium transition-colors hover:border-primary bg-transparent hover:bg-transparent",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      {children}
    </Link>
  );
};

const NavbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href={"/"} className="p-6 items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          Vendora
        </span>
      </Link>
      <NavbarSidebar
        items={NavbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="items-center gap-4 hidden lg:flex">
        {NavbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathName === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant={"secondary"}
            className="border-l border-t-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
          >
            <Link prefetch href="/admin">
              Dashboard
            </Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant={"secondary"}
            className="border-l border-t-0 border-b-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
          >
            <Link prefetch href="/sign-in">
              Log In
            </Link>
          </Button>
          <Button
            asChild
            variant={"secondary"}
            className="border-l border-t-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
          >
            <Link prefetch href="/sign-up">
              Start Selling
            </Link>
          </Button>
        </div>
      )}
      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant={"ghost"}
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
