import React, { useState } from "react";
import { BookOpen, Calendar, Clock, User, ArrowRight, Eye } from "lucide-react";
import { FoodGuide } from "../types";

interface FoodGuidesListProps {
  guides: FoodGuide[];
}

export default function FoodGuidesList({ guides }: FoodGuidesListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div id="guides-container" className="space-y-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide) => {
          const isExpanded = expandedId === guide.id;
          return (
            <div
              key={guide.id}
              id={`guide-item-${guide.id}`}
              className={`bg-white rounded-2xl overflow-hidden border border-brand-charcoal/5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                isExpanded ? "md:col-span-3 scale-[1.01]" : ""
              }`}
            >
              {/* Photo top bar */}
              <div>
                <div className={`relative overflow-hidden bg-gray-100 ${isExpanded ? "h-[220px] md:h-[350px]" : "h-[160px]"}`}>
                  <img
                    src={guide.image}
                    alt={guide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 bg-brand-mustard text-brand-charcoal text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                    {guide.category}
                  </span>
                </div>

                {/* Body Content details */}
                <div className="p-5">
                  {/* Metadata line */}
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-gray-500 font-mono mb-2">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {guide.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {guide.date}
                    </span>
                  </div>

                  {/* Guide Heading */}
                  <h3 className={`font-serif font-bold text-brand-charcoal leading-tight mb-2.5 ${isExpanded ? "text-xl md:text-2xl" : "text-base"}`}>
                    {guide.title}
                  </h3>

                  {/* Sub description summary */}
                  <p className="text-xs text-gray-600 leading-relaxed font-light mb-4">
                    {guide.description}
                  </p>

                  {/* Full Expanded paragraph */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-brand-charcoal/5 text-sm text-gray-700 leading-relaxed space-y-3 font-sans max-w-2xl">
                      <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-brand-terracotta first-letter:mr-2 first-letter:float-left">
                        {guide.content}
                      </p>
                      
                      {/* Interactive Author segment */}
                      <div className="flex items-center gap-2 mt-4 pt-3 text-xs text-gray-500 border-t border-brand-charcoal/5">
                        <User size={13} className="text-brand-olive" />
                        <span>Written by <strong className="font-serif text-brand-charcoal">{guide.author}</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action bar bottom */}
              <div className="p-5 pt-0 border-t border-brand-charcoal/5 mt-auto">
                <button
                  id={`guide-btn-expand-${guide.id}`}
                  onClick={() => setExpandedId(isExpanded ? null : guide.id)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    isExpanded
                      ? "bg-brand-cream text-brand-charcoal"
                      : "bg-brand-olive hover:bg-brand-olive/90 text-white"
                  }`}
                >
                  {isExpanded ? (
                    <>Close Guide Article</>
                  ) : (
                    <>
                      Read Detailed Guide <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
