import { Label } from "@/lib/interfaces";

export default function PatternLabel({ label }: { label: Label }) {
  return (
    <span
      className="px-2.5 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase rounded-lg border border-gray-100 flex items-center gap-1"
    >
      {label.name}
    </span>
  );
}
