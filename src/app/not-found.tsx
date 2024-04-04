import { Back, Warning2 } from "iconic-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col gap-y-2 items-center justify-center bg-gray-100">
      <div className="flex items-center">
        <Warning2 className="w-10 h-10" variant="Bold" color="red" />
        <h1 className="ml-4 font-bold text-2xl text-red-500">Error 404</h1>
      </div>

      <div className="flex items-center gap-x-3">
        <p className="text-lg text-center">
          Page not found!{" "}
          <Link href="/" className="underline">
            Go Back
          </Link>
        </p>
        <Back className="w-7 h-7" />
      </div>
    </div>
  );
}
