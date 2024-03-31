"use client";

import { Colorfilter, Image as ImageIcon, Ram } from "iconic-react";
import Image from "next/image";
import { User } from "next-auth";
import toast from "react-hot-toast";

import { IPage } from "@/types/Page";
import RadioTogglerButton from "@/components/formComponents/radio-toggler-button";
import SubmitButton from "@/components/buttons/submit-button";
import { savePageInfo } from "@/actions/savePageInfo";

type PageInfoFormProps = {
  page: IPage;
  user: Partial<User>;
};

export default function PageInfoForm({ page, user }: PageInfoFormProps) {
  const handleSavePageInfo = async (formData: FormData) => {
    const result = await savePageInfo(formData);

    if (result) {
      toast.success("Saved");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="m-4 shadow-sm grow bg-white">
      <form action={handleSavePageInfo}>
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
            src={user.image || "/avatar.jpg"}
            alt="Avatar"
            width={128}
            height={128}
            className="rounded-full object-contain relative -top-16 border-4 shadow-xl shadow-black/30 border-blue-500"
          />
        </div>

        {/* Inputs */}
        <div className="p-4">
          <label htmlFor="displayName" className="page-info-label">
            Display name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            defaultValue={page.displayName}
            placeholder="Name"
            className="page-info-input"
          />
          <label htmlFor="location" className="page-info-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={page.location}
            placeholder="Address"
            className="page-info-input"
          />
          <label htmlFor="bio" className="page-info-label">
            Display name
          </label>
          <textarea
            rows={4}
            id="bio"
            name="bio"
            defaultValue={page.bio}
            placeholder="Bio"
            className="page-info-input"
          />

          <div className="max-w-64 mx-auto mt-4">
            <SubmitButton>
              <Ram size="24" />
              <span>Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
