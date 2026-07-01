import { Locale } from "@/i18n.config";
import { CondensedPattern, SearchCategory, SearchLabel } from "./interfaces";
import { clientFetch } from "./proxy";

export async function labels({ lang }: { lang: Locale }): Promise<SearchLabel[]> {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
        return Promise.reject(new Error("API_BASE_URL_NOT_CONFIGURED"));
    }

    const response = await clientFetch({ endpoint: "/pattern-builder/labels/", lang: lang });

    if (!response.ok) {
        return Promise.reject(new Error("UNEXPECTED_ERROR"));
    }
    return response.json();
}
