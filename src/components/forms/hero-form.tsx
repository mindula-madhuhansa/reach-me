"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type HeroFormProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};

export default function HeroForm({ user }: HeroFormProps) {
  const router = useRouter();
  const [reachName, setReachName] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!reachName) return;

    if (user) {
      router.push(`/account?reachName=${reachName}`);
    } else {
      await signIn("google", {
        callbackUrl: `/account?reachName=${reachName}`,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg shadow-gray-500/20"
    >
      <span className="bg-white py-4 pl-4">reach.me/</span>
      <input
        value={reachName}
        onChange={(e) => setReachName(e.target.value)}
        type="text"
        placeholder="reach_name"
        className="py-4"
      />
      <button type="submit" className="bg-blue-500 text-white p-4 px-6">
        Join for Free
      </button>
    </form>
  );
}
