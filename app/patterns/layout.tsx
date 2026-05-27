export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen animate-in slide-in-from-left duration-300">
      {children}
      </div>
  )
}
