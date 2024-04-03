import { Schema } from "mongoose";

import { IEvent } from "@/types/Event";

export const EventSchema: Schema<IEvent> = new Schema<IEvent>(
  {
    type: String, // click or view
    page: String,
    uri: String, // reach name / link
  },
  { timestamps: true }
);
