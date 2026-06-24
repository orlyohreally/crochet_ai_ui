import { PatternMaterial } from "@/lib/interfaces";

import MaterialItem from "./MaterialItem";

export default function NotionCategory({
  categoryName,
  dict,
  notions,
}: {
  categoryName: string;
  dict: { [key: string]: string };
  notions: PatternMaterial[];
}) {
  function formatUnit(unitCode: string): string {
    const unit = {
      cm: dict.centimeterUnit,
      g: dict.gramsUnit,
      m: dict.metersUnit,
      mm: dict.millimeterUnit,
      none: "",
      pcs: dict.piecesUnit,
    }[unitCode] as string;

    return unit || "";
  }

  function formatMaterialSize(width: number, height: number, unitCode: string) {
    if (!width) return "";

    let sizeString = `${width}`;

    if (height && height != width) {
      sizeString += `x${height}`;
    }

    const unitLabel = {
      pcs: dict.piecesUnit,
      g: dict.gramsUnit,
      mm: dict.millimeterUnit,
      cm: dict.centimeterUnit,
      m: dict.metersUnit,
      none: "",
    }[unitCode] as string;
    return `${sizeString} ${unitLabel}`;
  }

  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
        {categoryName}
      </h4>
      <div className="space-y-2">
        {notions.map((item, idx) => (
          <MaterialItem
            key={idx}
            badgeText={item.isRequired ? "" : dict.isOptional}
            subtext={item.comment || ""}
            additionalChildren={
              <>
                {item.amount} {formatUnit(item.unit)}
              </>
            }
          >
            {item.name}{" "}
            {formatMaterialSize(item.sizeWidth, item.sizeHeight, item.sizeUnit)}
          </MaterialItem>
        ))}
      </div>
    </div>
  );
}
