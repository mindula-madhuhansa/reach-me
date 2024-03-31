import { Schema } from "mongoose";

export const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: Date,
});
