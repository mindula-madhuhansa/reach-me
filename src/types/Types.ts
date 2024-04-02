import { Icon } from "iconic-react";

export interface SocialButton {
  id: number;
  key: string;
  label: string;
  icon: Icon;
  placeholder: string;
}

export interface OtherLink {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  url: string;
}
