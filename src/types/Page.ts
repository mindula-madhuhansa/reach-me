import { OtherLink } from "@/types/Types";
import { Date, ObjectId } from "mongoose";

export interface IPage {
  _id: ObjectId;
  uri: string;
  owner: string;
  displayName: string;
  location: string;
  bio: string;
  bgType: string;
  bgColor: string;
  bgImage: string;
  buttons: { [key: string]: string };
  links: OtherLink[];
  createdAt: Date;
  updatedAt: Date;
}
