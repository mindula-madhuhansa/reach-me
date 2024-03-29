"use client";

import { Logout } from "iconic-react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex gap-2 items-center border p-2 px-4 shadow rounded-md"
    >
      <span>Sign Out</span>
      <Logout size="24" />
    </button>
  );
}
