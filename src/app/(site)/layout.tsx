import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/sidebar";
import { authOptions } from "@/libs/authOptions";
import { getPageDetails } from "@/utils/getPageDetails";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const page = await getPageDetails();

  if (!page) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar session={session} page={page} />

      <div className="flex-1">
        <div>{children}</div>
      </div>
    </div>
  );
}
