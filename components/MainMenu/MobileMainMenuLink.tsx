"use client";

import Link from "../Link";


export default function MobileMainMenuLink(props: { href: string; children: React.ReactNode }) {
  return (
    <Link
      className="block w-full text-left px-3 py-4 rounded-xl text-base font-bold"
      href={props.href}
    >
      {props.children}
    </Link>
  );
}
