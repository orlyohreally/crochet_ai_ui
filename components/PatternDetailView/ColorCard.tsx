import { YarnColor } from "@/lib/interfaces";

export function ColorCard({
  color,
  dict,
}: {
  color: YarnColor;
  dict: { [key: string]: string };
}) {
  const primaryClassName = color.isPrimary
    ? "border-emerald-100 bg-emerald-50/20"
    : "border-gray-100 bg-white";

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border transition-all ${
        primaryClassName
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl shadow-inner border border-gray-200 shrink-0 relative transition-all duration-300"
          style={{ backgroundColor: color.hexCode }}
        />
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900 text-sm md:text-base">
              {color.colorNumber} - {color.name}
            </h4>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            <span className="font-medium text-gray-700">
              {color.yarnLine.brand.name}
            </span>{" "}
            {color.yarnLine.name}
            <span className="mx-1.5 text-gray-300">•</span>
            {color.yarnLine.weightCategory} ({color.yarnLine.weight}
            {dict.gramsUnit} / {color.yarnLine.length}
            {dict.metersUnit})
          </p>
          {color.comment && (
            <p>
              <span className="text-[11px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                {color.comment}
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 md:mt-0 pt-3 md:pt-0 border-t md:border-none border-dashed border-gray-100 text-left md:text-right">
        <span className="text-xs text-gray-400 block">
          {dict.requiredQuantity}
        </span>
        <span className="text-sm font-bold text-gray-800">
          {color.skeinCount} {dict.skeinsUnit}
        </span>
      </div>
    </div>
  );
}
