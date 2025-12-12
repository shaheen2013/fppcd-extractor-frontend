export { default as proxy } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/report", "/admin/:path*"], // add more routes for protection as needed
};
