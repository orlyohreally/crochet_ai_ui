export function SortBySelect({
  dict,
  sortBy,
  sortByOptions,
  handleSortByChange,
}: {
  dict: { [key: string]: string };
  sortBy?: string;
  sortByOptions: { key: string; value: string }[];
  handleSortByChange: (sortBy: string) => void;
}) {
  return (
    <select
      value={sortBy}
      onChange={(e) => handleSortByChange(e.target.value)}
      className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-600 focus:outline-none"
    >
      {sortByOptions.map((option) => (
        <option key={option.key} value={option.value}>
          {dict[option.key] as string}
        </option>
      ))}
    </select>
  );
}
