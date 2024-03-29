"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { Page } from "@/models/Page";
import { authOptions } from "@/utils/authOptions";

export const grabReachName = async (formData: FormData) => {
  const reachName: string = formData.get("reachName") as string;

  if (!reachName) return;

  mongoose.connect(process.env.MONGODB_URI!);

  const existingPageDoc = await Page.findOne({ uri: reachName });

  if (existingPageDoc) {
    return false;
  } else {
    const session = await getServerSession(authOptions);

    if (!session) return;

    return await Page.create({
      uri: reachName,
      owner: session.user?.email,
    });
  }
};
