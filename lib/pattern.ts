import { clientFetch } from "./proxy";

import { Pattern } from "./interfaces";
import { Locale } from "@/i18n.config";


export async function pattern({slug, lang}: {slug: string, lang: Locale}): Promise<Pattern> {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
        return Promise.reject(new Error("API_BASE_URL_NOT_CONFIGURED"));
    }

    const response = await clientFetch({endpoint: `/pattern-builder/patterns/${slug}`, lang: lang});

    if (!response.ok) {
        if (response.status === 404) {
            const responseBody = await response.json();

            if (responseBody.detail.includes("Invalid page")) {
                return Promise.reject(new Error("INVALID_PAGE"));
            }
        }

        return Promise.reject(new Error("UNEXPECTED_ERROR"));
    }
    return response.json();
}
