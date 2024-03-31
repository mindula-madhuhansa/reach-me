"use client";

import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";

import { SidebarNavLinks } from "@/constants/sidebar-navlinks";
import SignOutButton from "@/components/buttons/signout-button";
import { usePathname } from "next/navigation";

export default function Sidebar({ session }: { session: Session }) {
  const pathname = usePathname();

  return (
    <aside className=" bg-white max-w-64 flex-1 p-4 shadow-sm">
      <Image
        src={session.user?.image || "/avatar.jpg"}
        alt="Avatar"
        width={128}
        height={128}
        className="rounded-full object-cover aspect-square mx-auto"
      />

      <div className="text-center mt-12">
        <nav className="inline-flex flex-col text-center gap-6">
          {SidebarNavLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`flex items-center ${
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
            className="flex gap-8 items-center text-gray-700"
            iconLeft={true}
            iconClasses="w-7 h-7 -mr-1"
          />
        </nav>
      </div>
    </aside>
  );
}
