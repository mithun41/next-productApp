// File: /app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/db"; // আপনার ডেটাবেস কানেকশন
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    // 1️⃣ Google OAuth (অপরিবর্তিত)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // 2️⃣ Credentials Provider (এটিকে আমরা পরিবর্তন করব)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ডেটাবেসের সাথে কানেক্ট করুন
        const client = await clientPromise;
        const db = client.db("productApp");
        const usersCollection = db.collection("users");

        // ডেটাবেস থেকে ইমেইল দিয়ে ইউজার খুঁজুন
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        // যদি ইউজার না পাওয়া যায়
        if (!user) {
          throw new Error(
            "No user found with this email. Please sign up first."
          );
        }

        // ডেটাবেসে থাকা হ্যাশড পাসওয়ার্ডের সাথে ইনপুট পাসওয়ার্ড তুলনা করুন
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password.");
        }

        // যদি সবকিছু ঠিক থাকে, ইউজার অবজেক্ট রিটার্ন করুন
        // নিরাপত্তার জন্য পাসওয়ার্ড বাদে বাকি তথ্য রিটার্ন করুন
        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
