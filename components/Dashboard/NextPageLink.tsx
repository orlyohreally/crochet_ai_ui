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

  if (isDisabled) {
    return (
      <span className={className} aria-disabled="true">
        <ChevronRightIcon className="size-5" />
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      <ChevronRightIcon className="size-5" />
    </Link>
  );
}
