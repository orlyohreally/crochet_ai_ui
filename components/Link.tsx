"use client";

import { useLang } from "@/context/LangContext";
import NextLink from "next/link";

import { ComponentProps } from "react";

// Inherit all types and props from Next.js Link component
type LocalizedLinkProps = ComponentProps<typeof NextLink>;

export default function Link({ href, children, ...props }: LocalizedLinkProps) {
  const { lang } = useLang();

  // Convert href to string if it happens to be a URL object
  const originalPath = typeof href === "string" ? href : href.pathname || "";

  // 1. Guard against external links, anchors, or mailto links
  const isExternal =
    originalPath.startsWith("http") || originalPath.startsWith("//");
  const isSpecial =
    originalPath.startsWith("mailto:") ||
    originalPath.startsWith("tel:") ||
    originalPath.startsWith("#");

  // 2. Prevent duplicating the locale prefix if it's already there
  const hasLocale =
    originalPath.startsWith(`/${lang}/`) || originalPath === `/${lang}`;

  // 3. Construct the final localized href
  let localizedHref = href;

  if (!isExternal && !isSpecial && !hasLocale && lang) {
    // Handle the root path '/' safely so it becomes '/en' instead of '/en/'
    localizedHref =
      originalPath === "/" ? `/${lang}` : `/${lang}${originalPath}`;
  }

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
