import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/products",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
