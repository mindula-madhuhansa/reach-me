import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import { ArrowRight } from "iconic-react";

type AccountPageProps = {
  searchParams: {
    reachName?: string;
  };
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const session = await getServerSession(authOptions);
  const reachName = searchParams.reachName;

  if (!session) {
    redirect("/");
  }

  return (
    <div className="mt-32 bg-white border p-8 rounded-xl max-w-lg mx-auto shadow-md">
      <form>
        <h1 className="text-4xl font-semibold text-center mb-2">
          Grab your Reach Name
        </h1>
        <p className="text-center mb-12 text-neutral-500">
          Enter your desired Reach Name to continue
        </p>
        <div className="max-w-xs mx-auto">
          <input
            defaultValue={reachName}
            type="text"
            placeholder="reach_name"
            className="p-2 border w-full mb-2 text-center"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-3 bg-blue-500 text-white py-2 px-4 w-full"
          >
            <span>Claim this Reach Name</span>
            <ArrowRight size="24" />
          </button>
        </div>
      </form>
    </div>
  );
}
