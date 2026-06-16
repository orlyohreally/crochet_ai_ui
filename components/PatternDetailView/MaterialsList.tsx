import { MATERIAL_TYPE, PatternHook, PatternMaterial } from "@/lib/interfaces";

import HooksList from "./HooksList";
import NotionCategory from "./NotionCategory";

export default function MaterialsList({
  dict,
  hooks,
  materials,
}: {
  dict: { [key: string]: string };
  hooks: PatternHook[];
  materials: PatternMaterial[];
}) {
  const hasMaterials = materials && materials.length > 0;
  const hasHooks = hooks && hooks.length > 0;
  const showPanel = hasMaterials || hasHooks;

  if (!showPanel) return null;

  const eyes = materials.filter((m) => m.category === MATERIAL_TYPE.EYES);
  const noses = materials.filter((m) => m.category === MATERIAL_TYPE.NOSES);
  const buttons = materials.filter((m) => m.category === MATERIAL_TYPE.BUTTONS);
  const notions = materials.filter((m) => m.category === MATERIAL_TYPE.NOTION);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {dict.materialsSectionTitle}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          {dict.materialSectionDescription}
        </p>
      </div>

      <div className="space-y-6">
        {hooks.length > 0 && <HooksList hooks={hooks} dict={dict} />}

        {eyes.length > 0 && (
          <NotionCategory
            categoryName={dict.eyesMaterial}
            notions={eyes}
            dict={dict}
          ></NotionCategory>
        )}
        {noses.length > 0 && (
          <NotionCategory
            categoryName={dict.nosesMaterial}
            notions={noses}
            dict={dict}
          ></NotionCategory>
        )}
        {buttons.length > 0 && (
          <NotionCategory
            categoryName={dict.buttonsMaterial}
            notions={buttons}
            dict={dict}
          ></NotionCategory>
        )}

        {notions.length > 0 && (
          <NotionCategory
            categoryName={dict.otherNotions}
            notions={notions}
            dict={dict}
          ></NotionCategory>
        )}
      </div>
    </div>
  );
}
