import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import Link from "@/components/Link";

export default function PreviousPageLink({
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
        <ChevronLeftIcon className="size-5" />
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      <ChevronLeftIcon className="size-5" />
    </Link>
  );
}
