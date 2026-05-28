import { PatternDashboardData } from "./interfaces";
import { clientFetch } from "./proxy";

export async function patterns({ page, pageSize }: { page: number; pageSize: number }): Promise<PatternDashboardData> {
    const urlParams = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString()
    });
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
        return Promise.reject(new Error("API_BASE_URL_NOT_CONFIGURED"));
    }

    const response = await clientFetch(`/pattern-builder/patterns/?${urlParams.toString()}`);

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
