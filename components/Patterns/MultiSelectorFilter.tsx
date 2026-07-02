"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";

interface Option {
  slug: string;
  name: string;
}

interface MultiSelectorFilterProps<T extends Option> {
  allSelectedLabel: string;
  maxVisibleOptions?: number;
  options: T[];
  selectedOptions: string[];
  selectorLabel: string;
  renderOption?: (option: T) => React.ReactNode;
  setSelectedOptions: (patternLevelSlug: string[]) => void;
}

export default function MultiSelectorFilter<T extends Option>({
  selectorLabel,
  allSelectedLabel,
  options,
  selectedOptions,
  setSelectedOptions,
  renderOption,
  maxVisibleOptions = 2,
}: MultiSelectorFilterProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip(),
      shift(),
    ],
  });

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isAllSelected = options.length > 0 && selectedOptions.length === options.length;

  // New toggle all functionality
  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedOptions([]); // Deselect everything
    } else {
      setSelectedOptions(options.map((o) => o.slug)); // Select everything
    }
  };

  const toggleOption = (value: string) => {
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((l) => l !== value)
        : [...selectedOptions, value],
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const buttonEl = refs.reference.current as HTMLElement | null;
      const floatingEl = refs.floating.current as HTMLElement | null;
      
      if (
        (buttonEl && buttonEl.contains(event.target as Node)) ||
        (floatingEl && floatingEl.contains(event.target as Node))
      ) {
        return;
      }
      setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs.reference, refs.floating]);

  const getButtonLabel = () => {
    if (selectedOptions.length === 0) return selectorLabel;
    if (isAllSelected) return allSelectedLabel;

    const selectedNames = options
      .filter((option) => selectedOptions.includes(option.slug))
      .map((option) => option.name);

    if (selectedNames.length <= maxVisibleOptions)
      return selectedNames.join(", ");
    return `${selectorLabel} (${selectedNames.length})`;
  };

  return (
    <div>
      <button
        ref={refs.setReference}
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className={`flex items-center justify-between gap-3 min-w-40 px-3 py-1.5 text-xs text-left rounded-lg border bg-white cursor-pointer select-none transition-all ${
          selectedOptions.length > 0
            ? "border-indigo-200 text-indigo-700 bg-indigo-50/30"
            : "border-gray-200 text-gray-700 hover:border-gray-300"
        }`}
      >
        <span className={`whitespace-nowrap ${selectedOptions.length > 0 ? "font-medium" : "font-normal"}`}>
          {getButtonLabel()}
        </span>
        <span className={`text-[10px] transition-transform text-gray-400 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && isClient && typeof window !== "undefined" &&
        createPortal(
          <div 
            ref={refs.setFloating}
            style={floatingStyles}
            className="w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-[9999] py-1 overflow-hidden"
          >
            {/* --- SELECT ALL ACTION ROW --- */}
            <button
              type="button"
              onClick={handleToggleAll}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-left border-b border-gray-100 hover:bg-zinc-50 transition-colors cursor-pointer group"
            >
              <span className="font-medium text-indigo-600 group-hover:text-indigo-700">
                {isAllSelected ? "Deselect All" : "Select All"}
              </span>
              <span className="text-[10px] text-gray-400 font-normal">
                {selectedOptions.length} of {options.length}
              </span>
            </button>

            {/* --- OPTIONS LIST --- */}
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => {
                const active = selectedOptions.includes(option.slug);
                return (
                  <button
                    key={option.slug}
                    type="button"
                    onClick={() => toggleOption(option.slug)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-zinc-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                          active
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {active && <span className="text-[9px] font-bold">✓</span>}
                      </div>
                      <span className={active ? "font-medium text-gray-900" : "text-gray-600"}>
                        {option.name}
                      </span>
                    </div>

                    {renderOption ? (
                      renderOption(option)
                    ) : (
                      <span className="text-[10px] text-gray-400">
                        {option.name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
