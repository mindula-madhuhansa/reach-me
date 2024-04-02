import mongoose, { Model } from "mongoose";

import { UserSchema } from "@/db/schemas/UserSchema";
import { IUser } from "@/types/User";

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
