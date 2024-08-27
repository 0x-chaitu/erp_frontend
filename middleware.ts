import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, TENANT_COOKIE_NAME } from "./constants";
import { verifyIdToken } from "@/lib/firebase/authFirebaseAdmin";




export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME);

  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host");

  let subdomain = ""
  if (hostname) {
    subdomain = hostname.split(".")[0];
  }

  if (!cookie) {
    url.pathname = "/login"
    return NextResponse.rewrite(
      new URL(`/${subdomain}${url.pathname}`, request.url)
    );
  }

  try {


    const user = await verifyIdToken(cookie?.value || "")
    let res = NextResponse.rewrite(
      new URL(`/${subdomain}${url.pathname + url.search}`, request.url)
    )

    if (url.pathname === "/" || url.pathname === "/login") {

      res = NextResponse.redirect(
        new URL(`/dashboard`, request.url)
      )

    }

    res.headers.set('X-Tenant', user.firebase.tenant || "")
    return res;
  } catch (error) {
    console.log(error);

  }



  return NextResponse.rewrite(
    new URL(`/${subdomain}"/login"`, request.url)
  );

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */

    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
