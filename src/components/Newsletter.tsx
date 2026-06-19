import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setSuccess(true);
    setEmail("");
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div
      id="newsletter-section"
      className="bg-brand-cream border border-brand-charcoal/5 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none transform translate-x-12 -translate-y-12">
        <Mail size={180} className="text-brand-terracotta" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        <span className="text-[10px] uppercase tracking-widest text-brand-terracotta font-mono font-bold block mb-2">
          Weekly Culinary digest
        </span>
        
        <h2 id="newsletter-title" className="font-serif font-extrabold text-2xl md:text-4xl text-brand-charcoal leading-tight mb-3">
          Join 10,000+ Food Lovers
        </h2>
        
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6 font-light">
          Get secret off-menu recipes, authentic local street food maps, restaurant opening reviews, and culinary shortcuts delivered straight to your inbox every Sunday morning.
        </p>

        {success ? (
          <div className="bg-brand-olive/10 border border-brand-olive/30 text-brand-charcoal py-4 px-6 rounded-2xl flex items-center justify-center gap-2 max-w-md mx-auto animate-bounce">
            <CheckCircle2 className="text-brand-olive" size={20} />
            <span className="text-xs font-semibold">🎉 You have joined the Taste Trails family! See you on Sunday.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="email"
                required
                placeholder="Enter your favorite email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-brand-olive text-xs font-sans outline-none rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-terracotta hover:bg-brand-terracotta/95 text-white hover:text-white text-xs font-semibold px-6 py-3 rounded-xl cursor-pointer shadow transition-all hover:scale-102 flex items-center justify-center gap-1.5"
            >
              Subscribe Now
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <p className="text-[10px] text-gray-400 mt-4 leading-none font-light">
          No spam, ever. Unsubscribe in just one click anytime.
        </p>
      </div>
    </div>
  );
}
