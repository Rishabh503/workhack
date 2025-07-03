// middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Adjust route matching here
export const config = {
  matcher: [
    "/((?!_next|.*\\..*|favicon.ico).*)", // skip static files and _next
    "/", // include root route
    "/(api|trpc)(.*)", // include API and TRPC
  ],
};
