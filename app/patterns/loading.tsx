export default function LoadingPatternsList() {
  return (
    <div className="p-8 space-y-6">
      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from(Array(6).keys()).map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
  </div>
  );
}
