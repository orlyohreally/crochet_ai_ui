import { Pattern } from "./interfaces";

export async function pattern(slug: string): Promise<Pattern> {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
        return Promise.reject(new Error("API_BASE_URL_NOT_CONFIGURED"));
    }

    const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/pattern-builder/patterns/${slug}`);

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
