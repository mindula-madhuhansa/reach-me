import { Colorfilter, Image as ImageIcon } from "iconic-react";
import Image from "next/image";

import { IPage } from "@/types/Page";
import RadioTogglerButton from "@/components/formComponents/radio-toggler-button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/authOptions";

export default async function PageInfoForm({ page }: { page: IPage }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <form>
        {/* BG Image/Color */}
        <div className="relative bg-gray-300 h-48">
          <div className="absolute top-2 right-2">
            <RadioTogglerButton
              options={[
                { value: "color", icon: Colorfilter, label: "Color" },
                { value: "image", icon: ImageIcon, label: "Image" },
              ]}
            />
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mb-12">
          <Image
            src={session.user?.image || "/avatar.jpg"}
            alt="Avatar"
            width={128}
            height={128}
            className="rounded-full object-contain relative -top-16 border-4 shadow-xl shadow-black/30 border-white"
          />
        </div>

        {/* Inputs */}
        <div className="p-4">
          <label htmlFor="displayName" className="page-info-label">
            Display name
          </label>
          <input type="text" id="displayName" placeholder="Name" />

          <label htmlFor="location" className="page-info-label">
            Location
          </label>
          <input type="text" id="location" placeholder="Address" />

          <label htmlFor="bio" className="page-info-label">
            Display name
          </label>
          <textarea id="bio" placeholder="Bio" />
        </div>
      </form>
    </div>
  );
}
