import { Locale } from "@/i18n.config";
import { NestedDictionary } from "@/lib/interfaces";
import "server-only";

const loaders = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default),
  he: () => import("@/dictionaries/ru.json").then((m) => m.default),
};

export async function createTranslationProxy(lang: Locale): Promise<NestedDictionary> {
  const baseData = await (loaders[lang] ? loaders[lang] : loaders["ru"])();

  // Recursive handler to proxy nested object translations
  const createRecursiveProxy = (targetData: NestedDictionary, path: string = ""): NestedDictionary => {
    return new Proxy(targetData || {}, {
      get(target, property: string) {
        if (typeof property === "symbol") return Reflect.get(target, property);

        const currentPath = path ? `${path}.${property}` : property;
        const val = target[property];

        if (val && typeof val === "object") {
          return createRecursiveProxy(val, currentPath);
        }

        // Fallback: Returns the missing key path if the translation string doesn't exist
        return val !== undefined ? val : `[Missing translation: ${currentPath}]`;
      },
    });
  };

  return createRecursiveProxy(baseData);
}

/**
 * Strips away proxy wrappers and returns a standard, plain JavaScript object
 * that can safely cross the Next.js Server-to-Client component boundary.
 */
export async function getPlainDictionary(lang: Locale): Promise<NestedDictionary> {
  const proxyDict = await createTranslationProxy(lang);

  return JSON.parse(JSON.stringify(proxyDict));
}
