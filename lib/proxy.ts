import { Locale } from "@/i18n.config";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "";

export async function clientFetch({ endpoint, lang, options = {} }: { endpoint: string, lang: Locale, options?: RequestInit }) {
  const headers = new Headers(options.headers);

  headers.set('Accept-Language', lang);

  const requestUrl = `${apiBaseUrl}${endpoint}`;

  return fetch(requestUrl, {
    ...options,
    headers,
  });

}
