import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/utils/authOptions";
import ReachNameForm from "@/components/forms/reach-name-form";

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
      <ReachNameForm reachName={reachName} />
    </div>
  );
}
