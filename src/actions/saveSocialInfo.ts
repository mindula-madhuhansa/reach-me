"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { Page } from "@/db/models/Page";
import { authOptions } from "@/libs/authOptions";

export const saveSocialInfo = async (formData: FormData) => {
  mongoose.connect(process.env.MONGODB_URI!);

  const session = await getServerSession(authOptions);

  if (session) {
    const socialBtnValues: Record<string, string> = {};

    formData.forEach((value: FormDataEntryValue, key: string) => {
      socialBtnValues[key] = value.toString();
    });

    const dataToUpdate = { buttons: socialBtnValues };

    await Page.updateOne({ owner: session.user?.email! }, dataToUpdate);

    return true;
  }

  return false;
};
