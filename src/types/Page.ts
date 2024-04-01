import { Document } from "mongoose";
import { OtherLink } from ".";

export interface IPage extends Document {
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
}
