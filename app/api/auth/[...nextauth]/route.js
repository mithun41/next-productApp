import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Temporary in-memory users store
let users = [];

export const authOptions = {
  providers: [
    // 1️⃣ Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // 2️⃣ Credentials login/sign-up
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if user exists
        let user = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        // If user does not exist, create (sign-up)
        if (!user) {
          user = {
            id: Date.now(),
            email: credentials.email,
            password: credentials.password,
          };
          users.push(user);
        }

        // Return user object to NextAuth
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
