"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { Page } from "@/db/models/Page";
import { authOptions } from "@/libs/authOptions";

export const savePageInfo = async (formData: FormData) => {
  mongoose.connect(process.env.MONGODB_URI!);

  const session = await getServerSession(authOptions);

  if (session) {
    const dataKeys = [
      "displayName",
      "location",
      "bio",
      "bgType",
      "bgColor",
      "bgImage",
    ];

    const dataToUpdate: Partial<Record<string, string>> = {};

    for (const key of dataKeys) {
      if (formData.has(key)) {
        dataToUpdate[key] = formData.get(key) as string;
      }
    }

    await Page.updateOne({ owner: session.user?.email! }, dataToUpdate);

    return true;
  }

  return false;
};
