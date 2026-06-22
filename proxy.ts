import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
  const { pathname } = request.nextUrl;
  
  // Check if the path already contains a supported locale
  const pathnameHasLocale = I18N_CONFIG.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;
  const detectedLocale = getBrowserLocale(request);

  // Otherwise, redirect to default locale (or analyze Accept-Language headers here)
  request.nextUrl.pathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, static files, images)
    '/((?!_next|assets|favicon.ico|.*\\..*).*)',
  ],
};
