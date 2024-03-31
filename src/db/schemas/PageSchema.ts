import { Schema } from "mongoose";

import { IPage } from "@/types/Page";

export const PageSchema: Schema<IPage> = new Schema<IPage>(
  {
    uri: {
      type: String,
      required: true,
      min: 1,
      unique: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
