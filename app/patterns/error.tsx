'use client'
 
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center animate-in fade-in duration-500">
      {/* Subtle background glow or icon only */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-pink-100 blur-2xl opacity-30 rounded-full" />
        <InformationCircleIcon className="size-12 text-pink-500 relative" />
      </div>

      <h2 className="text-3xl font-light text-gray-800 mb-3 tracking-tight">
        Something is not right
      </h2>
      
      <p className="text-gray-500 max-w-sm mb-10 leading-relaxed">
        {error.message.includes('INVALID_PAGE') 
          ? "We couldn't find that page of patterns. It might have been moved or deleted."
          : "We're having trouble reaching the database. A quick refresh might fix it."}
      </p>

      <div className="flex items-center gap-6">
        <button
          onClick={() => unstable_retry()}
          className="text-pink-600 font-semibold hover:text-pink-700 transition-colors underline underline-offset-8 decoration-pink-200 hover:decoration-pink-500"
        >
          Try again
        </button>
        
        <Link
          href="/patterns?page=1"
          className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-black transition-all hover:shadow-lg active:scale-95"
        >
          Back to Start
        </Link>
      </div>
    </div>
  )
}
