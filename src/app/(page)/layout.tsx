import Header from "@/components/header";

export default function ReachMeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="p-6 max-w-7xl mx-auto h-full">{children}</div>
    </div>
  );
}
