import mongoose, { Model } from "mongoose";

import { IEvent } from "@/types/Event";
import { EventSchema } from "@/db/schemas/EventSchema";

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
