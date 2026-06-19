import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Star, ArrowRight } from "lucide-react";
import { Recipe } from "../types";

interface FeaturedCarouselProps {
  recipes: Recipe[];
  onSelectRecipe: (recipeId: string) => void;
}

export default function FeaturedCarousel({ recipes, onSelectRecipe }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recipes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [recipes.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + recipes.length) % recipes.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % recipes.length);
  };

  if (!recipes.length) return null;

  const currentRecipe = recipes[currentIndex];

  return (
    <div id="carousel-featured" className="relative group w-full h-[320px] md:h-[500px] overflow-hidden rounded-2xl bg-brand-charcoal select-none">
      {/* Background Image with animated transition key */}
      <div 
        key={currentRecipe.id}
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out scale-102 group-hover:scale-100"
        style={{ backgroundImage: `linear-gradient(to top, rgba(34,34,34,0.9) 10%, rgba(34,34,34,0.3) 50%, rgba(34,34,34,0.15) 100%), url(${currentRecipe.image})` }}
      />

      {/* Floating Category Badge */}
      <div id="carousel-badge" className="absolute top-6 left-6 z-10 bg-brand-terracotta text-white text-xs tracking-wider uppercase px-3 py-1 font-semibold rounded-full shadow-md">
        Featured Recipe
      </div>

      {/* Left/Right Navigation buttons */}
      <button
        id="carousel-btn-prev"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/45 text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        id="carousel-btn-next"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/45 text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Indicators */}
      <div id="carousel-indicators" className="absolute bottom-6 right-6 z-10 flex gap-2">
        {recipes.map((_, idx) => (
          <button
            key={idx}
            id={`carousel-dot-${idx}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-6 bg-brand-mustard" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Info Overlay Content */}
      <div id="carousel-caption" className="absolute bottom-6 left-6 md:left-10 max-w-xl text-white pr-6">
        <div className="flex items-center gap-3 mb-2 text-brand-mustard/90 text-sm font-medium">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {currentRecipe.prepTime + currentRecipe.cookTime} Mins
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Star size={14} className="fill-brand-mustard" />
            {currentRecipe.rating} / 5
          </span>
          <span>•</span>
          <span className="border border-white/20 px-1.5 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider">
            {currentRecipe.cuisine}
          </span>
        </div>

        <h2 id="carousel-title" className="text-xl md:text-3xl font-serif font-bold leading-tight mb-2 text-white">
          {currentRecipe.title}
        </h2>

        <p id="carousel-desc" className="text-white/80 text-xs md:text-sm line-clamp-2 mb-4 leading-relaxed font-sans font-light">
          {currentRecipe.description}
        </p>

        <button
          id="carousel-btn-read"
          onClick={() => onSelectRecipe(currentRecipe.id)}
          className="flex items-center gap-2 bg-brand-olive hover:bg-brand-olive/90 text-white hover:text-white px-5 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all shadow-lg shadow-brand-charcoal/30 cursor-pointer group/btn"
        >
          View Recipe Details
          <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
