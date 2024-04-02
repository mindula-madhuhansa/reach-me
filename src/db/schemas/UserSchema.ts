import { Schema } from "mongoose";

import { IUser } from "@/types/User";

export const UserSchema: Schema<IUser> = new Schema<IUser>({
  name: String,
  email: String,
  image: String,
});
