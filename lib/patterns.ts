import { Locale } from "@/i18n.config";
import { PatternDashboardData } from "./interfaces";
import { clientFetch } from "./proxy";

export async function patterns({ page, pageSize, lang, queryString }: { page: number; pageSize: number, lang: Locale, queryString: string }): Promise<PatternDashboardData> {
    const urlParams = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString()
    });
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
        return Promise.reject(new Error("API_BASE_URL_NOT_CONFIGURED"));
    }
    console.log(`/pattern-builder/patterns/?${queryString}`)
    const response = await clientFetch({ endpoint: `/pattern-builder/patterns/?${queryString}`, lang });

    if (!response.ok) {
        if (response.status === 404) {
            const responseBody = await response.json();

            if (responseBody.detail.includes("Invalid page")) {
                return Promise.reject(new Error("INVALID_PAGE"));
            }
        }
        return Promise.reject(new Error("UNEXPECTED_ERROR"));
    }
    const a = await response.json();
    // console.log(a.results.map((pattern) => pattern.name))
    return a;
}
