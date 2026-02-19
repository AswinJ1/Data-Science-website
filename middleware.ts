import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // /admin routes — ADMIN only
    if (path.startsWith("/admin")) {
      if (token?.role === "ADMIN") {
        return NextResponse.next();
      }
      // HR trying to access /admin → redirect to /hr
      if (token?.role === "HR") {
        return NextResponse.redirect(new URL("/hr", req.url));
      }
      // Applicants → /dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // /hr routes — HR only
    if (path.startsWith("/hr")) {
      if (token?.role === "HR") {
        return NextResponse.next();
      }
      // Admin can also access HR panel if needed
      if (token?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      // Applicants → /dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // /dashboard routes — applicants only
    if (path.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      // Admin/HR shouldn't be in /dashboard — redirect to their panel
      if (token?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      if (token?.role === "HR") {
        return NextResponse.redirect(new URL("/hr", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        if (
          path.startsWith("/admin") ||
          path.startsWith("/hr") ||
          path.startsWith("/dashboard")
        ) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/hr/:path*", "/dashboard/:path*"],
};
