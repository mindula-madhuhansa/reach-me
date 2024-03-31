"use client";

import { useState } from "react";
import { ArrowRight, Warning2 } from "iconic-react";
import { redirect } from "next/navigation";

import { grabReachName } from "@/actions/grabReachName";
import SubmitButton from "@/components/buttons/submit-button";

export default function ReachNameForm({
  reachName,
}: {
  reachName: string | undefined;
}) {
  const [isTaken, setIsTaken] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const result = await grabReachName(formData);

    setIsTaken(result === false);

    if (result) {
      redirect(`/account?created=${formData.get("reachName")}`);
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
          className="p-2 border w-full mb-2 text-center outline-blue-500"
        />

        {isTaken && (
          <div className="bg-red-200 border border-red-600 text-red-500 p-2 mb-4 flex items-center gap-3 justify-center">
            <Warning2 size={20} />
            <span className="text-sm">This Reach name is already taken.</span>
          </div>
        )}

        <SubmitButton>
          <span>Claim this Reach name</span>
          <ArrowRight size="24" />
        </SubmitButton>
      </div>
    </form>
  );
}
