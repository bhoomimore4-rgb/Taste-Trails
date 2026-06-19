import React, { useState, useEffect } from "react";
import { 
  Menu, X, Search, Heart, Sparkles, Star, Utensils, Compass, BookOpen, 
  MapPin, Coffee, Users, Mail, Phone, ChevronRight, MessageSquare, Flame 
} from "lucide-react";

import { Recipe, Restaurant, StreetFood, FoodGuide, FoodCollection } from "./types";
import { 
  HOME_CATEGORIES, RECIPES_DATA, COLLECTIONS_DATA, 
  RESTAURANTS_DATA, STREET_FOOD_DATA, FOOD_GUIDES_DATA 
} from "./data";

// Imports from sub-components
import FeaturedCarousel from "./components/FeaturedCarousel";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import RestaurantCard from "./components/RestaurantCard";
import StreetFoodGuide from "./components/StreetFoodGuide";
import CollectionCard from "./components/CollectionCard";
import FoodGuidesList from "./components/FoodGuidesList";
import CommunitySection from "./components/CommunitySection";
import Newsletter from "./components/Newsletter";
import AboutContact from "./components/AboutContact";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  
  // Saved / Favorite recipes logic
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  
  // Recipe Filter states
  const [recipeSearch, setRecipeSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("All");
  const [selectedDiet, setSelectedDiet] = useState<string>("All");
  const [selectedMeal, setSelectedMeal] = useState<string>("All");
  const [maxCookTime, setMaxCookTime] = useState<number>(60);
  
  // Global search input (Search modal/visual preview)
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [showGlobalSearchResults, setShowGlobalSearchResults] = useState(false);

  // Initialize saved recipes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("saved_recipes");
    if (saved) {
      setSavedRecipeIds(JSON.parse(saved));
    } else {
      // Default saves to provide pre-populated value
      const defaults = ["r1", "r2"];
      setSavedRecipeIds(defaults);
      localStorage.setItem("saved_recipes", JSON.stringify(defaults));
    }
  }, []);

  const handleToggleSaveRecipe = (recipeId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    let updated;
    if (savedRecipeIds.includes(recipeId)) {
      updated = savedRecipeIds.filter(id => id !== recipeId);
    } else {
      updated = [...savedRecipeIds, recipeId];
    }
    setSavedRecipeIds(updated);
    localStorage.setItem("saved_recipes", JSON.stringify(updated));
  };

  // Safe tab selection
  const navigateToTab = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedRecipeId(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Quick Home Category selection routes directly to recipes tab with filter preset
  const handleSelectHomeCategory = (categoryLabel: string) => {
    setRecipeSearch("");
    // Match cuisine or diet or dish characteristics
    if (["Vegetarian", "Vegan", "High Protein", "Healthy"].includes(categoryLabel)) {
      setSelectedDiet(categoryLabel);
      setSelectedCuisine("All");
    } else if (["Indian", "Italian", "Chinese", "Korean", "Mexican", "Thai"].includes(categoryLabel)) {
      setSelectedCuisine(categoryLabel);
      setSelectedDiet("All");
    } else if (categoryLabel === "Street Food") {
      navigateToTab("streetfood");
      return;
    } else if (categoryLabel === "Desserts") {
      setSelectedMeal("Desserts");
      setSelectedCuisine("All");
      setSelectedDiet("All");
    } else if (categoryLabel === "Cafés" || categoryLabel === "Café Guides") {
      navigateToTab("cafes");
      return;
    }
    navigateToTab("recipes");
  };

  // Recipe selections
  const handleSelectRecipe = (id: string) => {
    setSelectedRecipeId(id);
    setShowGlobalSearchResults(false);
    setGlobalSearchQuery("");
  };

  // Global search result filter matching items
  const filteredRecipesGlobal = RECIPES_DATA.filter(r => 
    r.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
    r.ingredients.some(i => i.toLowerCase().includes(globalSearchQuery.toLowerCase()))
  );

  const filteredRestaurantsGlobal = RESTAURANTS_DATA.filter(res =>
    res.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
    res.location.toLowerCase().includes(globalSearchQuery.toLowerCase())
  );

  const filteredGuidesGlobal = FOOD_GUIDES_DATA.filter(g =>
    g.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
    g.content.toLowerCase().includes(globalSearchQuery.toLowerCase())
  );

  // Recipes filter list (Inside Recipes panel)
  const filteredRecipesList = RECIPES_DATA.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(recipeSearch.toLowerCase()) ||
                          recipe.ingredients.some(i => i.toLowerCase().includes(recipeSearch.toLowerCase()));
    const matchesCuisine = selectedCuisine === "All" || recipe.cuisine === selectedCuisine;
    const matchesDiet = selectedDiet === "All" || recipe.dietType === selectedDiet;
    const matchesMeal = selectedMeal === "All" || recipe.mealType === selectedMeal;
    const matchesTime = (recipe.prepTime + recipe.cookTime) <= maxCookTime;

    return matchesSearch && matchesCuisine && matchesDiet && matchesMeal && matchesTime;
  });

  return (
    <div id="application-root" className="min-h-screen flex flex-col bg-brand-cream/35">
      
      {/* Editorial Announcement Strip */}
      <div id="promo-banner" className="bg-brand-charcoal text-white text-[11px] font-semibold tracking-wider py-2 px-4 text-center select-none uppercase flex items-center justify-center gap-1.5 border-b border-white/5">
        <Sparkles size={12} className="text-brand-mustard fill-brand-mustard animate-pulse" />
        Join 10,000+ local foodies! Get our curated Spring adaptation Ebook for free!
        <button onClick={() => navigateToTab("about")} className="underline font-bold text-brand-mustard ml-1.5 hover:text-white cursor-pointer">
          Claim Ebook
        </button>
      </div>

      {/* Primary Header Navigation bar */}
      <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-charcoal/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-18 flex items-center justify-between">
          
          {/* Brand Logo in Playfair display */}
          <div 
            id="brand-logo-container" 
            onClick={() => navigateToTab("home")} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-terracotta flex items-center justify-center text-white font-serif font-black text-lg shadow-sm">
              T
            </div>
            <div>
              <span className="font-serif font-black text-xl tracking-tight text-brand-charcoal group-hover:text-brand-terracotta transition-colors">
                Taste Trails
              </span>
              <span className="text-[9px] uppercase tracking-widest font-mono text-gray-400 block -mt-1 font-semibold">
                Bite & Beyond
              </span>
            </div>
          </div>

          {/* Desktop Sitemap Tabs */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
            <button
              id="nav-tab-home"
              onClick={() => navigateToTab("home")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg tracking-wide cursor-pointer transition-all ${
                activeTab === "home" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/50"
              }`}
            >
              Home
            </button>
            <button
              id="nav-tab-recipes"
              onClick={() => navigateToTab("recipes")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg tracking-wide cursor-pointer transition-all ${
                activeTab === "recipes" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/50"
              }`}
            >
              Recipes
            </button>
            <button
              id="nav-tab-restaurants"
              onClick={() => navigateToTab("restaurants")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg tracking-wide cursor-pointer transition-all ${
                activeTab === "restaurants" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/50"
              }`}
            >
              Restaurants
            </button>
            <button
              id="nav-tab-cafes"
              onClick={() => navigateToTab("cafes")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg tracking-wide cursor-pointer transition-all ${
                activeTab === "cafes" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/50"
              }`}
            >
              Cafés
            </button>
            <button
              id="nav-tab-streetfood"
              onClick={() => navigateToTab("streetfood")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg tracking-wide cursor-pointer transition-all ${
                activeTab === "streetfood" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/50"
              }`}
            >
              Street Food
            </button>
            <button
              id="nav-tab-collections"
              onClick={() => navigateToTab("collections")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg tracking-wide cursor-pointer transition-all ${
                activeTab === "collections" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/50"
              }`}
            >
              Collections
            </button>
            <button
              id="nav-tab-guides"
              onClick={() => navigateToTab("guides")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg tracking-wide cursor-pointer transition-all ${
                activeTab === "guides" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/50"
              }`}
            >
              Food Guides
            </button>
            <button
              id="nav-tab-community"
              onClick={() => navigateToTab("community")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg tracking-wide cursor-pointer transition-all ${
                activeTab === "community" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/50"
              }`}
            >
              Community
            </button>
            <button
              id="nav-tab-about"
              onClick={() => navigateToTab("about")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg tracking-wide cursor-pointer transition-all ${
                activeTab === "about" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/50"
              }`}
            >
              About
            </button>
            <button
              id="nav-tab-contact"
              onClick={() => navigateToTab("contact")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg tracking-wide cursor-pointer transition-all ${
                activeTab === "contact" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/50"
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Quick Search and Saved counters */}
          <div className="flex items-center gap-3">
            
            {/* Search Input bar */}
            <div id="search-bar" className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search recipes, reviews..."
                value={globalSearchQuery}
                onFocus={() => setShowGlobalSearchResults(true)}
                onChange={(e) => {
                  setGlobalSearchQuery(e.target.value);
                  setShowGlobalSearchResults(true);
                }}
                className="w-[180px] lg:w-[220px] pl-9 pr-3 py-2 bg-brand-cream/60 focus:bg-white text-xs rounded-xl outline-none focus:outline-2 focus:outline-brand-olive font-sans font-normal border border-brand-charcoal/5 transition-all"
              />
              
              {/* Reset Query */}
              {globalSearchQuery && (
                <button 
                  onClick={() => {
                    setGlobalSearchQuery("");
                    setShowGlobalSearchResults(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black font-semibold text-[10px] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Saves heart button */}
            <button
              id="header-fav-btn"
              onClick={() => navigateToTab("recipes")}
              className="relative p-2 rounded-xl hover:bg-brand-cream/40 text-brand-terracotta cursor-pointer"
              title="Saved Recipes Feed"
            >
              <Heart size={20} className="fill-brand-terracotta" />
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-brand-charcoal text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                {savedRecipeIds.length}
              </span>
            </button>

            {/* Mobile burger toggle */}
            <button
              id="mobile-menu-burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-charcoal hover:bg-brand-cream rounded-xl lg:hidden cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>

        {/* Global Search Results Droplist Modal */}
        {showGlobalSearchResults && globalSearchQuery.trim() && (
          <div className="absolute top-[72px] right-4 md:right-[150px] w-full max-w-md bg-white rounded-2xl shadow-xl border border-brand-charcoal/5 p-4 z-50 animate-fade-in max-h-[350px] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-brand-charcoal/5 text-xs font-mono uppercase tracking-widest text-gray-400 font-bold">
              <span>Matching results</span>
              <button 
                onClick={() => {
                  setShowGlobalSearchResults(false);
                  setGlobalSearchQuery("");
                }} 
                className="text-[10px] text-brand-terracotta cursor-pointer font-bold lowercase hover:underline"
              >
                Close list
              </button>
            </div>

            {/* Recipes Results */}
            {filteredRecipesGlobal.length > 0 && (
              <div className="mb-3">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-1">Recipes</span>
                <div className="space-y-1.5">
                  {filteredRecipesGlobal.map(r => (
                    <div 
                      key={r.id} 
                      onClick={() => handleSelectRecipe(r.id)}
                      className="p-2 hover:bg-brand-cream rounded-lg cursor-pointer flex items-center gap-2.5 transition-colors"
                    >
                      <img src={r.image} alt={r.title} referrerPolicy="no-referrer" className="w-8 h-8 rounded object-cover" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-brand-charcoal truncate">{r.title}</p>
                        <p className="text-[9px] text-gray-400 leading-none">{r.cuisine} cuisine • {r.prepTime+r.cookTime} mins</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Restaurants Results */}
            {filteredRestaurantsGlobal.length > 0 && (
              <div className="mb-3">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-1">Dining places</span>
                <div className="space-y-1.5">
                  {filteredRestaurantsGlobal.map(res => (
                    <div 
                      key={res.id} 
                      onClick={() => {
                        navigateToTab("restaurants");
                        setShowGlobalSearchResults(false);
                        setGlobalSearchQuery("");
                      }}
                      className="p-2 hover:bg-brand-cream rounded-lg cursor-pointer flex items-center gap-2.5 transition-colors"
                    >
                      <img src={res.image} alt={res.title} referrerPolicy="no-referrer" className="w-8 h-8 rounded object-cover" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-brand-charcoal truncate">{res.title}</p>
                        <p className="text-[9px] text-gray-400 leading-none">{res.location} • {res.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guides results */}
            {filteredGuidesGlobal.length > 0 && (
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-1">Cooking Guides</span>
                <div className="space-y-1.5">
                  {filteredGuidesGlobal.map(g => (
                    <div 
                      key={g.id} 
                      onClick={() => {
                        navigateToTab("guides");
                        setShowGlobalSearchResults(false);
                        setGlobalSearchQuery("");
                      }}
                      className="p-2 hover:bg-brand-cream rounded-lg cursor-pointer flex items-center gap-2.5 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-brand-charcoal truncate">{g.title}</p>
                        <p className="text-[9px] text-gray-500">{g.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredRecipesGlobal.length === 0 && filteredRestaurantsGlobal.length === 0 && filteredGuidesGlobal.length === 0 && (
              <div className="p-4 text-center text-xs text-gray-400 font-light">
                No items match your keywords. Try searching another tasty dish!
              </div>
            )}
          </div>
        )}

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div id="mobile-menu-drawer" className="lg:hidden bg-white border-b border-brand-charcoal/10 px-4 py-6 space-y-4 shadow-xl">
            {/* Search within mobile bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search recipes, guides, cafes..."
                value={globalSearchQuery}
                onChange={(e) => {
                  setGlobalSearchQuery(e.target.value);
                  setShowGlobalSearchResults(true);
                }}
                className="w-full pl-9 pr-3 py-2.5 bg-brand-cream/60 text-xs rounded-xl outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                id="mob-tab-home"
                onClick={() => navigateToTab("home")}
                className={`py-2 text-center text-xs font-semibold rounded-lg ${
                  activeTab === "home" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/40"
                }`}
              >
                🌍 Home feed
              </button>
              <button
                id="mob-tab-recipes"
                onClick={() => navigateToTab("recipes")}
                className={`py-2 text-center text-xs font-semibold rounded-lg ${
                  activeTab === "recipes" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/40"
                }`}
              >
                🍝 Recipes
              </button>
              <button
                id="mob-tab-restaurants"
                onClick={() => navigateToTab("restaurants")}
                className={`py-2 text-center text-xs font-semibold rounded-lg ${
                  activeTab === "restaurants" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/40"
                }`}
              >
                🍔 Restaurants
              </button>
              <button
                id="mob-tab-cafes"
                onClick={() => navigateToTab("cafes")}
                className={`py-2 text-center text-xs font-semibold rounded-lg ${
                  activeTab === "cafes" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/40"
                }`}
              >
                ☕ Cafés
              </button>
              <button
                id="mob-tab-streetfood"
                onClick={() => navigateToTab("streetfood")}
                className={`py-2 text-center text-xs font-semibold rounded-lg ${
                  activeTab === "streetfood" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/40"
                }`}
              >
                🌮 Street Food
              </button>
              <button
                id="mob-tab-collections"
                onClick={() => navigateToTab("collections")}
                className={`py-2 text-center text-xs font-semibold rounded-lg ${
                  activeTab === "collections" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/40"
                }`}
              >
                📁 Collections
              </button>
              <button
                id="mob-tab-guides"
                onClick={() => navigateToTab("guides")}
                className={`py-2 text-center text-xs font-semibold rounded-lg ${
                  activeTab === "guides" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/40"
                }`}
              >
                📖 Food Guides
              </button>
              <button
                id="mob-tab-community"
                onClick={() => navigateToTab("community")}
                className={`py-2 text-center text-xs font-semibold rounded-lg ${
                  activeTab === "community" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/40"
                }`}
              >
                👥 Community
              </button>
              <button
                id="mob-tab-about"
                onClick={() => navigateToTab("about")}
                className={`py-2 text-center text-xs font-semibold rounded-lg ${
                  activeTab === "about" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/40"
                }`}
              >
                About
              </button>
              <button
                id="mob-tab-contact"
                onClick={() => navigateToTab("contact")}
                className={`py-2 text-center text-xs font-semibold rounded-lg ${
                  activeTab === "contact" ? "bg-brand-cream text-brand-terracotta" : "text-gray-600 hover:bg-brand-cream/40"
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main id="main-content-flow" className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 py-6 md:py-8">
        
        {/* VIEW 1: ACTIVE SINGLE RECIPE DETAILS PAGE MAP */}
        {selectedRecipeId ? (
          <RecipeDetail 
            recipe={RECIPES_DATA.find(r => r.id === selectedRecipeId)!}
            allRecipes={RECIPES_DATA}
            isSaved={savedRecipeIds.includes(selectedRecipeId)}
            onToggleSave={() => handleToggleSaveRecipe(selectedRecipeId)}
            onSelectRecipe={handleSelectRecipe}
            onBackToList={() => setSelectedRecipeId(null)}
          />
        ) : (
          <>
            {/* VIEW 2: HOME TAB */}
            {activeTab === "home" && (
              <div id="view-home" className="space-y-12 animate-fade-in">
                {/* Large hero carousel (Featured items) */}
                <FeaturedCarousel 
                  recipes={RECIPES_DATA.filter(r => r.featured)}
                  onSelectRecipe={handleSelectRecipe}
                />

                {/* Categories Shortcut strip (🍝, 🍔, 🍕...) */}
                <div id="home-quick-categories" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif font-extrabold text-xl md:text-2xl text-brand-charcoal">
                      Explore Categories
                    </h2>
                    <button onClick={() => navigateToTab("recipes")} className="text-xs text-brand-terracotta font-bold flex items-center gap-1 hover:underline cursor-pointer">
                      View all Recipes <ChevronRight size={14} />
                    </button>
                  </div>
                  
                  {/* Grid of Categories cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                    {HOME_CATEGORIES.map((cat) => (
                      <div
                        key={cat.id}
                        id={`category-shortcut-${cat.id}`}
                        onClick={() => handleSelectHomeCategory(cat.label)}
                        className="bg-white p-4.5 rounded-2xl flex flex-col items-center text-center justify-center border border-brand-charcoal/5 shadow-sm hover:shadow-md hover:border-brand-terracotta/40 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
                      >
                        <span className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform">
                          {cat.icon}
                        </span>
                        <h3 className="text-xs font-semibold text-brand-charcoal font-sans group-hover:text-brand-terracotta transition-colors">
                          {cat.label}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending section (Viral, popular list) */}
                <div id="trending-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Top rated Left Column */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-brand-charcoal/5">
                      <h2 className="font-serif font-bold text-lg md:text-xl text-brand-charcoal flex items-center gap-2">
                        <Flame className="text-brand-terracotta fill-brand-terracotta" size={18} />
                        Viral & Trending Recipes
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {RECIPES_DATA.filter(r => r.trending).slice(0, 4).map((recipe) => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          onClick={() => handleSelectRecipe(recipe.id)}
                          isSaved={savedRecipeIds.includes(recipe.id)}
                          onToggleSave={(e) => handleToggleSaveRecipe(recipe.id, e)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Editor's pick column */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-brand-charcoal/5">
                      <h2 className="font-serif font-bold text-lg text-brand-charcoal flex items-center gap-2">
                        <Sparkles size={16} className="text-brand-mustard fill-brand-mustard" />
                        Editor's Picks
                      </h2>
                    </div>

                    <div className="space-y-4.5">
                      {RECIPES_DATA.filter(r => !r.trending && r.featured).slice(0, 3).map((recipe) => (
                        <div
                          key={recipe.id}
                          id={`editor-pick-${recipe.id}`}
                          onClick={() => handleSelectRecipe(recipe.id)}
                          className="bg-white p-3 rounded-xl border border-brand-charcoal/5 shadow-sm hover:shadow m-0.5 cursor-pointer flex gap-3.5 group transition-all"
                        >
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-lg object-cover shrink-0 group-hover:scale-102 transition-transform"
                          />
                          <div className="min-w-0 flex flex-col justify-between">
                            <h4 className="text-xs font-bold leading-snug text-brand-charcoal line-clamp-2 group-hover:text-brand-terracotta transition-colors">
                              {recipe.title}
                            </h4>
                            <div className="flex items-center justify-between text-[10px] text-gray-500 font-medium">
                              <span>Under {recipe.prepTime + recipe.cookTime} mins</span>
                              <div className="flex items-center gap-0.5 text-brand-mustard">
                                ★ {recipe.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Fun, real quote for local community */}
                    <div className="bg-brand-charcoal text-white p-5 rounded-2xl relative overflow-hidden shadow">
                      <h4 className="font-serif font-bold text-sm text-brand-mustard mb-2">Foodie of the Week Spotlight</h4>
                      <p className="text-[11px] text-white/80 leading-relaxed font-light mb-4">
                        Meet Priya Kulkarni who adaptation-tested our creamy garlic penne pasta at Mumbai home.
                      </p>
                      <button 
                        onClick={() => navigateToTab("community")} 
                        className="text-[10px] bg-white text-brand-charcoal font-bold px-3 py-1.5 rounded-lg hover:bg-brand-cream/90 uppercase transition-all cursor-pointer"
                      >
                        Read Interview story
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category navigation grid (Section 4) */}
                <div id="explore-cards-grid" className="space-y-4">
                  <h2 className="font-serif font-extrabold text-xl md:text-2xl text-brand-charcoal text-center">
                    Explore Curated Collections
                  </h2>
                  <p className="text-xs text-gray-500 text-center font-light max-w-sm mx-auto -mt-3.5 pb-2">
                    Browse failsafe recipes stacked by preparation duration, budgets, or dietary preferences.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {COLLECTIONS_DATA.map((col) => (
                      <CollectionCard
                        key={col.id}
                        collection={col}
                        onClick={() => {
                          setRecipeSearch("");
                          // Custom filter for recipe feeds
                          if (col.id === "c1") {
                            setMaxCookTime(30);
                            setSelectedDiet("All");
                          } else if (col.id === "c2") {
                            setSelectedMeal("Breakfast");
                          } else if (col.id === "c3") {
                            setSelectedMeal("Desserts");
                          }
                          navigateToTab("recipes");
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Latest articles 3 columns */}
                <div id="latest-articles-col" className="space-y-5">
                  <div className="pb-2 border-b border-brand-charcoal/5">
                    <h2 className="font-serif font-bold text-lg md:text-xl text-brand-charcoal">Latest Culinary Stories</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {FOOD_GUIDES_DATA.map((guide) => (
                      <div
                        key={guide.id}
                        onClick={() => navigateToTab("guides")}
                        className="bg-white rounded-xl overflow-hidden border border-brand-charcoal/5 shadow-sm hover:shadow group cursor-pointer transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="aspect-[16/10] overflow-hidden bg-gray-50">
                            <img
                              src={guide.image}
                              alt={guide.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-brand-terracotta block mb-1">
                              {guide.category}
                            </span>
                            <h4 className="font-serif font-bold text-sm text-brand-charcoal line-clamp-2 leading-snug group-hover:text-brand-terracotta transition-colors">
                              {guide.title}
                            </h4>
                          </div>
                        </div>
                        <div className="p-4 pt-0 text-[10px] text-gray-400 font-mono flex items-center justify-between">
                          <span>{guide.readTime}</span>
                          <span>{guide.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter Subscriptions */}
                <Newsletter />
              </div>
            )}

            {/* VIEW 3: RECIPES TAB */}
            {activeTab === "recipes" && (
              <div id="view-recipes" className="space-y-8 animate-fade-in">
                
                {/* Page Heading details */}
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h1 className="font-serif font-extrabold text-2xl md:text-4xl text-brand-charcoal">
                    Our Recipes Collection
                  </h1>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Filter across cuisines, speed limits, cooking style, or dietary checklists. Tap any recipe to check checklists and cook-steps.
                  </p>
                </div>

                {/* Search, Filter controls panel (Section 12) */}
                <div id="recipe-filters-panel" className="bg-white p-5 rounded-2xl border border-brand-charcoal/5 shadow-sm space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    
                    {/* Free Search text */}
                    <div className="md:col-span-4">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1.5">Free Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                        <input
                          type="text"
                          placeholder="Search e.g. pasta, garlic, butter..."
                          value={recipeSearch}
                          onChange={(e) => setRecipeSearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-brand-cream/50 outline-none text-xs rounded-lg focus:border-brand-olive border border-gray-100 font-sans"
                        />
                      </div>
                    </div>

                    {/* Cuisine selectors */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1.5">By Cuisine</label>
                      <select
                        value={selectedCuisine}
                        onChange={(e) => setSelectedCuisine(e.target.value)}
                        className="w-full px-3 py-2 bg-brand-cream/50 outline-none text-xs rounded-lg border border-gray-100 font-sans cursor-pointer"
                      >
                        <option value="All">🌍 All Cuisines</option>
                        <option value="Indian">🍛 Indian</option>
                        <option value="Italian">🍝 Italian</option>
                        <option value="Chinese">🍜 Chinese</option>
                        <option value="Korean">🔥 Korean</option>
                        <option value="Mexican">🌮 Mexican</option>
                        <option value="Thai">🥥 Thai</option>
                        <option value="American">🍔 American</option>
                      </select>
                    </div>

                    {/* Diet type */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1.5">By Diet Type</label>
                      <select
                        value={selectedDiet}
                        onChange={(e) => setSelectedDiet(e.target.value)}
                        className="w-full px-3 py-2 bg-brand-cream/50 outline-none text-xs rounded-lg border border-gray-100 font-sans cursor-pointer"
                      >
                        <option value="All">🍀 All Diets</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="High Protein">High Protein</option>
                        <option value="Healthy">Healthy</option>
                      </select>
                    </div>

                    {/* Meal Type */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1.5">By Meal Course</label>
                      <select
                        value={selectedMeal}
                        onChange={(e) => setSelectedMeal(e.target.value)}
                        className="w-full px-3 py-2 bg-brand-cream/50 outline-none text-xs rounded-lg border border-gray-100 font-sans cursor-pointer"
                      >
                        <option value="All">🥐 All Courses</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Desserts">Desserts</option>
                      </select>
                    </div>

                    {/* Prep Time range slider */}
                    <div className="col-span-1 md:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">Total Time Limit</label>
                        <span className="text-[10px] font-mono font-bold text-brand-terracotta">{maxCookTime}m</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="60"
                        step="5"
                        value={maxCookTime}
                        onChange={(e) => setMaxCookTime(parseInt(e.target.value))}
                        className="w-full accent-brand-olive cursor-pointer"
                      />
                    </div>

                  </div>

                  {/* Reset Filters buttons & short feedback */}
                  <div className="flex items-center justify-between pt-2 border-t border-brand-charcoal/5">
                    <span className="text-[10px] text-gray-400 font-mono">
                      Showing {filteredRecipesList.length} of {RECIPES_DATA.length} recipes matching parameters
                    </span>
                    <button
                      id="reset-recipe-filters"
                      onClick={() => {
                        setRecipeSearch("");
                        setSelectedCuisine("All");
                        setSelectedDiet("All");
                        setSelectedMeal("All");
                        setMaxCookTime(60);
                      }}
                      className="text-[10px] uppercase font-bold tracking-wider text-brand-terracotta hover:underline cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>

                {/* Recipes Grid */}
                {filteredRecipesList.length > 0 ? (
                  <div id="recipes-feed-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredRecipesList.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onClick={() => handleSelectRecipe(recipe.id)}
                        isSaved={savedRecipeIds.includes(recipe.id)}
                        onToggleSave={(e) => handleToggleSaveRecipe(recipe.id, e)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-brand-charcoal/5 p-8">
                    <p className="text-sm font-semibold text-gray-500 mb-1">No recipes match your active parameters.</p>
                    <p className="text-xs text-gray-400 font-light">Try reducing filters or clearing the search text bar.</p>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 4: RESTAURANT GUIDE TAB */}
            {activeTab === "restaurants" && (
              <div id="view-restaurants" className="space-y-8 animate-fade-in">
                
                {/* Heading info */}
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h1 className="font-serif font-extrabold text-2xl md:text-4xl text-brand-charcoal">
                    Bite & Beyond dining guide
                  </h1>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Check out our editorially reviewed restaurants in Mumbai. From romantic date nights to extreme budget eats and secret bakeries.
                  </p>
                </div>

                {/* Subcategory split headers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {RESTAURANTS_DATA.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 5: CAFES GUIDE TAB */}
            {activeTab === "cafes" && (
              <div id="view-cafes" className="space-y-8 animate-fade-in">
                
                {/* Heading info */}
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h1 className="font-serif font-extrabold text-2xl md:text-4xl text-brand-charcoal">
                    Bespoke Café & Roastery Guides
                  </h1>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Where to find single-origin pour overs, work-friendly heritage brick cabins, and double-chocolate sourdough cookies.
                  </p>
                </div>

                {/* Filter and render cafés only */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {RESTAURANTS_DATA.filter(r => r.category === "Best Cafes").map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 6: STREET FOOD GUIDE TAB */}
            {activeTab === "streetfood" && (
              <div id="view-streetfood" className="space-y-8 animate-fade-in">
                
                {/* Heading */}
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h1 className="font-serif font-extrabold text-2xl md:text-4xl text-brand-charcoal">
                    Local street Food Maps
                  </h1>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Biting into the crispy, buttery, spiced souls of India's cities. Read local history, coordinates, and exact local recommendations.
                  </p>
                </div>

                {/* Cities Street Food render with active city tab filters */}
                <StreetFoodGuide streetFoods={STREET_FOOD_DATA} />
              </div>
            )}

            {/* VIEW 7: COLLECTIONS PAGE TAB */}
            {activeTab === "collections" && (
              <div id="view-collections" className="space-y-8 animate-fade-in">
                
                {/* Heading */}
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h1 className="font-serif font-extrabold text-2xl md:text-4xl text-brand-charcoal">
                    Curated recipe Collections
                  </h1>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Handpicked recipe directories sorted by theme, hosted parties, active weeknight crunches, or slow weekends.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {COLLECTIONS_DATA.map((col) => (
                    <CollectionCard
                      key={col.id}
                      collection={col}
                      onClick={() => {
                        setRecipeSearch("");
                        if (col.id === "c1") {
                          setMaxCookTime(30);
                          setSelectedDiet("All");
                        } else if (col.id === "c2") {
                          setSelectedMeal("Breakfast");
                        } else if (col.id === "c3") {
                          setSelectedMeal("Desserts");
                        }
                        navigateToTab("recipes");
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 8: FOOD GUIDES TAB */}
            {activeTab === "guides" && (
              <div id="view-guides" className="space-y-8 animate-fade-in">
                
                {/* Heading */}
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h1 className="font-serif font-extrabold text-2xl md:text-4xl text-brand-charcoal">
                    Aesthetic Kitchen Guides
                  </h1>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Master knife mechanics, read meal prep component guides, or inspect which 5 kitchen tools are worth your rupees.
                  </p>
                </div>

                <FoodGuidesList guides={FOOD_GUIDES_DATA} />
              </div>
            )}

            {/* VIEW 9: ABOUT TAB */}
            {activeTab === "about" && (
              <div id="view-about" className="space-y-4">
                <AboutContact />
              </div>
            )}

            {/* VIEW 10: CONTACT TAB */}
            {activeTab === "contact" && (
              <div id="view-contact" className="space-y-4">
                {/* Directly brings focus to the contact module inside our component */}
                <AboutContact />
              </div>
            )}

            {/* VIEW 11: COMMUNITY SECTION TAB */}
            {activeTab === "community" && (
              <div id="view-community" className="space-y-4">
                <CommunitySection savedRecipeCount={savedRecipeIds.length} />
              </div>
            )}

          </>
        )}

      </main>

      {/* Structured footer (Credits, sitemap links, and clean copyright limits) */}
      <footer id="global-footer" className="bg-brand-charcoal text-white/50 border-t border-brand-charcoal/10 py-12 mt-16 text-xs font-sans">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Info */}
          <div className="space-y-3">
            <h4 className="text-white font-serif tracking-wide text-base font-bold">Taste Trails</h4>
            <p className="leading-relaxed font-light text-white/40">
              A premium, modern culinary blog and directory mapping failsafe recipes, cafes, and city street carts for the metro foodie.
            </p>
            <p className="text-[10px] text-white/20 font-mono">
              © {new Date().getFullYear()} Taste Trails Co. All Rights Reserved.
            </p>
          </div>

          {/* Column 1: Quick Links */}
          <div className="space-y-2.5">
            <h5 className="text-white text-[11px] uppercase tracking-widest font-mono font-bold">Culinary maps</h5>
            <ul className="space-y-2 font-light text-white/40">
              <li>
                <button onClick={() => navigateToTab("recipes")} className="hover:text-brand-mustard transition-colors cursor-pointer">
                  🍽️ Failsafe Recipes
                </button>
              </li>
              <li>
                <button onClick={() => navigateToTab("restaurants")} className="hover:text-brand-mustard transition-colors cursor-pointer">
                  🍔 Dining reviews
                </button>
              </li>
              <li>
                <button onClick={() => navigateToTab("cafes")} className="hover:text-brand-mustard transition-colors cursor-pointer">
                  ☕ Cafe guides
                </button>
              </li>
              <li>
                <button onClick={() => navigateToTab("streetfood")} className="hover:text-brand-mustard transition-colors cursor-pointer">
                  🌮 Street food stories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Editorial and business */}
          <div className="space-y-2.5">
            <h5 className="text-white text-[11px] uppercase tracking-widest font-mono font-bold">Co-Operations</h5>
            <ul className="space-y-2 font-light text-white/40">
              <li>
                <button onClick={() => navigateToTab("about")} className="hover:text-brand-mustard transition-colors cursor-pointer">
                  👥 About our team
                </button>
              </li>
              <li>
                <button onClick={() => navigateToTab("contact")} className="hover:text-brand-mustard transition-colors cursor-pointer">
                  📬 Brand collaborations
                </button>
              </li>
              <li>
                <button onClick={() => navigateToTab("community")} className="hover:text-brand-mustard transition-colors cursor-pointer">
                  📢 Photo submissions
                </button>
              </li>
              <li>
                <button onClick={() => navigateToTab("recipes")} className="hover:text-brand-mustard transition-colors cursor-pointer">
                  📁 Collections catalog
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details shortcut */}
          <div className="space-y-2.5">
            <h5 className="text-white text-[11px] uppercase tracking-widest font-mono font-bold">Contact Office</h5>
            <p className="font-light leading-relaxed text-white/40">
              Bandra West, Mumbai<br />
              hello@tastetrails.com<br />
              +91 98200 12345
            </p>
            <div className="pt-2">
              <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded text-brand-mustard uppercase font-mono tracking-wider font-semibold">
                ⭐️ Taste Trails Live
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
