import React from "react";
import { FolderHeart, ArrowRight } from "lucide-react";
import { FoodCollection } from "../types";

interface CollectionCardProps {
  key?: string;
  collection: FoodCollection;
  onClick: () => void;
}

export default function CollectionCard({ collection, onClick }: CollectionCardProps) {
  return (
    <div
      id={`collection-card-${collection.id}`}
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-brand-charcoal/5 group cursor-pointer flex flex-col h-full"
    >
      {/* 1:1 Visual Box with item counts overlay */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 shrink-0">
        <img
          src={collection.image}
          alt={collection.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/30 to-transparent" />
        
        {/* Floating recipe length label */}
        <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[11px] font-mono font-medium px-3 py-1 rounded-full border border-white/15 shadow-sm">
          {collection.recipeIds.length} Recipies
        </span>

        {/* Visual Folder Icon */}
        <div className="absolute bottom-4 left-4 flex items-center justify-center w-8 h-8 rounded-full bg-brand-mustard text-brand-charcoal shadow">
          <FolderHeart size={16} className="fill-brand-charcoal/10" />
        </div>
      </div>

      {/* Card Content body */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Collection Category Group */}
          <span className="text-[10px] text-brand-terracotta uppercase font-bold tracking-widest block mb-1">
            {collection.category} Collection
          </span>

          {/* Title */}
          <h3
            id={`collection-title-${collection.id}`}
            className="font-serif font-bold text-lg text-brand-charcoal group-hover:text-brand-terracotta transition-colors leading-snug mb-1.5"
          >
            {collection.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 font-light">
            {collection.description}
          </p>
        </div>

        {/* Read or Explore Trigger Row */}
        <div className="pt-3.5 border-t border-brand-charcoal/5 mt-4 flex items-center justify-between text-xs font-semibold text-brand-olive group-hover:text-brand-terracotta transition-colors">
          <span>Explore this collection</span>
          <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
