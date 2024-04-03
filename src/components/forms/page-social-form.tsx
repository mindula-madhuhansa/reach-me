"use client";

import { Add, LayoutMaximize, Ram, Trash } from "iconic-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";

import { socialButtons } from "@/constants/social-media-buttons";
import SectionBox from "@/components/section-box";
import SubmitButton from "@/components/buttons/submit-button";
import { IPage } from "@/types/Page";
import { SocialButton } from "@/types/Types";
import { saveSocialInfo } from "@/actions/saveSocialInfo";

export default function PageSocialForm({ page }: { page: IPage }) {
  const pageSocialButtonKeys = Object.keys(page.buttons || {});
  const pageSocialButton = pageSocialButtonKeys
    .map((key) => socialButtons.find((b) => b.key === key))
    .filter((button) => button !== undefined) as SocialButton[];

  const [activeSocialButtons, setActiveSocialButtons] = useState<
    SocialButton[]
  >(pageSocialButton || []);

  useEffect(() => {
    if (page && page.buttons) {
      const pageSocialButtonKeys = Object.keys(page.buttons);
      const pageSocialButton = pageSocialButtonKeys
        .map((key) => socialButtons.find((b) => b.key === key))
        .filter((button) => button !== undefined) as SocialButton[];

      setActiveSocialButtons(pageSocialButton);
    }
  }, [page]);

  const availableSocialButtons = socialButtons.filter(
    (a) => !activeSocialButtons.find((b) => a.key === b.key)
  );

  const addSocialMediaToProfile = (socialBtn: SocialButton) => {
    setActiveSocialButtons((prev) => {
      return [...prev, socialBtn];
    });
  };

  const handleSaveSocialInfo = async (formData: FormData) => {
    const result = await saveSocialInfo(formData);

    if (result) {
      toast.success("Saved");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const removeSocialButton = ({ key: keyToRemove }: SocialButton) => {
    setActiveSocialButtons((prev) => {
      return prev.filter((btn) => btn.key !== keyToRemove);
    });
  };

  return (
    <SectionBox>
      <form action={handleSaveSocialInfo} className="p-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Social Media</h2>

        {/* Active Social Icons */}
        <ReactSortable
          list={activeSocialButtons}
          setList={setActiveSocialButtons}
          handle=".handle"
        >
          {activeSocialButtons.map((activeBtn) => (
            <div key={activeBtn.key} className="mb-4 px-4 flex items-center">
              <div className="flex w-full">
                <div className="flex min-w-32 md:min-w-48 gap-2 items-center rounded-l-full p-2 pl-4 bg-blue-500 text-white">
                  <LayoutMaximize className="handle w-5 h-5 cursor-grabbing text-gray-300 hover:text-white transition-all ease-in" />
                  <div className="border h-full mx-1" />
                  <activeBtn.icon className="hidden md:block w-5 h-5" />
                  <span className="capitalize text-xs md:text-base">
                    {activeBtn.label}
                  </span>
                </div>
                <input
                  type="text"
                  name={activeBtn.key}
                  placeholder={activeBtn.placeholder}
                  defaultValue={page.buttons && page.buttons[activeBtn.key]}
                  className="active-social-input"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSocialButton(activeBtn)}
                className="p-1.5 md:p-2 bg-gray-200 hover:text-red-500 hover:bg-red-200 transition-all ease-out"
              >
                <Trash className="h-6 w-6" variant="Bold" />
              </button>
            </div>
          ))}
        </ReactSortable>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6 border border-gray-300 p-6 rounded-md mx-4">
          {/* All Social Icons */}
          {availableSocialButtons.map((socialBtn) => (
            <button
              key={socialBtn.key}
              onClick={() => addSocialMediaToProfile(socialBtn)}
              className="social-media-button "
            >
              <div className="flex items-center gap-2">
                <socialBtn.icon size={20} />
                <span className="capitalize mr-2">{socialBtn.label}</span>
              </div>
              <Add size={20} />
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <div className="max-w-64 mx-auto md:ml-auto md:mx-0 mt-4">
          <SubmitButton>
            <Ram size="24" />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
