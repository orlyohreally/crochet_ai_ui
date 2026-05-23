import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* Visual Number with subtle styling */}
      <h1 className="text-[12rem] font-black text-gray-100 leading-none select-none absolute -z-10">
        404
      </h1>

      <div className="relative">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Page Not Found
        </h2>
        
        <p className="text-gray-500 max-w-md mb-10 leading-relaxed text-lg">
          It looks like this page does not exist yet. The page may have moved, 
          or the link might be broken.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-all hover:shadow-xl active:scale-95"
          >
            Back to Dashboard
          </Link>
          
          <Link
            href="/patterns"
            className="px-10 py-4 text-gray-600 font-semibold hover:text-pink-500 transition-colors"
          >
            View All Patterns
          </Link>
        </div>
      </div>
    </div>
  )
}
