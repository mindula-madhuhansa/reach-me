"use client";

import { useState } from "react";
import { ArrowRight, ArrowRotateRight, Warning2 } from "iconic-react";
import { redirect } from "next/navigation";
import { useFormStatus } from "react-dom";

import { grabReachName } from "@/actions/grabReachName";

export default function ReachNameForm({
  reachName,
}: {
  reachName: string | undefined;
}) {
  const { pending } = useFormStatus();
  const [isTaken, setIsTaken] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const result = await grabReachName(formData);

    setIsTaken(result === false);

    if (result) {
      redirect(`/account/${formData.get("reachName")}`);
    }
  };

  return (
    <form action={handleSubmit}>
      <h1 className="text-4xl font-semibold text-center mb-2">
        Grab your Reach name
      </h1>
      <p className="text-center mb-12 text-neutral-500">
        Enter your desired Reach name to continue
      </p>
      <div className="max-w-xs mx-auto">
        <input
          name="reachName"
          defaultValue={reachName}
          type="text"
          placeholder="reach_name"
          className="p-2 border w-full mb-2 text-center"
        />

        {isTaken && (
          <div className="bg-red-200 border border-red-600 text-red-500 p-2 mb-4 flex items-center gap-3 justify-center">
            <Warning2 size={20} />
            <span className="text-sm">This Reach name is already taken.</span>
          </div>
        )}
        <button
          type="submit"
          disabled={pending}
          className="flex items-center justify-center gap-3 bg-blue-500 text-white disabled:bg-blue-300 disabled:to-gray-200 py-2 px-4 w-full disabled:"
        >
          <span>Claim this Reach name</span>
          {pending ? (
            <ArrowRotateRight size="24" className="animate-spin" />
          ) : (
            <ArrowRight size="24" />
          )}
        </button>
      </div>
    </form>
  );
}
