import { NotificationCircle } from "iconic-react";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <NotificationCircle className="animate-spin h-10 w-10" />
    </div>
  );
}
