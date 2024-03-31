import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/sidebar";
import { authOptions } from "@/libs/authOptions";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar session={session} />

      <div className="flex-1">
        <div className="bg-white m-4 shadow-sm grow">{children}</div>
      </div>
    </div>
  );
}
