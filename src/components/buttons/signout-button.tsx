"use client";

import { Logout } from "iconic-react";
import { signOut } from "next-auth/react";

export default function SignOutButton({
  className = "flex gap-2 items-center border p-2 px-4 shadow rounded-md",
  iconLeft = false,
  iconClasses = "",
}) {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className={className}>
      {!iconLeft ? (
        <>
          <span>Sign Out</span>
          <Logout className={iconClasses} />
        </>
      ) : (
        <>
          <Logout className={iconClasses} />
          <span>Sign Out</span>
        </>
      )}
    </button>
  );
}
