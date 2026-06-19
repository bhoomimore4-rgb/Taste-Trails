import React, { useState } from "react";
import { MapPin, Quote, Sparkles } from "lucide-react";
import { StreetFood } from "../types";

interface StreetFoodGuideProps {
  streetFoods: StreetFood[];
}

export default function StreetFoodGuide({ streetFoods }: StreetFoodGuideProps) {
  const [selectedCity, setSelectedCity] = useState<"All" | "Mumbai" | "Delhi" | "Pune" | "Kolkata" | "Hyderabad">("All");

  const cities: ("All" | "Mumbai" | "Delhi" | "Pune" | "Kolkata" | "Hyderabad")[] = [
    "All",
    "Mumbai",
    "Delhi",
    "Pune",
    "Kolkata",
    "Hyderabad"
  ];

  const filteredFoods = selectedCity === "All"
    ? streetFoods
    : streetFoods.filter(item => item.city === selectedCity);

  return (
    <div id="street-food-guide-container" className="w-full">
      {/* City Filters Tabs styled with high-fidelity borders */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-white p-2.5 rounded-xl border border-brand-charcoal/5 shadow-sm max-w-2xl mx-auto">
        {cities.map((city) => (
          <button
            key={city}
            id={`filter-city-${city}`}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              selectedCity === city
                ? "bg-brand-terracotta text-white shadow-sm"
                : "text-gray-600 hover:bg-brand-cream hover:text-brand-charcoal"
            }`}
          >
            {city === "All" ? "🌍 All Cities" : city}
          </button>
        ))}
      </div>

      {/* Grid of Street Food stories */}
      <div id="street-food-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredFoods.map((item) => (
          <div
            key={item.id}
            id={`street-food-item-${item.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-charcoal/5 flex flex-col md:flex-row"
          >
            {/* Street Food Visual (Full size on left in desktop) */}
            <div className="relative w-full md:w-[220px] aspect-[4/3] md:aspect-auto h-[180px] md:h-auto shrink-0 bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* City float badge */}
              <span className="absolute top-3 left-3 bg-brand-charcoal text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full">
                {item.city}
              </span>
            </div>

            {/* Story and recommendation text */}
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                {/* Title */}
                <h3 className="font-serif font-bold text-lg text-brand-charcoal mb-1 leading-snug">
                  {item.title}
                </h3>

                {/* Location subline */}
                <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-3.5">
                  <MapPin size={11} className="text-brand-terracotta" />
                  <span>{item.location}</span>
                </div>

                {/* Story Quote content */}
                <div className="relative pl-3.5 border-l-2 border-brand-mustard mb-4">
                  <Quote size={12} className="text-brand-mustard/40 absolute left-0.5 -top-1.5" />
                  <p className="text-xs text-gray-600 leading-relaxed font-light italic">
                    {item.story}
                  </p>
                </div>
              </div>

              {/* Recommendation highlight bar */}
              <div className="bg-brand-cream/65 border border-brand-charcoal/5 rounded-xl p-3 flex items-start gap-2">
                <Sparkles size={13} className="text-brand-terracotta shrink-0 mt-0.5 fill-brand-terracotta/20" />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-terracotta block">Local Best Pick</span>
                  <span className="text-xs text-brand-charcoal font-semibold leading-tight">
                    {item.recommendation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
