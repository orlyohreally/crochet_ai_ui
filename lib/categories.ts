import { Locale } from "@/i18n.config";
import { CondensedPattern, SearchCategory } from "./interfaces";
import { clientFetch } from "./proxy";

export async function categories({ lang }: { lang: Locale }): Promise<SearchCategory[]> {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
        return Promise.reject(new Error("API_BASE_URL_NOT_CONFIGURED"));
    }

    const response = await clientFetch({ endpoint: "/pattern-builder/categories/", lang: lang });

    if (!response.ok) {
        return Promise.reject(new Error("UNEXPECTED_ERROR"));
    }
    return response.json();
}
