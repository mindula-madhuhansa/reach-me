import mongoose, { Model } from "mongoose";

import { PageSchema } from "@/db/schemas/PageSchema";
import { IPage } from "@/types/Page";

export const Page: Model<IPage> =
  mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);
