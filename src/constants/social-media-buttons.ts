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
    id: 1,
    key: "email",
    label: "email",
    icon: Sms,
    placeholder: "johndoe@example.com",
  },
  {
    id: 2,
    key: "mobile",
    label: "mobile",
    icon: Call,
    placeholder: "+94 123 456 789",
  },
  {
    id: 3,
    key: "website",
    label: "website",
    icon: Global,
    placeholder: "www.example.com",
  },
  {
    id: 4,
    key: "instagram",
    label: "instagram",
    icon: InstagramIcon,
    placeholder: "https://www.instagram.com/",
  },
  {
    id: 5,
    key: "facebook",
    label: "facebook",
    icon: FacebookIcon,
    placeholder: "https://www.facebook.com/",
  },
  {
    id: 6,
    key: "youtube",
    label: "youtube",
    icon: Youtube,
    placeholder: "https://www.youtube.com/",
  },
  {
    id: 7,
    key: "whatsapp",
    label: "whatsapp",
    icon: Whatsapp,
    placeholder: "https://web.whatsapp.com/",
  },
  {
    id: 8,
    key: "spotify",
    label: "spotify",
    icon: SpotifyIcon,
    placeholder: "https://open.spotify.com/",
  },
];
