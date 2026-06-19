import React, { useState, useEffect } from "react";
import { ArrowLeft, Clock, Users, Star, Brain, Flame, Heart, HeartOff, Utensils, MessageSquare, Send, CheckCircle } from "lucide-react";
import { Recipe, Comment } from "../types";

interface RecipeDetailProps {
  recipe: Recipe;
  allRecipes: Recipe[];
  isSaved: boolean;
  onToggleSave: () => void;
  onSelectRecipe: (id: string) => void;
  onBackToList: () => void;
}

export default function RecipeDetail({
  recipe,
  allRecipes,
  isSaved,
  onToggleSave,
  onSelectRecipe,
  onBackToList,
}: RecipeDetailProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState(recipe.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentRating, setNewCommentRating] = useState(5);

  // Load and sync comments & likes from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${recipe.id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Default placeholder comments
      const defaultComments: Comment[] = [
        {
          id: "dc1",
          author: "Aditi G.",
          text: "Absolutely delicious! I made this for dinner last night and it was a massive hit. Took me exactly as long as advertised.",
          timestamp: "3 days ago",
          rating: 5,
        },
        {
          id: "dc2",
          author: "Varun Shah",
          text: "I added a bit more garlic and chili, so good! Perfect weeknight staple.",
          timestamp: "Yesterday",
          rating: 4,
        },
      ];
      setComments(defaultComments);
      localStorage.setItem(`comments_${recipe.id}`, JSON.stringify(defaultComments));
    }

    const savedLikes = localStorage.getItem(`likes_${recipe.id}`);
    if (savedLikes) {
      setLikesCount(parseInt(savedLikes));
    } else {
      setLikesCount(recipe.likes);
    }

    const savedLikedByMe = localStorage.getItem(`liked_by_me_${recipe.id}`);
    if (savedLikedByMe) {
      setHasLiked(JSON.parse(savedLikedByMe));
    } else {
      setHasLiked(false);
    }
  }, [recipe.id]);

  // Handle Likes
  const handleLike = () => {
    const nextLiked = !hasLiked;
    const nextCount = nextLiked ? likesCount + 1 : likesCount - 1;
    setLikesCount(nextCount);
    setHasLiked(nextLiked);
    localStorage.setItem(`likes_${recipe.id}`, nextCount.toString());
    localStorage.setItem(`liked_by_me_${recipe.id}`, JSON.stringify(nextLiked));
  };

  // Toggle Single Ingredient
  const toggleIngredient = (ingredient: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [ingredient]: !prev[ingredient],
    }));
  };

  // Submit a comment
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) return;

    const freshComment: Comment = {
      id: `comment_${Date.now()}`,
      author: newCommentAuthor.trim(),
      text: newCommentText.trim(),
      timestamp: "Just now",
      rating: newCommentRating,
    };

    const updated = [freshComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${recipe.id}`, JSON.stringify(updated));

    // Clear inputs
    setNewCommentAuthor("");
    setNewCommentText("");
    setNewCommentRating(5);
  };

  // Filter Related Recipes
  const relatedRecipes = allRecipes
    .filter((r) => r.id !== recipe.id && (r.cuisine === recipe.cuisine || r.mealType === recipe.mealType))
    .slice(0, 3);

  return (
    <div id={`recipe-detail-container-${recipe.id}`} className="max-w-4xl mx-auto px-4 py-6 md:py-10 animate-fade-in">
      {/* Back Button */}
      <button
        id="detail-back-btn"
        onClick={onBackToList}
        className="flex items-center gap-2 text-brand-olive hover:text-brand-terracotta font-semibold mb-6 group cursor-pointer transition-colors"
      >
        <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
        Back to Food Feed
      </button>

      {/* Main Grid: Header & Recipe Cover */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-brand-charcoal/5 mb-8">
        <div className="relative h-[250px] md:h-[420px] w-full bg-brand-charcoal">
          <img
            id={`detail-hero-img-${recipe.id}`}
            src={recipe.image}
            alt={recipe.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent" />
          
          {/* Save & Like floating buttons */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3">
            <button
              id="detail-like-btn"
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-md cursor-pointer transition-all ${
                hasLiked
                  ? "bg-brand-mustard text-brand-charcoal"
                  : "bg-white/80 hover:bg-white text-brand-charcoal hover:scale-105"
              }`}
            >
              <Heart size={14} className={hasLiked ? "fill-brand-charcoal" : ""} />
              {likesCount} Likes
            </button>
            <button
              id="detail-save-btn"
              onClick={onToggleSave}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-md cursor-pointer transition-all ${
                isSaved
                  ? "bg-brand-terracotta text-white font-bold"
                  : "bg-white/80 hover:bg-white text-brand-charcoal hover:scale-105"
              }`}
            >
              {isSaved ? <HeartOff size={14} /> : <Heart size={14} />}
              {isSaved ? "Saved recipe" : "Save Recipe"}
            </button>
          </div>
        </div>

        {/* Recipe Identity Section */}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-brand-cream text-brand-olive text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded">
              {recipe.cuisine}
            </span>
            <span className="bg-brand-cream text-brand-terracotta text-xs font-bold px-2.5 py-1 rounded">
              {recipe.mealType}
            </span>
            {recipe.dietType !== "All" && (
              <span className="bg-brand-cream text-brand-mustard text-xs font-bold px-2.5 py-1 rounded">
                🍀 {recipe.dietType}
              </span>
            )}
          </div>

          <h1 id="detail-title" className="font-serif font-bold text-2xl md:text-4xl text-brand-charcoal leading-tight mb-4">
            {recipe.title}
          </h1>

          <p id="detail-description" className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-light">
            {recipe.description}
          </p>

          {/* Author info */}
          <div className="flex items-center gap-3 py-4 border-t border-brand-charcoal/5">
            {recipe.authorAvatar && (
              <img
                src={recipe.authorAvatar}
                alt={recipe.author}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <span className="text-[11px] text-gray-400 block uppercase tracking-wider font-semibold">Catering Expert</span>
              <span className="font-serif font-bold text-brand-charcoal text-sm">{recipe.author}</span>
            </div>
          </div>
        </div>

        {/* Recipe Metric Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-brand-charcoal/5 bg-brand-cream/40">
          <div className="p-4 flex flex-col items-center justify-center border-r border-b md:border-b-0 border-brand-charcoal/5 text-center">
            <Clock size={18} className="text-brand-olive mb-1" />
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Prep Time</span>
            <span className="font-serif font-bold text-gray-800 text-sm">{recipe.prepTime} mins</span>
          </div>
          <div className="p-4 flex flex-col items-center justify-center border-r border-b md:border-b-0 border-brand-charcoal/5 text-center">
            <Utensils size={18} className="text-brand-terracotta mb-1" />
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Cook Time</span>
            <span className="font-serif font-bold text-gray-800 text-sm">{recipe.cookTime} mins</span>
          </div>
          <div className="p-4 flex flex-col items-center justify-center border-r border-brand-charcoal/5 text-center">
            <Users size={18} className="text-brand-mustard mb-1" />
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Servings</span>
            <span className="font-serif font-bold text-gray-800 text-sm">{recipe.servings} People</span>
          </div>
          <div className="p-4 flex flex-col items-center justify-center text-center">
            <Star size={18} className="text-brand-terracotta fill-brand-terracotta mb-1" />
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Expert Rating</span>
            <span className="font-serif font-bold text-gray-800 text-sm">{recipe.rating} / 5</span>
          </div>
        </div>
      </div>

      {/* Main Column Split: Ingredients Checklist vs Instructions Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Ingredients Block (5 Cols) */}
        <div className="md:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-brand-charcoal/5 h-fit">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-brand-charcoal/5">
            <div className="w-1.5 h-6 bg-brand-olive rounded-full" />
            <h2 className="font-serif font-bold text-lg md:text-xl text-brand-charcoal">Ingredients Checklist</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4 font-light">
            Check off ingredients as you browse your cupboards:
          </p>
          <div className="space-y-3.5">
            {recipe.ingredients.map((ingredient, idx) => {
              const isChecked = !!checkedIngredients[ingredient];
              return (
                <label
                  key={idx}
                  className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                    isChecked ? "bg-brand-cream/40 text-gray-400 line-through" : "hover:bg-brand-cream/30 text-gray-800"
                  }`}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-olive focus:ring-brand-olive accent-brand-olive cursor-pointer"
                  />
                  <span className="text-sm font-sans font-medium">{ingredient}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Instructions Block (7 Cols) */}
        <div className="md:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-brand-charcoal/5">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-brand-charcoal/5">
            <div className="w-1.5 h-6 bg-brand-terracotta rounded-full" />
            <h2 className="font-serif font-bold text-lg md:text-xl text-brand-charcoal">Step-by-Step Directions</h2>
          </div>
          <div className="space-y-6">
            {recipe.instructions.map((step, idx) => (
              <div key={idx} className="relative flex gap-4">
                {/* Visual Number circle and hanging line */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-terracotta/10 text-brand-terracotta font-serif font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  {idx !== recipe.instructions.length - 1 && (
                    <div className="w-[1.5px] h-full bg-brand-cream mt-2" />
                  )}
                </div>
                <div className="pt-0.5 pb-2">
                  <p className="text-sm text-gray-700 leading-relaxed font-sans">{step}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Expert Chef recommendations and secrets box */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div className="mt-8 bg-brand-cream/50 border-l-[3px] border-brand-mustard p-4 rounded-r-xl">
              <div className="flex items-center gap-2 mb-2">
                <Brain size={18} className="text-brand-mustard fill-brand-mustard" />
                <h4 className="font-serif font-serif font-bold text-brand-charcoal text-sm">Chef's Secret Tips</h4>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-600 leading-relaxed font-light pl-1">
                {recipe.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Comprehensive Nutrition Breakdown bar */}
      <div className="bg-brand-charcoal text-white rounded-2xl p-6 md:p-8 shadow-sm mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <h3 className="font-serif font-bold text-lg">Nutrition Facts Estimate</h3>
            <p className="text-[11px] text-white/60 uppercase tracking-widest font-mono">Calculated per single serving</p>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-lg text-brand-mustard text-xs font-bold">
            <Flame size={14} className="fill-brand-mustard" />
            Estimated Daily Value percentage based on 2,000 calorie diet
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
            <span className="text-white/60 text-xs block mb-1">Calories</span>
            <span className="text-xl md:text-2xl font-serif font-extrabold text-brand-mustard">{recipe.nutrition.calories}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
            <span className="text-white/60 text-xs block mb-1">Protein</span>
            <span className="text-xl md:text-2xl font-serif font-extrabold text-white">{recipe.nutrition.protein}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
            <span className="text-white/60 text-xs block mb-1">Carbohydrates</span>
            <span className="text-xl md:text-2xl font-serif font-extrabold text-white">{recipe.nutrition.carbs}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
            <span className="text-white/60 text-xs block mb-1">Dietary Fats</span>
            <span className="text-xl md:text-2xl font-serif font-extrabold text-white">{recipe.nutrition.fat}</span>
          </div>
        </div>
      </div>

      {/* Real review comments section */}
      <div id="recipe-comments" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-charcoal/5 mb-12">
        <h3 className="font-serif font-bold text-xl text-brand-charcoal mb-6 flex items-center gap-2.5">
          <MessageSquare size={20} className="text-brand-terracotta" />
          Community Reviews ({comments.length})
        </h3>

        {/* Add comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8 p-4 bg-brand-cream/30 rounded-xl border border-brand-charcoal/5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">Share your review of this dish</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Your Name (e.g. Rahul Patil)"
              required
              value={newCommentAuthor}
              onChange={(e) => setNewCommentAuthor(e.target.value)}
              className="px-4 py-2 text-sm bg-white border border-gray-200 outline-none rounded-lg focus:border-brand-olive font-sans w-full"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 font-medium">Your Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewCommentRating(star)}
                    className="p-1 cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Star
                      size={16}
                      className={star <= newCommentRating ? "text-brand-mustard fill-brand-mustard" : "text-gray-300"}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <textarea
              placeholder="How did it turn out? Any adjustments made? Let your local foodies know..."
              required
              rows={3}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="px-4 py-2.5 text-sm bg-white border border-gray-200 outline-none rounded-lg focus:border-brand-olive font-sans w-full pr-12 resize-none"
            />
            <button
              type="submit"
              className="absolute right-3.5 bottom-4 p-2 bg-brand-olive hover:bg-brand-olive/90 text-white rounded-lg shadow cursor-pointer transition-all hover:scale-105"
              aria-label="Send review comment"
            >
              <Send size={15} />
            </button>
          </div>
        </form>

        {/* Comments Feed List */}
        <div className="space-y-5.5">
          {comments.map((comment, index) => (
            <div key={comment.id || index} className="p-4 rounded-xl bg-brand-cream/20 border border-brand-charcoal/5 flex gap-3">
              {/* Initials circle */}
              <div className="w-8 h-8 rounded-full bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center text-xs font-bold leading-none shrink-0 uppercase">
                {comment.author.substring(0, 2)}
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center justify-between mb-1">
                  <span className="font-bold text-sm text-brand-charcoal">{comment.author}</span>
                  <span className="text-[10px] text-gray-400">{comment.timestamp}</span>
                </div>
                {comment.rating && (
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={10}
                        className={star <= comment.rating! ? "text-brand-mustard fill-brand-mustard" : "text-gray-300"}
                      />
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-600 leading-relaxed font-light">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closely related recipes list */}
      {relatedRecipes.length > 0 && (
        <div id="recipe-related" className="pt-8 border-t border-brand-charcoal/10">
          <h3 className="font-serif font-bold text-xl text-brand-charcoal mb-6">Similar Recipes You Might Cherish</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedRecipes.map((related) => (
              <div
                key={related.id}
                onClick={() => {
                  onSelectRecipe(related.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-brand-charcoal/5 group cursor-pointer hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={related.image}
                    alt={related.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <div className="p-3">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-brand-terracotta">{related.cuisine} cuisine</span>
                  <h4 className="font-serif font-bold text-sm text-brand-charcoal line-clamp-1 group-hover:text-brand-terracotta transition-colors">
                    {related.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500 font-light">
                    <span>{related.prepTime + related.cookTime} mins</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-brand-mustard">
                      ★ {related.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
