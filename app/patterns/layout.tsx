import Link from "next/link";

import { ChevronLeftIcon } from '@heroicons/react/24/solid'

export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen animate-in slide-in-from-left duration-300">
      <header className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link 
            href="/"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ChevronLeftIcon className="size-5" />
          </Link>
          <h1 className="font-bold text-gray-900 text-lg">Patterns Library</h1>
        </div>
      </header>
      {children}
      </div>
  )
}
