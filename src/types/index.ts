import { Icon } from "iconic-react";

export type SocialButton = {
  id: number;
  key: string;
  label: string;
  icon: Icon;
  placeholder: string;
};

export type OtherLink = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  url: string;
};
