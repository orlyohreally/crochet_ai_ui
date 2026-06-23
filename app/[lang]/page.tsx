import { featuredPatterns as getFeaturedPatters } from "@/lib/featured";

import Home from "@/components/Home";
import { Locale } from "@/i18n.config";

import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isRu = lang === "ru";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const imageUrl = `${siteUrl}${isRu ? "knitkaAI_banner_ru" : "knitkaAI_banner_en.png"}`;
  const title = isRu
    ? "KnitkaAI | Умная система для создания вязаных вещей"
    : "KnitkaAI | The intelligent engine for handcrafted designs";
  const description = isRu
    ? "Ищите схемы по названию, типу пряжи, и легко выбирайте подходящие версии одной и той же модели."
    : "Discover a smarter way to craft. Multi-dimensional search helps you find crochet patterns by name, yarn type, or hook size.";

  const keywordsEn = [
    "AI crochet engine",
    "crochet pattern search engine",
    "yarn matching tool",
    "amigurumi pattern database",
  ];
  const keywordsRu = [
    "схемы вязания крючком",
    "поиск схем амигуруми",
    "подбор схемы вязания крючком по пряже",
    "вязание с искусственным интеллектом",
    "каталог описаний вязания крючком",
  ];

  return {
    title,
    description,
    alternates: {
      canonical: siteUrl,
      languages: {
        en: `${siteUrl}en`,
        ru: `${siteUrl}ru`,
      },
    },
    keywords: isRu ? keywordsRu : keywordsEn,
    openGraph: {
      title,
      description:
        "Find crochet patterns fluidly by name, yarn type, or gauge, and effortlessly track custom versions of the exact same design.",
      url: siteUrl,
      siteName: "KnitkaAI",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: isRu
            ? "Умная система для создания вязаных вещей"
            : "The intelligent engine for handcrafted designs",
        },
      ],
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const featuredPatterns = getFeaturedPatters({ lang });
  return <Home featuredPatterns={featuredPatterns} />;
}
