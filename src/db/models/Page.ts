import { model, models } from "mongoose";

import { PageSchema } from "@/db/schemas/PageSchema";

export const Page = models.Page || model("Page", PageSchema);
