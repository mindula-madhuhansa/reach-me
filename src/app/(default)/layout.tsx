import Header from "@/components/header";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="p-6 max-w-7xl mx-auto h-full">{children}</div>
    </div>
  );
}
