"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function HeroForm() {
  const [username, setUsername] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) return;

    await signIn("google", {
      callbackUrl: `/account?reachName=${username}`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg shadow-gray-500/20"
    >
      <span className="bg-white py-4 pl-4">reach.me/</span>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
