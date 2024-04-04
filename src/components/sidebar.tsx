"use client";

import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { HambergerMenu, Link2 } from "iconic-react";

import { SidebarNavLinks } from "@/constants/sidebar-navlinks";
import SignOutButton from "@/components/buttons/signout-button";
import { IPage } from "@/types/Page";

type SidebarProps = {
  session: Session;
  page: IPage;
};

export default function Sidebar({ session, page }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <label
        htmlFor="sidebar"
        className="inline-flex lg:hidden absolute top-2 left-4 items-center gap-2 bg-blue-500 p-2 px-4 rounded-full shadow text-white cursor-pointer"
      >
        <HambergerMenu />
        <span>Menu</span>
      </label>
      <input id="sidebar" type="checkbox" className="sr-only" />

      <label
        htmlFor="sidebar"
        className="hidden backdrop fixed inset-0 bg-black/80 z-10"
      />
      <aside className="fixed -left-64 top-0 bottom-0 z-20 lg:static bg-gray-50 min-w-64 lg:max-w-64 flex-1 px-4 shadow-md rounded-r-2xl transition-all">
        <div className="sticky top-0 pt-6">
          <Image
            src={session.user?.image || "/avatar.jpg"}
            alt="Avatar"
            width={128}
            height={128}
            className="rounded-full object-cover aspect-square mx-auto"
          />

          {page && (
            <Link
              target="_blank"
              href={`/${page.uri}`}
              className="flex justify-center items-center gap-1 mt-4 hover:text-blue-500 transition-all ease-out"
            >
              <Link2 size={28} className="text-blue-500 " />
              <span className="text-xl text-gray-400">/</span>
              <span>{page.uri}</span>
            </Link>
          )}

          <div className="text-center mt-12">
            <nav className="inline-flex flex-col text-center gap-6">
              {SidebarNavLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`flex items-center hover:text-blue-500 transition-all ease-out ${
                    pathname === link.href
                      ? "text-blue-500 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  <link.icon size={20} />
                  <span className="ml-8">{link.label}</span>
                </Link>
              ))}

              <div className="border-t pt-4" />

              <SignOutButton
                className="flex gap-8 items-center text-gray-700 hover:text-blue-500 transition-all ease-out"
                iconLeft={true}
                iconClasses="w-7 h-7 -mr-1"
              />
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
