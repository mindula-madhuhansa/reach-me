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
    displayName: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    bgType: {
      type: String,
      default: "color",
    },
    bgColor: {
      type: String,
      default: "#000",
    },
    bgImage: {
      type: String,
      default: "",
    },
    buttons: {
      type: Object,
      default: {},
    },
    links: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true }
);
