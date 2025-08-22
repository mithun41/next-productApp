import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs"; // optional: for password hashing

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = (await clientPromise).db();
        const usersCollection = db.collection("users");

        let user = await usersCollection.findOne({ email: credentials.email });

        if (user) {
          // If using hashed password, compare:
          // const isValid = await bcrypt.compare(credentials.password, user.password);
          // if (!isValid) return null;
          return user;
        } else {
          // Sign-up new user
          const newUser = {
            email: credentials.email,
            password: credentials.password, // ideally hash this
          };
          const result = await usersCollection.insertOne(newUser);
          newUser.id = result.insertedId;
          return newUser;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
