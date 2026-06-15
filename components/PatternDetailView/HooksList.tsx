import { PatternHook } from "@/lib/interfaces";

import MaterialItem from "./MaterialItem";

export default function HooksList({
  hooks,
  dict,
}: {
  hooks: PatternHook[];
  dict: { [key: string]: string };
}) {
  if (!hooks || hooks.length === 0) return null;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          {dict.hooksSectionTitle}
        </h4>
        <div className="space-y-2">
          {hooks.map((hook) => (
            <MaterialItem
              key={`${hook.name}-${hook.sizeMm}`}
              subtext={hook.comment || ""}
            >
              {hook.name} {hook.sizeMm} {dict.millimeterUnit}
            </MaterialItem>
          ))}
        </div>
      </div>
    </div>
  );
}
