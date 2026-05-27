"use server";

import { cookies } from "next/headers";
import { I18N_CONFIG } from "@/i18n.config";

export async function setLanguageCookie(locale: string) {
  const cookieStore = await cookies();
  
  cookieStore.set(I18N_CONFIG.cookieName, locale, {
    path: "/",
    maxAge: I18N_CONFIG.cookieMaxAge,
    sameSite: I18N_CONFIG.cookieSameSite,
  });
}
