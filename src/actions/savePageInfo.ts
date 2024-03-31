"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { Page } from "@/db/models/Page";
import { authOptions } from "@/libs/authOptions";

export const savePageInfo = async (formData: FormData) => {
  mongoose.connect(process.env.MONGODB_URI!);

  const session = await getServerSession(authOptions);

  if (session) {
    const displayName = formData.get("displayName");
    const location = formData.get("location");
    const bio = formData.get("bio");

    await Page.updateOne(
      { owner: session.user?.email! },
      { displayName, location, bio }
    );

    return true;
  }

  return false;
};
