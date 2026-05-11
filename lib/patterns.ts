import { PatternDashboardData } from "./interfaces";

export async function patterns({ page, pageSize }: { page: number; pageSize: number }): Promise<PatternDashboardData> {
    const urlParams = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString()
    });
    const response = await fetch(`http://localhost:8000/pattern-builder/api/patterns/?${urlParams.toString()}`);

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
