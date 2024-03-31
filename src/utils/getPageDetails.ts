import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { Page } from "@/models/Page";
import { authOptions } from "@/libs/authOptions";

export const getPageDetails = async () => {
  const session = await getServerSession(authOptions);

  mongoose.connect(process.env.MONGODB_URI!);

  const results = await Page.findOne({
    owner: session?.user?.email ?? undefined,
  });

  return results;
};
