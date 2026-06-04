export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col animate-in slide-in-from-left duration-300">
      {children}
    </div>
  )
}
