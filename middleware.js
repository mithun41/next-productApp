import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // এখানে তোমার login page route দাও
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
