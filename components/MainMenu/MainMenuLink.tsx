"use client";

import Link from "@/components/Link";


export default function MainMenuLink(props: {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
}) {
  const defaultLinkClassNames =
    "text-sm font-bold uppercase tracking-widest transition-colors";
  const isActiveClassNames = props.isActive
    ? "text-gray-900 border-b-2 border-gray-900"
    : "text-gray-400 hover:text-gray-600";
  const className = `${defaultLinkClassNames} ${isActiveClassNames}`;

  return (
    <Link className={className} href={props.href}>
      {props.children}
    </Link>
  );
}
