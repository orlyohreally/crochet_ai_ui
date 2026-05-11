import Link from "next/link";

import { ChevronLeftIcon } from '@heroicons/react/24/solid'

export default function PreviousPageLink({
  href,
  isDisabled,
}: {
  href: string;
  isDisabled: boolean;
}) {

  return (
      <Link
        href={href}
        className={`p-2 rounded-xl border border-gray-200 transition-colors ${
          isDisabled ? 'pointer-events-none opacity-30' : 'hover:bg-gray-50'
        }`}
        aria-disabled={isDisabled}
      >
        <ChevronLeftIcon className="size-5" />
      </Link>
  )}
