const localesTuple = ["en", "ru"] as const;

export type Locale = (typeof localesTuple)[number];

export const I18N_CONFIG = {
    cookieMaxAge: 60 * 60 * 24 * 365,
    cookieName: "NEXT_LOCALE",
    cookieSameSite: "Lax" as boolean | "lax" | "strict" | "none" | undefined,
    defaultLocale: "en" as Locale,
    locales: localesTuple as unknown as Locale[],
    localeLabels: {
        en: "English",
        ru: "Русский",
    } as Record<Locale, string>
};
