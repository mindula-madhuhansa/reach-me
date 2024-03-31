import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

import clientPromise from "@/libs/mongoClient";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
