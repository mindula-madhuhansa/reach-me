import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "@/libs/authOptions";
import SignOutButton from "@/components/buttons/signout-button";
import { Link2 } from "iconic-react";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-gray-50 border-b py-4">
      <div className="flex justify-between max-w-7xl mx-auto px-6">
        <div className="flex gap-8">
          <Link
            href="/"
            className="text-lg flex items-center gap-2 text-blue-500"
          >
            <Link2 size="24" variant="Outline" />
            <span className="font-bold">Reach</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-slate-500 text-sm">
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <nav className="flex items-center gap-4 text-sm text-slate-500">
          {!session ? (
            <>
              <Link href="/sign-in">Sign In</Link>
              <Link href="/sign-up">Sign Up</Link>
            </>
          ) : (
            <>
              <Link href="/account">Hello, {session.user?.name}</Link>
              <div className="hidden md:block">
                <SignOutButton />
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
