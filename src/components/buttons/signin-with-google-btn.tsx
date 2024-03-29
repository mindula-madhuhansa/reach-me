"use client";

import { Google } from "iconic-react";
import { signIn } from "next-auth/react";

export default function SignInWithGoogleButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex items-center gap-4 justify-center bg-blue-500 text-white w-full py-3"
    >
      <Google size="24" color="white" variant="Bold" />
      <span>Sign In with Google</span>
    </button>
  );
}
