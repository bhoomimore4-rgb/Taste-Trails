import React from "react";
import { Clock, Star, Heart, Flame, Compass } from "lucide-react";
import { Recipe } from "../types";

interface RecipeCardProps {
  key?: string;
  recipe: Recipe;
  onClick: () => void;
  isSaved: boolean;
  onToggleSave: (e: React.MouseEvent) => void;
}

export default function RecipeCard({ recipe, onClick, isSaved, onToggleSave }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div
      id={`recipe-card-${recipe.id}`}
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-brand-charcoal/5 group cursor-pointer flex flex-col h-full"
    >
      {/* Recipe Image with Aspect Ratio & Heart Toggle Overlay */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          id={`recipe-img-${recipe.id}`}
          src={recipe.image}
          alt={recipe.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Heart Favorite Trigger */}
        <button
          id={`recipe-save-btn-${recipe.id}`}
          onClick={onToggleSave}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer ${
            isSaved
              ? "bg-brand-terracotta text-white"
              : "bg-white/70 hover:bg-white text-brand-charcoal hover:scale-110"
          }`}
          aria-label={isSaved ? "Remove from favorite recipes" : "Save to favorite recipes"}
        >
          <Heart size={16} className={`${isSaved ? "fill-white" : ""}`} />
        </button>

        {/* Floating difficulty badge */}
        <span
          id={`recipe-difficulty-${recipe.id}`}
          className={`absolute bottom-3 left-3 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full text-white ${
            recipe.difficulty === "Easy"
              ? "bg-brand-olive"
              : recipe.difficulty === "Medium"
              ? "bg-brand-mustard"
              : "bg-brand-terracotta"
          }`}
        >
          {recipe.difficulty}
        </span>
      </div>

      {/* Card Content details */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Header metadata */}
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1.5">
            <span className="flex items-center gap-1">
              <Compass size={11} className="text-brand-olive" />
              {recipe.cuisine}
            </span>
            <span className="flex items-center gap-1 text-brand-terracotta font-medium">
              {recipe.dietType !== "All" ? recipe.dietType : ""}
            </span>
          </div>

          {/* Recipe Name */}
          <h3
            id={`recipe-title-${recipe.id}`}
            className="font-serif font-semibold text-base leading-snug group-hover:text-brand-terracotta transition-colors mb-2 line-clamp-2"
          >
            {recipe.title}
          </h3>
        </div>

        <div>
          {/* Nutrition shortcut & cook duration */}
          <div className="flex items-center justify-between py-1 border-t border-b border-brand-charcoal/5 mb-3 text-xs text-gray-600">
            <span className="flex items-center gap-1 font-medium">
              <Clock size={13} className="text-gray-400" />
              {totalTime}m
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <Flame size={13} className="text-brand-mustard" />
              {recipe.nutrition.calories} kcal
            </span>
          </div>

          {/* Social and author footer */}
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-2 overflow-hidden">
              {recipe.authorAvatar && (
                <img
                  src={recipe.authorAvatar}
                  alt={recipe.author}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover shrink-0"
                />
              )}
              <span className="text-[10px] text-gray-500 truncate">
                by {recipe.author.split(" ")[0]}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-gray-600">
              <Star size={11} className="fill-brand-mustard text-brand-mustard" />
              <span className="font-bold text-gray-800">{recipe.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
