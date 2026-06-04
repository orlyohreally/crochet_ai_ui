import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { I18N_CONFIG } from './i18n.config';

function getBrowserLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, I18N_CONFIG.locales, I18N_CONFIG.defaultLocale);
}

export function proxy(request: NextRequest) {
  const hasLocaleCookie = request.cookies.has(I18N_CONFIG.cookieName);

  if (!hasLocaleCookie) {
    const detectedLocale = getBrowserLocale(request);
    request.cookies.set(I18N_CONFIG.cookieName, detectedLocale);

    // Clone the request headers into the next response step context
    const response = NextResponse.next({
      request: {
        headers: new Headers(request.headers),
      },
    });

    response.cookies.set(I18N_CONFIG.cookieName, detectedLocale, {
      path: "/",
      maxAge: I18N_CONFIG.cookieMaxAge,
      sameSite: I18N_CONFIG.cookieSameSite,
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
