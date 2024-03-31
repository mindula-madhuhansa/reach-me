import { model, models } from "mongoose";
import { UserSchema } from "@/db/schemas/UserSchema";

export const User = models?.User || model("User", UserSchema);
