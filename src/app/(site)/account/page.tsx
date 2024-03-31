import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/libs/authOptions";
import ReachNameForm from "@/components/forms/reach-name-form";
import { getPageDetails } from "@/utils/getPageDetails";
import PageInfoForm from "@/components/forms/page-info-form";

type AccountPageProps = {
  searchParams: {
    reachName?: string;
  };
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const session = await getServerSession(authOptions);
  const reachName = searchParams.reachName;

  if (!session?.user) {
    redirect("/");
  }

  const page = await getPageDetails();

  if (!page) {
    return (
      <div className="mt-32 bg-white border p-8 rounded-xl max-w-lg mx-auto shadow-md">
        <ReachNameForm reachName={reachName} />
      </div>
    );
  }

  return (
    <div>
      <PageInfoForm page={page} user={session.user} />
    </div>
  );
}
