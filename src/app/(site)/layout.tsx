import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/sidebar";
import { authOptions } from "@/libs/authOptions";
import toast from "react-hot-toast";
import { getPageDetails } from "@/utils/getPageDetails";
import { IPage } from "@/types/Page";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const page = await getPageDetails();

  if (!page) {
    toast.error("Somthing went wrong!");
    return null;
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
