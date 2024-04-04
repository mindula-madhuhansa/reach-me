import { model, models } from "mongoose";

import { EventSchema } from "@/db/schemas/EventSchema";

export const Event = models.Event || model("Event", EventSchema);
