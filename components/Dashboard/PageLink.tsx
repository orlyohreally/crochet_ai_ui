"use client";

import Link from "next/link";

export default function PageLink({
  href,
  isActive,
  page,
}: {
  href: string;
  isActive: boolean;
  page: number;
}) {
  const className = `w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
    isActive
      ? "bg-pink-500 text-white shadow-md"
      : "text-gray-500 hover:bg-gray-100"
  }`;

  return (
    <Link
      key={page}
      href={href}
      className={className}
      aria-current={isActive ? "page" : undefined}
    >
      {page}
    </Link>
  );
}
