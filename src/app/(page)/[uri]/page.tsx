import { Location, Link21 } from "iconic-react";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Page } from "@/db/models/Page";
import { User } from "@/db/models/User";
import { socialIcons } from "@/constants/social-media-buttons";
import { Event } from "@/db/models/Event";
import { OtherLink } from "@/types/Types";

type ReachMePageProps = {
  params: {
    uri: string;
  };
};

function buttonLink(key: string, value: string) {
  if (key === "mobile") {
    return `tel:${value}`;
  }
  if (key === "email") {
    return `mailto:${value}`;
  }
  return value;
}

export default async function ReachMePage({ params }: ReachMePageProps) {
  mongoose.connect(process.env.MONGODB_URI!);

  const page = await Page.findOne({ uri: params.uri });
  const user = await User.findOne({ email: page?.owner });

  if (!page || !user) {
    return notFound();
  }

  await Event.create({ uri: params.uri, page: params.uri, type: "view" });

  return (
    <div className="bg-gradient-to-b from-neutral-950 to-neutral-600 text-white min-h-screen">
      <div
        className="h-48 bg-neutral-400 bg-cover bg-center ="
        style={
          page?.bgType === "color"
            ? { backgroundColor: page?.bgColor }
            : { backgroundImage: `url(${page?.bgImage})` }
        }
      ></div>
      <Image
        src={user?.image || "/avatar.jpg"}
        alt="Avatar"
        height={256}
        width={256}
        className="aspect-square rounded-full object-cover h-32 w-32 relative -top-16 flex mx-auto -mb-12"
      />
      <h2 className="text-xl md:text-2xl text-center">{page?.displayName}</h2>
      <h3 className="text-white/70 flex items-center justify-center text-center gap-2 text-xs md:text-sm max-w-xs md:max-w-2xl mx-auto">
        <Location size={20} />
        <span>{page?.location}</span>
      </h3>
      <div className="max-w-lg mx-auto mt-3">
        <p className="text-center md:text-sm max-w-xs md:max-w-2xl mx-auto">
          {page?.bio}
        </p>
      </div>

      <div className="flex gap-3 justify-center mt-6 pb-4">
        {Object.keys(page?.buttons || {}).map((buttonKey) => {
          const SocialIcon = socialIcons[buttonKey as keyof typeof socialIcons];
          return (
            <Link
              key={buttonKey}
              target="_blank"
              href={buttonLink(buttonKey, page?.buttons[buttonKey]!)}
              className="rounded-full bg-white text-neutral-800 p-1.5 flex items-center justify-center hover:scale-105 hover:text-blue-500 transition-all ease-out"
            >
              <SocialIcon className="w-6 h-6" variant="Bold" />
            </Link>
          );
        })}
      </div>

      <div className="mt-6 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {page?.links.map((link: OtherLink) => (
          <Link
            key={link.url}
            ping={`${process.env.BASE_URL}/api/click?url=${btoa(
              link.url
            )}&page=${page.uri}`}
            target="_blank"
            href={link.url}
            className="flex bg-neutral-600 p-2 h-24 w-72 hover:scale-105 transition-all ease-out border-2 border-white/50 rounded-md"
          >
            <div className="bg-neutral-700 aspect-square relative -left-4 -top-4 h-16 w-16">
              {link.icon ? (
                <Image
                  src={link.icon}
                  alt="Icon"
                  fill
                  className="aspect-square object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full border border-dashed">
                  <Link21 size={32} />
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <div className="max-w-48">
                <h3 className="text-sm font-bold ">{link.title}</h3>
                <p className="mt-1 text-xs text-white/50 overflow-hidden overflow-ellipsis h-8">
                  {link.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
