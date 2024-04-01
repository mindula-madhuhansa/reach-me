import {
  Call,
  Facebook as FacebookIcon,
  Global,
  Instagram as InstagramIcon,
  Sms,
  Spotify as SpotifyIcon,
  Whatsapp,
  Youtube,
} from "iconic-react";

export const socialButtons = [
  {
    key: "email",
    label: "email",
    icon: Sms,
    placeholder: "johndoe@example.com",
  },
  {
    key: "mobile",
    label: "mobile",
    icon: Call,
    placeholder: "+94 123 456 789",
  },
  {
    key: "website",
    label: "website",
    icon: Global,
    placeholder: "www.example.com",
  },
  {
    key: "instagram",
    label: "instagram",
    icon: InstagramIcon,
    placeholder: "https://www.instagram.com/",
  },
  {
    key: "facebook",
    label: "facebook",
    icon: FacebookIcon,
    placeholder: "https://www.facebook.com/",
  },
  {
    key: "youtube",
    label: "youtube",
    icon: Youtube,
    placeholder: "https://www.youtube.com/",
  },
  {
    key: "whatsapp",
    label: "whatsapp",
    icon: Whatsapp,
    placeholder: "https://web.whatsapp.com/",
  },
  {
    key: "spotify",
    label: "spotify",
    icon: SpotifyIcon,
    placeholder: "https://open.spotify.com/",
  },
];
