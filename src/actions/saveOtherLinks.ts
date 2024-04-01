"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { Page } from "@/db/models/Page";
import { authOptions } from "@/libs/authOptions";
import { OtherLink } from "@/types";

export const saveOtherLinks = async (links: OtherLink[]) => {
  mongoose.connect(process.env.MONGODB_URI!);

  const session = await getServerSession(authOptions);

  if (session) {
    await Page.updateOne({ owner: session.user?.email! }, { links: links });

    return true;
  }

  return false;
};
