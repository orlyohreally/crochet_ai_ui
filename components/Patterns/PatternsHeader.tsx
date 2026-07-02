"use client";

import { useState, useRef, useEffect } from "react";

interface DashboardHeaderProps {
  children: React.ReactNode;
  search: string;
  handleSearchChange: (search: string) => void;
  onSendAiPrompt: (prompt: string) => void; 
  hasAiAccess: boolean; 
  isAiLoading?: boolean; // Enhancement 2: Dynamic state passed from parent execution hook
}

const AI_PROMPT_SUGGESTIONS = [
  "A beginner friendly amigurumi toy using cotton yarn gold...",
  "An advanced lace summer shawl pattern with a floral aesthetic...",
  "A quick chunky yarn blanket that can be finished in a weekend...",
];

const MAX_PROMPT_CHARS = 1000; // Enhancement 3: Clean character limitation safe-guard

export default function DashboardHeader({
  search,
  handleSearchChange,
  children,
  onSendAiPrompt,
  hasAiAccess,
  isAiLoading = false,
}: DashboardHeaderProps) {
  const [mode, setMode] = useState<"regular" | "ai">("regular");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Dynamic textarea height balancing
  useEffect(() => {
    if (mode === "ai" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [search, mode]);

  const handleAiButtonClick = () => {
    if (!hasAiAccess) {
      setShowUpgradeModal(true);
      return;
    }
    setMode("ai");
  };

  const switchToRegularMode = () => {
    if (isAiLoading) return; // Prevent breaking state mid-flight
    setMode("regular");
    handleSearchChange(""); 
  };

  const handleRegularSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Triggering DB exact search for:", search);
  };

  const handleAiSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim() || isAiLoading || search.length > MAX_PROMPT_CHARS) return;
    onSendAiPrompt(search);
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="max-w-3xl mx-auto">
          
          {/* --- SCENARIO 1: REGULAR EXACT FILTER SEARCH --- */}
          {mode === "regular" && (
            <form onSubmit={handleRegularSearchSubmit} className="flex items-center gap-2 w-full">
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search patterns exactly..."
                  className="w-full pl-4 pr-20 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-zinc-50 transition-all text-sm placeholder:text-gray-400 shadow-inner"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="absolute right-11 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                <button 
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-1.5 p-1.5 bg-white border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 rounded-lg shadow-sm transition-all cursor-pointer group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:scale-105 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
                  </svg>
                </button>
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap"
              >
                Search
              </button>

              <button
                type="button"
                onClick={handleAiButtonClick}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50/60 hover:bg-indigo-50 border border-indigo-100 rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                Ask AI ✨
              </button>
            </form>
          )}

          {/* --- SCENARIO 2: AI PROMPT SMART SEARCH EXTENSION --- */}
          {mode === "ai" && (
            <div className="w-full flex flex-col gap-2 transition-all animate-in fade-in duration-200">
              
              <div className="flex items-center justify-between px-1 mb-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50/50 px-2 py-0.5 rounded-md">
                  <span>AI Smart Prompt Mode</span>
                  <span className="relative flex h-2 w-2">
                    <span className={`absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 ${isAiLoading ? 'animate-ping' : ''}`}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isAiLoading}
                  onClick={switchToRegularMode}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                  </svg>
                  Leave AI mode
                </button>
              </div>

              <form onSubmit={handleAiSearchSubmit} className="w-full bg-zinc-50 border border-indigo-200 rounded-xl p-2 shadow-inner">
                <textarea
                  ref={textareaRef}
                  rows={2}
                  maxLength={MAX_PROMPT_CHARS}
                  disabled={isAiLoading}
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Describe what you want to create..."
                  className="w-full bg-transparent resize-none border-0 focus:ring-0 focus:outline-none px-2 py-1 text-sm text-gray-800 placeholder:text-gray-400 max-h-40 min-h-[50px] disabled:opacity-60"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAiSearchSubmit(e);
                    }
                  }}
                />
                
                <div className="flex justify-between items-center pt-2 px-1 border-t border-indigo-50">
                  {/* Enhancement 1: Clarified desktop instructions with Shift+Enter explanation */}
                  <div className="text-[11px] text-gray-400 hidden sm:block">
                    Press <kbd className="font-sans font-semibold border px-1 rounded bg-white">Enter</kbd> to submit, <kbd className="font-sans font-semibold border px-1 rounded bg-white">Shift+Enter</kbd> for line break
                  </div>
                  <div className="text-[11px] text-gray-400 sm:hidden">
                    Describe and hit submit
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Enhancement 3: Subtle character bound mapping tracking */}
                    {search.length > 0 && (
                      <span className={`text-[11px] font-medium transition-colors ${search.length >= MAX_PROMPT_CHARS - 100 ? "text-amber-600 font-bold" : "text-gray-400"}`}>
                        {search.length}/{MAX_PROMPT_CHARS}
                      </span>
                    )}

                    {/* Enhancement 2: Dynamic disabled state mutations + vector spinning loading ring */}
                    <button
                      type="submit"
                      disabled={!search.trim() || isAiLoading || search.length > MAX_PROMPT_CHARS}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed rounded-lg shadow transition-all cursor-pointer min-w-[110px] justify-center"
                    >
                      {isAiLoading ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Parsing...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Prompt</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.925a.75.75 0 0 0 .575.511l5.471 1.094a.25.25 0 0 1 0 .49l-5.472 1.09a.75.75 0 0 0-.575.512l-1.414 4.926a.75.75 0 0 0 .826.95 28.896 28.896 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.289Z" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Mobile-Friendly horizontal scrolling chip list */}
              <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 px-1 overflow-x-auto no-scrollbar scroll-smooth py-0.5 animate-in slide-in-from-top-1 duration-300">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mr-1 select-none whitespace-nowrap sticky left-0 bg-white pr-1">
                  Try asking for:
                </span>
                {AI_PROMPT_SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    disabled={isAiLoading}
                    onClick={() => handleSearchChange(suggestion)}
                    className="text-[11px] font-medium text-gray-600 bg-white border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/20 px-2.5 py-1 rounded-lg transition-all cursor-pointer truncate max-w-xs shadow-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    "{suggestion.replace("...", "")}"
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      {children}

      {/* Upgrade Access Protection Overlay Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/40 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white max-w-sm w-full rounded-2xl shadow-xl p-6 border border-gray-100 transform transition-all scale-100">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600 font-bold">✨</div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Unlock AI Smart Search</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-5">
              Natural language search parsing and vector description matching are pro tier features. Upgrade to craft prompts effortlessly.
            </p>
            <div className="flex gap-2.5 justify-end">
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 cursor-pointer font-medium"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => console.log("Redirecting to checkout...")}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow cursor-pointer"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
