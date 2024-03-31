"use client";

import { Colorfilter, GalleryAdd, Image as ImageIcon, Ram } from "iconic-react";
import Image from "next/image";
import { User } from "next-auth";
import toast from "react-hot-toast";
import { ChangeEvent, useRef, useState } from "react";

import { IPage } from "@/types/Page";
import RadioTogglerButton from "@/components/formComponents/radio-toggler-button";
import SubmitButton from "@/components/buttons/submit-button";
import { savePageInfo } from "@/actions/savePageInfo";

type PageInfoFormProps = {
  page: IPage;
  user: Partial<User>;
};

export default function PageInfoForm({ page, user }: PageInfoFormProps) {
  const bgColorRef = useRef<HTMLInputElement>(null);
  const bgImageRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const [bgColor, setBgColor] = useState<string>(page.bgColor);
  const [bgType, setBgType] = useState<string>(page.bgType);
  const [bgImage, setBgImage] = useState<string>(page.bgImage);
  const [avatar, setAvatar] = useState<string>(user?.image || "/avatar.jpg");

  const handleSavePageInfo = async (formData: FormData) => {
    const result = await savePageInfo(formData);

    if (result) {
      toast.success("Saved");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleBgTypeChange = (value: string) => {
    setBgType(value);
  };

  const upload = async (
    e: ChangeEvent<HTMLInputElement>,
    callback: (link: string) => void
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const data = new FormData();
        data.set("file", file);

        fetch("/api/upload", {
          method: "POST",
          body: data,
        }).then((res) => {
          if (res.ok) {
            res.json().then((link) => {
              callback(link);
              resolve(link);
            });
          } else {
            reject();
          }
        });
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading",
        success: "Uploaded!",
        error: "Something went wrong!",
      });
    }
  };

  const handleBannerChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await upload(e, (link) => {
      setBgImage(link);
    });
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await upload(e, (link) => {
      setAvatar(link);
    });
  };

  return (
    <div className="m-4 shadow-sm grow bg-white">
      <form action={handleSavePageInfo}>
        {/* Banner Image/Color */}
        <div
          className="relative h-48 flex items-center justify-center bg-cover bg-center"
          style={
            bgType === "color"
              ? { backgroundColor: bgColor }
              : { backgroundImage: `url(${bgImage})` }
          }
        >
          <div className="absolute top-2 right-2">
            <div>
              <RadioTogglerButton
                options={[
                  { value: "color", icon: Colorfilter, label: "Color" },
                  { value: "image", icon: ImageIcon, label: "Image" },
                ]}
                defaultValue={page.bgType}
                onChange={handleBgTypeChange}
              />

              {bgType === "color" && (
                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2 rounded-full">
                  <div className="flex gap-2 items-center justify-center">
                    <span className="text-xs font-medium">Banner color: </span>
                    <div
                      onClick={() => bgColorRef.current?.click()}
                      className="rounded-full h-5 w-5 cursor-pointer border border-black"
                      style={{ backgroundColor: bgColor }}
                    />
                    <input
                      type="color"
                      ref={bgColorRef}
                      name="bgColor"
                      defaultValue={page.bgColor}
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="sr-only"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {bgType === "image" && (
            <button
              type="button"
              onClick={() => bgImageRef.current?.click()}
              className="bg-black/50 p-2 rounded-full hover:bg-gray-800/40 transition-all ease-in-out"
            >
              <GalleryAdd color="white" />
              <input type="hidden" name="bgImage" value={bgImage} />
              <input
                type="file"
                ref={bgImageRef}
                onChange={handleBannerChange}
                className="sr-only"
              />
            </button>
          )}
        </div>

        {/* Avatar */}
        <div className="flex ml-12 -mb-12">
          <div className="relative -top-16 w-32 h-32">
            <Image
              src={avatar}
              alt="Avatar"
              fill
              className="rounded-full object-cover border-4 shadow-xl shadow-black/30 border-blue-500"
            />

            <button
              type="button"
              onClick={() => avatarRef.current?.click()}
              className="bg-black/50 p-2 rounded-full absolute bottom-0 right-0 shadow-xl shadow-black/30 hover:bg-gray-800/40 transition-all ease-in-out"
            >
              <GalleryAdd color="white" />
              <input type="hidden" name="avatar" value={avatar} />
              <input
                type="file"
                ref={avatarRef}
                onChange={handleAvatarChange}
                className="sr-only"
              />
            </button>
          </div>
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

          <div className="max-w-64 ml-auto mt-4">
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
