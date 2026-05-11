import Link from "next/link";

import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function NextPageLink({
  href,
  isDisabled,
}: {
  href: string;
  isDisabled: boolean;
}) {
  const className = `p-2 rounded-xl border border-gray-200 transition-colors ${
    isDisabled ? "pointer-events-none opacity-30" : "hover:bg-gray-50"
  }`;

  return (
    <Link href={href} className={className} aria-disabled={isDisabled}>
      <ChevronRightIcon className="size-5" />
    </Link>
  );
}
