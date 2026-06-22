export default function MaterialItem({
  children,
  badgeText,
  subtext,
  additionalChildren,
}: {
  children: React.ReactNode;
  badgeText?: string;
  subtext?: string;
  additionalChildren?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between p-3 bg-white rounded-lg border border-gray-200 gap-2">
      <div>
        <div className="flex gap-2">
          <span className="font-medium text-gray-800 text-sm block">
            {children}
          </span>
          {badgeText && (
            <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-md font-medium tracking-wide">
              {badgeText}
            </span>
          )}
        </div>
        {subtext && (
          <span className="text-xs text-gray-500 block mt-0.5">{subtext}</span>
        )}
      </div>
      {additionalChildren && (
        <div className="lg:text-right">
          <span className="text-sm font-bold text-gray-900 block">
            {additionalChildren}
          </span>
        </div>
      )}
    </div>
  );
}
