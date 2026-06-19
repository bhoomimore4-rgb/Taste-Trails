import React from "react";
import { MapPin, Star, Sparkles, PlusCircle } from "lucide-react";
import { Restaurant } from "../types";

interface RestaurantCardProps {
  key?: string;
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div
      id={`restaurant-card-${restaurant.id}`}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-charcoal/5 flex flex-col h-full group"
    >
      {/* Cover Image with Price & Rating Overlay */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          id={`restaurant-img-${restaurant.id}`}
          src={restaurant.image}
          alt={restaurant.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        
        {/* Floating Category Tag */}
        <span
          id={`restaurant-category-${restaurant.id}`}
          className="absolute top-3 left-3 bg-brand-olive text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded"
        >
          {restaurant.category}
        </span>

        {/* Rating and Price range pill at the bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1 bg-brand-charcoal/60 backdrop-blur-md px-2 py-0.5 rounded text-xs">
            <Star size={11} className="text-brand-mustard fill-brand-mustard" />
            <span className="font-bold">{restaurant.rating}</span>
          </div>
          <span className="bg-brand-charcoal/60 backdrop-blur-md px-2 py-0.5 rounded text-xs font-mono tracking-wider text-brand-mustard font-bold">
            {restaurant.priceRange}
          </span>
        </div>
      </div>

      {/* Card Details body */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Location details row */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            <MapPin size={13} className="text-brand-terracotta" />
            <span>{restaurant.location}</span>
          </div>

          {/* Restaurant Title */}
          <h3
            id={`restaurant-title-${restaurant.id}`}
            className="font-serif font-semibold text-lg leading-snug text-brand-charcoal mb-2"
          >
            {restaurant.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4 font-light">
            {restaurant.description}
          </p>

          {/* Slices of Highlights tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {restaurant.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="text-[10px] text-brand-charcoal/70 bg-brand-cream border border-brand-charcoal/5 px-2 py-0.5 rounded-full font-light"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Must Try Signature Alert Container */}
        <div className="mt-2 pt-3 border-t border-brand-charcoal/5 bg-brand-cream/30 -mx-4 -mb-4 p-3 flex items-start gap-1.5 text-[11px] leading-relaxed">
          <Sparkles className="text-brand-mustard fill-brand-mustard shrink-0 mt-0.5" size={12} />
          <div>
            <span className="font-bold text-brand-terracotta inline mr-1">Must Try:</span>
            <span className="text-gray-700 font-medium inline">{restaurant.mustTry}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
