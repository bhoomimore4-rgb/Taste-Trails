import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, FileText } from "lucide-react";

export default function AboutContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("collaboration");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes("@")) return;

    setSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div id="about-contact-view" className="space-y-12 max-w-4xl mx-auto px-4 py-4 animate-fade-in">
      
      {/* Editorial Profile & About Taste Trails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 md:p-8 rounded-3xl border border-brand-charcoal/5 shadow-sm">
        <div className="space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-terracotta">Our Culinary Story</span>
          <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-charcoal">About Taste Trails</h2>
          <p className="text-xs text-gray-600 leading-relaxed font-light">
            Founded in 2024, **Taste Trails** is a digital sanctuary for visual foodie enthusiasts who live to eat, cook, and explore. We believe cooking should be an exciting sensory experience, not dry instructions.
          </p>
          <p className="text-xs text-gray-600 leading-relaxed font-light">
            Our mission is simple: map out the mouthwatering, buttery, spicy corners of our cities and pass down failsafe recipes that any novice can replicate in under 30 minutes. Written for foodies by local foodies.
          </p>

          {/* Quick commercial/affiliate milestones */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-brand-charcoal/5">
            <div className="text-center bg-brand-cream/40 p-2.5 rounded-xl border border-brand-charcoal/5">
              <span className="text-xl font-serif font-extrabold text-brand-terracotta block">10K+</span>
              <span className="text-[8px] uppercase font-mono text-gray-500">Readers</span>
            </div>
            <div className="text-center bg-brand-cream/40 p-2.5 rounded-xl border border-brand-charcoal/5">
              <span className="text-xl font-serif font-extrabold text-brand-olive block">500+</span>
              <span className="text-[8px] uppercase font-mono text-gray-500">Recreated</span>
            </div>
            <div className="text-center bg-brand-cream/40 p-2.5 rounded-xl border border-brand-charcoal/5">
              <span className="text-xl font-serif font-extrabold text-brand-mustard block">150+</span>
              <span className="text-[8px] uppercase font-mono text-gray-500">Reviews</span>
            </div>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600"
            alt="Cooking together"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[9px] uppercase tracking-wider font-mono text-brand-mustard font-bold">Featured Catalog</span>
            <h4 className="font-serif font-bold text-sm">Taste Trails Spring Recipe Ebook</h4>
            <p className="text-[10px] text-white/80 font-light mt-1">Get 50 high-definition secret street food adaptations.</p>
          </div>
        </div>
      </div>

      {/* Brand Collab portal & Team */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-brand-charcoal/5 text-center flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-base text-brand-charcoal">Affiliate Income</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              We periodically endorse kitchen tools like air fryers or chef knives that we explicitly cook with daily.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold text-brand-olive mt-4 block">100% Chef Approved</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-charcoal/5 text-center flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-base text-brand-charcoal">Sponsored Content</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              Are you an organic farm or boutique café looking for an authentic spotlight in Mumbai? Settle in with us!
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold text-brand-terracotta mt-4 block">Book Collaborations</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-charcoal/5 text-center flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-base text-brand-charcoal">Recipe Ebook Sales</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              Support the channel and purchase our seasonal guide, packing printable grocery maps and spice ratios.
            </p>
          </div>
          <button className="w-full bg-brand-cream hover:bg-brand-cream/80 text-brand-charcoal font-bold text-[10px] uppercase tracking-wider py-2 rounded-lg cursor-pointer transition-colors mt-4">
            🛒 Buy Ebook ($4.99)
          </button>
        </div>
      </div>

      {/* Collaboration / Contact Form & Coordinates */}
      <div className="bg-white rounded-3xl border border-brand-charcoal/5 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Coordinates (5 cols) */}
          <div className="md:col-span-5 bg-brand-charcoal text-white p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-lg text-white">Let's Connect!</h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Have questions regarding our spicy Chole Bhature coordinates or have feedback on our penal recipe? Send us a letter! We read every inbox.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-xs">
                  <Mail className="text-brand-mustard" size={16} />
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase font-mono">Mail Box</span>
                    <span className="text-white/90">hello@tastetrails.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <Phone className="text-brand-mustard" size={16} />
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase font-mono">Dial In</span>
                    <span className="text-white/90">+91 98200 12345</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <MapPin className="text-brand-mustard" size={16} />
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase font-mono">HQ Studio</span>
                    <span className="text-white/90">Bandra West, Mumbai, India</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-white/40 mt-8 font-mono">
              Designed with 💛 for modern metropolitan food lovers.
            </p>
          </div>

          {/* Form (7 cols) */}
          <div className="md:col-span-7 p-6 md:p-8">
            <h3 className="font-serif font-bold text-lg text-brand-charcoal mb-4">Send a Direct message</h3>
            
            {success ? (
              <div className="p-6 bg-brand-cream border border-brand-olive/30 rounded-2xl text-center">
                <p className="text-sm font-semibold text-brand-charcoal">🎉 Your message was sent successfully!</p>
                <p className="text-xs text-gray-500 mt-1">Our editorial kitchen team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Varun"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 outline-none text-xs rounded-xl focus:border-brand-olive bg-white font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. varun@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 outline-none text-xs rounded-xl focus:border-brand-olive bg-white font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Subject Matter</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 outline-none text-xs rounded-xl focus:border-brand-olive bg-white font-sans"
                  >
                    <option value="collaboration">🤝 Brand Collaboration Inquiry</option>
                    <option value="recipe">🍳 Recipe Adaptations Proposal</option>
                    <option value="advertising">📢 Advertising & Placements</option>
                    <option value="general">💬 General Chit Chat / Hello</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Your Message</label>
                  <textarea
                    required
                    placeholder="Describe how we can partner up, cook together, or review your café..."
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 outline-none text-xs rounded-xl focus:border-brand-olive bg-white font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-olive hover:bg-brand-olive/90 text-white font-bold text-xs rounded-xl cursor-pointer shadow transition-all hover:scale-101 flex items-center justify-center gap-1.5"
                >
                  <Send size={14} />
                  Send Letter
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
