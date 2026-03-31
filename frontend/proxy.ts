import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAuth = !!token;
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  if (!isAuth && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/tasks", req.url));
  }

  console.log("PATH:", req.nextUrl.pathname, "TOKEN:", !!token);

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/login"],
};
