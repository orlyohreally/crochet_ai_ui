interface SelectVariantTabProps {
  isActive: boolean;
  onSelect: () => void;
  variantName: string;
}

export function SelectVariantTab({
  isActive,
  onSelect,
  variantName,
}: SelectVariantTabProps) {
  const activityClassName = isActive
    ? "bg-white text-emerald-700 shadow-sm"
    : "text-gray-500 hover:text-gray-900";

  return (
    <button
      onClick={onSelect}
      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
        activityClassName
      }`}
    >
      {variantName}
    </button>
  );
}
