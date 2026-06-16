import { cookies } from 'next/headers';
import { I18N_CONFIG } from '@/i18n.config';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "";

export async function clientFetch(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const currentLocale = cookieStore.get(I18N_CONFIG.cookieName)?.value || I18N_CONFIG.defaultLocale;
  const headers = new Headers(options.headers);

  headers.set('Accept-Language', currentLocale);

  const requestUrl = `${apiBaseUrl}${endpoint}`;

  return fetch(requestUrl, {
    ...options,
    headers,
  });

}
