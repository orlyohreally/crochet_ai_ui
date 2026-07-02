export default function BooleanFilter({
  filterLabel,
  undefinedValueLabel,
  trueValueLabel,
  falseValueLabel,
  onValueChange,
  value,
}: {
  filterLabel: string;
  undefinedValueLabel: string;
  trueValueLabel: string;
  falseValueLabel: string;
  onValueChange: (value?: boolean) => void;
  value?: boolean;
}) {
    console.log("value", value)
  return (
    <div className="flex items-center shrink-0">
      <div
        role="radiogroup"
        aria-label={filterLabel}
        className="bg-zinc-100 p-0.5 rounded-lg flex border border-gray-200"
      >
        <button
          type="button"
          role="radio"
          aria-checked={value === undefined}
          onClick={() => onValueChange()}
          className={`px-2 py-0.5 text-[11px] rounded-md font-medium capitalize transition-all ${
            value === undefined
              ? "bg-white text-gray-950 shadow-xs"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {undefinedValueLabel}
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={value === true}
          onClick={() => onValueChange(true)}
          className={`px-2 py-0.5 text-[11px] rounded-md font-medium capitalize transition-all ${
            value === true
              ? "bg-white text-gray-950 shadow-xs"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {trueValueLabel}
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={value === false}
          onClick={() => onValueChange(false)}
          className={`px-2 py-0.5 text-[11px] rounded-md font-medium capitalize transition-all ${
            value === false
              ? "bg-white text-gray-950 shadow-xs"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {falseValueLabel}
        </button>
      </div>
    </div>
  );
}
