const localesTuple = ["en", "ru"] as const;

export type Locale = (typeof localesTuple)[number];

export const I18N_CONFIG = {
    defaultLocale: "en" as Locale,
    locales: localesTuple as unknown as Locale[],
    localeLabels: {
        en: "English",
        ru: "Русский",
    } as Record<Locale, string>
};
