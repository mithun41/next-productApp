import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // login page
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*", // protect dashboard and subroutes
  ],
};
