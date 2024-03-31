export default function SectionBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-4 shadow-md grow bg-gray-50 rounded-md">{children}</div>
  );
}
