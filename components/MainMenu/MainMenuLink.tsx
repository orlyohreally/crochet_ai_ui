"use client";

import Link from 'next/link'
import { usePathname } from "next/navigation";

export default function MainMenuLink(props: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(props.href);

  const defaultLinkClassNames =
    "text-sm font-bold uppercase tracking-widest transition-colors";
  const isActiveClassNames = isActive
      ? "text-gray-900 border-b-2 border-gray-900"
      : "text-gray-400 hover:text-gray-600";
  const className = `${defaultLinkClassNames} ${isActiveClassNames}`;

  return (
    <Link
      className={className}
      href={props.href}
    >
      {props.children}
    </Link>
  );
}
