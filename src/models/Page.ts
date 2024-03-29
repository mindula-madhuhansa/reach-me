import mongoose, { Schema, Document, Model } from "mongoose";

interface IPage extends Document {
  uri: string;
  owner: string;
}

const PageSchema: Schema<IPage> = new Schema<IPage>(
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

export const Page: Model<IPage> =
  mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);
