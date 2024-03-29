interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}

interface Page {
  uri: string;
  owner: string;
  links: string[];
  buttons: string[];
  theme: string;
}

interface Event {
  eventType: string;
  page: string;
  url: string;
}
