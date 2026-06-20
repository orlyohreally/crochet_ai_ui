"use client";
import React from "react";
import { useLang } from "@/context/LangContext";
import { NestedDictionary } from "@/lib/interfaces";

export default function AboutPage() {
  const { dict } = useLang();
  const dictAbout = dict.about as NestedDictionary;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      {/* Hero Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {dictAbout.title as string}
        </h1>
        <p className="text-base md:text-lg text-slate-500 leading-relaxed">
          {dictAbout.subtitle as string}
        </p>
        <div className="w-12 h-1 bg-indigo-600 rounded-full mx-auto mt-4" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Story Block */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 md:p-8 shadow-sm space-y-3">
          <h2 className="text-xl font-bold text-slate-800">
            {dictAbout.storyTitle as string}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {dictAbout.storyText as string}
          </p>
        </div>

        {/* Mission Block */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 md:p-8 shadow-sm space-y-3">
          <h2 className="text-xl font-bold text-slate-800">
            {dictAbout.missionTitle as string}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {dictAbout.missionText as string}
          </p>
        </div>
      </div>
    </div>
  );
}
