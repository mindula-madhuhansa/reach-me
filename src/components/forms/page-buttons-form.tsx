"use client";

import { User } from "next-auth";
import { Add, Icon } from "iconic-react";

import SectionBox from "@/components/section-box";
import { IPage } from "@/types/Page";
import { socialButtons } from "@/constants/social-media-buttons";
import { useState } from "react";

type PageButtonsFormProps = {
  page: IPage;
  user: Partial<User>;
};

type SocialButton = {
  key: string;
  label: string;
  icon: Icon;
};

export default function PageButtonsForm({ page, user }: PageButtonsFormProps) {
  const [activeSocialButtons, setActiveSocialButtons] = useState<
    SocialButton[]
  >([]);

  const availableSocialButtons = socialButtons.filter(
    (a) => !activeSocialButtons.find((b) => a.key === b.key)
  );

  const addSocialMediaToProfile = (socialBtn: SocialButton) => {
    setActiveSocialButtons((prev) => {
      return [...prev, socialBtn];
    });
  };

  return (
    <SectionBox>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Social Media</h2>
        {activeSocialButtons.map((activeBtn) => (
          <div key={activeBtn.key}>{activeBtn.label}</div>
        ))}
        <div className="flex flex-wrap gap-2">
          {availableSocialButtons.map((socialBtn) => (
            <button
              key={socialBtn.key}
              onClick={() => addSocialMediaToProfile(socialBtn)}
              className={`flex items-center gap-2 p-2 bg-gray-200 shadow-md rounded-full text-sm border border-blue-500 hover:bg-blue-500 hover:text-white transition-all ease-in`}
            >
              <socialBtn.icon size={20} />
              <span className="capitalize mr-2">{socialBtn.label}</span>
              <Add size={20} />
            </button>
          ))}
        </div>
      </div>
    </SectionBox>
  );
}
