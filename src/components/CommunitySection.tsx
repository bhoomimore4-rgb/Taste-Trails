import React, { useState, useEffect } from "react";
import { ThumbsUp, Camera, Heart, Sparkles, MapPin, Plus, CheckCircle, Flame } from "lucide-react";
import { FoodieSubmission } from "../types";
import { INITIAL_COMMUNITY_PHOTOS } from "../data";

interface CommunitySectionProps {
  savedRecipeCount: number;
}

// Stunning pre-curated high-res food photo options so users can easily upload one without typing a nasty URL
const POPULAR_UPLOAD_PRESETS = [
  { label: "Cheesy Sourdough Pizza", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600" },
  { label: "Sizzling Chocolate Brownie", url: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&q=80&w=600" },
  { label: "Healthy Mango Poke Bowl", url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600" },
  { label: "Hot Crispy Garlic Waffles", url: "https://images.unsplash.com/photo-1562376502-6f769499c886?auto=format&fit=crop&q=80&w=600" }
];

export default function CommunitySection({ savedRecipeCount }: CommunitySectionProps) {
  const [submissions, setSubmissions] = useState<FoodieSubmission[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [username, setUsername] = useState("");
  const [dishName, setDishName] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [selectedPresetUrl, setSelectedPresetUrl] = useState(POPULAR_UPLOAD_PRESETS[0].url);
  const [customUrl, setCustomUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load and sync community photos with localStorage
  useEffect(() => {
    const saved = localStorage.getItem("community_submissions");
    if (saved) {
      setSubmissions(JSON.parse(saved));
    } else {
      setSubmissions(INITIAL_COMMUNITY_PHOTOS);
      localStorage.setItem("community_submissions", JSON.stringify(INITIAL_COMMUNITY_PHOTOS));
    }
  }, []);

  const handleLike = (id: string) => {
    const updated = submissions.map((item) => {
      if (item.id === id) {
        const likedByMe = !item.likedByMe;
        return {
          ...item,
          likes: likedByMe ? item.likes + 1 : item.likes - 1,
          likedByMe
        };
      }
      return item;
    });
    setSubmissions(updated);
    localStorage.setItem("community_submissions", JSON.stringify(updated));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !dishName.trim() || !caption.trim()) return;

    const finalImage = customUrl.trim() ? customUrl.trim() : selectedPresetUrl;

    const newPost: FoodieSubmission = {
      id: `submission_${Date.now()}`,
      username: username.trim().replace(/\s+/g, "_"),
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      image: finalImage,
      dishName: dishName.trim(),
      caption: caption.trim(),
      likes: 1,
      likedByMe: true,
      location: location.trim() || "Mumbai",
      date: "Just now"
    };

    const nextList = [newPost, ...submissions];
    setSubmissions(nextList);
    localStorage.setItem("community_submissions", JSON.stringify(nextList));

    // Reset Form
    setUsername("");
    setDishName("");
    setCaption("");
    setLocation("");
    setCustomUrl("");
    setSuccessMsg("🎉 Dish shared successfully to the Taste Trails feed!");
    
    setTimeout(() => {
      setSuccessMsg("");
      setShowSubmitModal(false);
    }, 2500);
  };

  return (
    <div id="community-section" className="space-y-10">
      
      {/* Spotlight: Foodie of the Week Card */}
      <div id="foodie-spotlight" className="bg-gradient-to-br from-brand-charcoal to-gray-800 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
          <Sparkles size={160} className="text-brand-mustard" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Spotlight user visual */}
          <div className="w-[150px] md:w-[180px] aspect-square rounded-2xl overflow-hidden border-2 border-brand-mustard shadow-xl shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
              alt="Foodie of the Week"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-grow text-center md:text-left">
            <span className="inline-flex items-center gap-1 bg-brand-mustard text-brand-charcoal text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              <Sparkles size={12} className="fill-brand-charcoal" />
              Foodie of the Week
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-white mb-2">
              Meet Priya Kulkarni (@Munching_Mind)
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mb-4 font-light max-w-xl">
              "Cooking is my escape. I recreated Sonia's Creamy Penne and air-fried cherry tomatoes for flavor depth. This app makes weekend specials so achievable for beginners like me!"
            </p>
            
            {/* Quick stats badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 text-brand-mustard font-bold">
                🔥 14 Recreations Logged
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 text-white/80">
                ⭐ Top Contributor
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community dashboard panel */}
      <div id="community-dashboard" className="bg-white rounded-2xl p-6 border border-brand-charcoal/5 shadow-sm max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="font-serif font-bold text-lg text-brand-charcoal mb-1">Your Personal Kitchen Profile</h3>
          <p className="text-xs text-gray-500 font-light">Join the movement and log recipes you have mastered.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-brand-cream border border-brand-charcoal/5 px-4 py-2 rounded-xl text-center">
            <span className="text-[10px] text-gray-400 block uppercase font-mono tracking-wider">Saves</span>
            <span className="text-base font-serif font-bold text-brand-terracotta">{savedRecipeCount}</span>
          </div>
          <button
            id="open-upload-modal-btn"
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-1.5 bg-brand-olive hover:bg-brand-olive/90 text-white font-semibold text-xs px-4 py-3 rounded-xl tracking-wide cursor-pointer transition-all shadow hover:scale-105"
          >
            <Camera size={14} />
            Post Dish Photo
          </button>
        </div>
      </div>

      {/* Main interactive masonry photo grid */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-xl text-brand-charcoal text-center">Fresh From Local Kitchens</h3>
        <p className="text-xs text-gray-500 text-center font-light max-w-sm mx-auto -mt-3 pb-4">
          Visual creations cooked, plated, and logged by fellow Taste Trails enthusiasts.
        </p>

        <div id="submissions-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((item) => (
            <div
              key={item.id}
              id={`post-${item.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-brand-charcoal/5 shadow-sm hover:shadow-md transition-all group duration-300"
            >
              {/* Photo Area */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.dishName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Location overlay label */}
                {item.location && (
                  <div className="absolute bottom-3 left-3 bg-brand-charcoal/70 backdrop-blur-md px-2.5 py-1 rounded text-white text-[10px] uppercase font-mono tracking-wider flex items-center gap-1">
                    <MapPin size={10} className="text-brand-mustard" />
                    {item.location}
                  </div>
                )}
              </div>

              {/* Text, author, interactions */}
              <div className="p-4.5">
                <div className="flex items-center gap-2.5 mb-3">
                  {/* User profile representation */}
                  <img
                    src={item.avatar}
                    alt={item.username}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover border border-brand-cream"
                  />
                  <div>
                    <span className="text-xs font-bold text-brand-charcoal">@{item.username}</span>
                    <span className="text-[9px] text-gray-400 block">{item.date}</span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-brand-terracotta mb-1 leading-snug">
                  Recreated: {item.dishName}
                </h4>
                
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed font-light mb-4">
                  {item.caption}
                </p>

                {/* Like Button triggers instant persistent counts */}
                <div className="flex items-center justify-between pt-3.5 border-t border-brand-charcoal/5">
                  <button
                    id={`post-like-btn-${item.id}`}
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold cursor-pointer py-1.5 px-3 rounded-full transition-all ${
                      item.likedByMe
                        ? "bg-brand-terracotta/10 text-brand-terracotta scale-102"
                        : "text-gray-500 bg-brand-cream hover:bg-brand-cream/80"
                    }`}
                  >
                    <Heart size={12} className={item.likedByMe ? "fill-brand-terracotta text-brand-terracotta" : ""} />
                    <span>{item.likes} Likes</span>
                  </button>
                  
                  <span className="text-[9px] uppercase font-mono text-gray-400">
                    Taste Trails Community
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Food Photo Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-brand-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative border border-brand-charcoal/10">
            
            <button
              id="close-modal-btn"
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-brand-charcoal font-bold text-xl p-1 cursor-pointer"
            >
              ✕
            </button>

            <h3 className="font-serif font-bold text-xl md:text-2xl text-brand-charcoal mb-2 flex items-center gap-2">
              <Camera className="text-brand-olive" />
              Upload Food Photo
            </h3>
            <p className="text-xs text-gray-500 mb-6 font-light">
              Are you the Foodie of the Week? Share your culinary creations with our 10,000+ local foodies food community.
            </p>

            {successMsg ? (
              <div className="p-6 bg-brand-cream border border-brand-olive/30 rounded-2xl flex flex-col items-center justify-center text-center animate-pulse">
                <CheckCircle className="text-brand-olive mb-2" size={40} />
                <p className="text-sm font-semibold text-brand-charcoal">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block mb-1">Your Username</label>
                    <input
                      type="text"
                      placeholder="e.g. food_lover"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3.5 py-2 border border-gray-200 outline-none text-xs rounded-xl focus:border-brand-olive bg-white font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block mb-1">Dish Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Creamy Penne"
                      required
                      value={dishName}
                      onChange={(e) => setDishName(e.target.value)}
                      className="w-full px-3.5 py-2 border border-gray-200 outline-none text-xs rounded-xl focus:border-brand-olive bg-white font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block mb-1">Location City</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2 border border-gray-200 outline-none text-xs rounded-xl focus:border-brand-olive bg-white font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block mb-1">Custom Image URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="w-full px-3.5 py-2 border border-gray-200 outline-none text-xs rounded-xl focus:border-brand-olive bg-white font-sans"
                    />
                  </div>
                </div>

                {/* Popular high quality presets list */}
                {!customUrl.trim() && (
                  <div className="bg-brand-cream/50 p-3 rounded-2xl border border-brand-charcoal/5">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-2 font-mono">Or select a high-fidelity preset:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {POPULAR_UPLOAD_PRESETS.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setSelectedPresetUrl(preset.url)}
                          className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                            selectedPresetUrl === preset.url
                              ? "bg-brand-olive/10 border-brand-olive font-bold text-brand-charcoal"
                              : "bg-white border-gray-200 text-gray-500 text-[10px] hover:bg-gray-50"
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded object-cover"
                          />
                          <span className="text-[10px] truncate leading-tight">{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block mb-1">Tell us your story / caption</label>
                  <textarea
                    placeholder="How did you prep this? Mention any tips or experiences..."
                    required
                    rows={2}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 outline-none text-xs rounded-xl focus:border-brand-olive bg-white font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-terracotta hover:bg-brand-terracotta/90 text-white font-bold text-xs rounded-xl cursor-pointer shadow hover:scale-102 transition-all mt-2"
                >
                  🚀 Publish to Community Feed
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
