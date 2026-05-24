"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images, patternName }: { images: string[], patternName: string }) {
  // Fallback array if no images are provided by the backend
  const displayImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1608155686393-8fdd966d784d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615486511487-12f377cc46fe?q=80&w=1000&auto=format&fit=crop"
  ];

  // Track which image index is currently selected as the hero view
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="space-y-3 sticky top-6">
      
      {/* Big Main Featured Image Canvas */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
        <Image
          src={displayImages[currentImageIndex]}
          alt={`${patternName} - Главное фото`}
          fill
          priority // Keeps LCP load optimized for above-the-fold assets
          className="object-cover transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>

      {/* Multiple Small Images Row */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200 snap-x">
          {displayImages.map((imgUrl, idx) => {
            const isSelected = idx === currentImageIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-50 border shrink-0 snap-start transition-all ${
                  isSelected 
                    ? "border-indigo-600 ring-2 ring-indigo-600/20 opacity-100 scale-[0.98]" 
                    : "border-slate-200 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${patternName} - Ракурс ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 100px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
