import { Recipe, Restaurant, StreetFood, FoodGuide, FoodCollection, FoodieSubmission } from "./types";

export const HOME_CATEGORIES = [
  { id: "pasta", label: "Pasta", icon: "🍝" },
  { id: "burgers", label: "Burgers", icon: "🍔" },
  { id: "pizza", label: "Pizza", icon: "🍕" },
  { id: "street-food", label: "Street Food", icon: "🌮" },
  { id: "healthy", label: "Healthy", icon: "🥗" },
  { id: "desserts", label: "Desserts", icon: "🍰" },
  { id: "cafes", label: "Cafés", icon: "☕" },
  { id: "drinks", label: "Drinks", icon: "🍹" },
  { id: "indian", label: "Indian", icon: "🍛" },
  { id: "asian", label: "Asian", icon: "🍜" },
  { id: "protein", label: "High Protein", icon: "🍗" },
  { id: "budget", label: "Budget Meals", icon: "🥙" },
];

export const RECIPES_DATA: Recipe[] = [
  {
    id: "r1",
    title: "15-Minute Creamy Garlic Penne Pasta",
    description: "An incredibly creamy, rich, and mouth-watering garlic pasta made with cream, parmesan, and loaded with fresh basil. It is the perfect recipe for busy weeknights when you want gourmet flavor in under 15 minutes.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800",
    author: "Chef Sonia Sen",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      "200g Penne pasta",
      "2 tbsp Butter",
      "4 cloves Garlic, minced",
      "1 cup Heavy cream",
      "1/2 cup Grated Parmesan cheese",
      "Salt and freshly cracked black pepper",
      "1/4 cup Fresh basil leaves, chopped",
      "1 tsp Red chili flakes"
    ],
    instructions: [
      "Boil penne pasta in heavily salted water according to package instructions until al dente.",
      "In a wide skillet, melt butter over medium heat. Add minced garlic and sauté for 1 minute until fragrant but not browned.",
      "Lower the heat and stir in heavy cream. Bring to a gentle simmer and let it cook for 2 minutes.",
      "Stir in grated parmesan cheese until fully melted and the sauce thickens slightly.",
      "Drain pasta (reserve 1/4 cup of pasta water). Add pasta directly to the sauce and toss to coat. Splash a bit of pasta water if too thick.",
      "Season with salt, black pepper, and chili flakes. Top with chopped fresh basil and extra parmesan."
    ],
    tips: [
      "Always grate parmesan freshly from a block! Pre-packaged grated cheese contains anti-caking agents that prevent smooth melting.",
      "If you want to pack in protein, toss in sliced grilled chicken breast or sautéed baby spinach."
    ],
    nutrition: {
      calories: 520,
      protein: "14g",
      carbs: "58g",
      fat: "25g"
    },
    cuisine: "Italian",
    mealType: "Dinner",
    dietType: "Vegetarian",
    rating: 4.8,
    likes: 342,
    savedCount: 189,
    featured: true,
    trending: true,
    createdAt: "2026-06-15"
  },
  {
    id: "r2",
    title: "Ultimate Butter Chicken (Murgh Makhani)",
    description: "Tender, tandoori-spiced chicken pieces bathed in a smooth, sweet, and tangy tomato-butter-cream sauce. This is an authentic restaurant-style recipe perfected over generations.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
    author: "Kabir Malhotra",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "600g Boneless chicken thighs, cubed",
      "1 cup Plain yogurt",
      "2 tbsp Ginger-garlic paste",
      "2 tsp Kashmiri red chili powder",
      "1 tsp Garam masala",
      "3 tbsp Butter",
      "1 cup Tomato puree",
      "1/2 cup Cashew paste (soaked & blended cashews)",
      "1/2 cup Fresh cream",
      "1 tbsp Kasuri methi (dried fenugreek leaves)",
      "Salt to taste"
    ],
    instructions: [
      "Marinate chicken with yogurt, half ginger-garlic paste, 1 tsp chili powder, garam masala, and salt for at least 30 minutes.",
      "Pan-sear or grill the marinated chicken pieces until slightly charred on edges. Set aside.",
      "In a deep pan, melt 2 tbsp butter. Add remaining ginger-garlic paste and sauté for a minute.",
      "Add tomato puree and remaining chili powder. Cook until oil starts to separate.",
      "Reduce heat, stir in cashew paste and cream. Mix thoroughly to make a velvety orange gravy.",
      "Add cooked chicken and simmer for 5-7 minutes. Crinkle Kasuri methi between palms and sprinkle on top.",
      "Finish with the remaining tablespoon of butter and a swirl of warm cream."
    ],
    tips: [
      "Kasuri methi is absolutely non-negotiable for that signature sweet restaurant aroma!",
      "Blot the chicken dry before marinating to prevent the marinade from turning watery."
    ],
    nutrition: {
      calories: 680,
      protein: "38g",
      carbs: "12g",
      fat: "48g"
    },
    cuisine: "Indian",
    mealType: "Lunch",
    dietType: "High Protein",
    rating: 4.9,
    likes: 843,
    savedCount: 412,
    featured: true,
    trending: true,
    createdAt: "2026-06-12"
  },
  {
    id: "r3",
    title: "10-Minute Kimchi Fried Rice (Kimchi Bokkeumbap)",
    description: "The ultimate comfort food and late-night snack. Spicy, deeply umami, tangy kimchi stir-fried with fragrant rice, sesame oil, and topped with a gorgeous runny fried egg.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    author: "Ji-Young Park",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "1 cup Day-old cooked jasmine rice",
      "1/2 cup Well-fermented sour Kimchi, chopped",
      "2 tbsp Kimchi juice",
      "1 tbsp Gochujang (Korean chili paste)",
      "1 tbsp Soy sauce",
      "1 tbsp Toasted sesame oil",
      "1 Green onion, chopped",
      "1 Egg",
      "1 tsp Toasted sesame seeds",
      "1 sheet Roasted nori (seaweed), sliced"
    ],
    instructions: [
      "In a hot wok or non-stick pan, add a splash of cooking oil and fry the chopped kimchi for 2 minutes until translucent.",
      "Stir in garlic (optional) and the white parts of chopped green onion.",
      "Break down the cold day-old rice and add to the pan. Mix well with the kimchi.",
      "Drizzle kimchi juice, gochujang, and soy sauce. Turn up heat and stir-fry vigorously to toast the rice grains.",
      "Remove from heat and stir in toasted sesame oil and half of green onion and sesame seeds.",
      "In a separate small skillet, fry an egg sunny-side-up, keeping the yolk perfectly runny.",
      "Plate fried rice, place the fried egg on top, and garnish with nori strips, remaining green scallions, and sesame seeds."
    ],
    tips: [
      "The sourer and older the kimchi, the more flavorful your rice will be. Sweet, fresh kimchi won't cut it!",
      "Day-old cold dry rice is crucial; hot fresh rice turns mushy when stir-fried."
    ],
    nutrition: {
      calories: 390,
      protein: "9g",
      carbs: "62g",
      fat: "11g"
    },
    cuisine: "Korean",
    mealType: "Dinner",
    dietType: "Vegetarian",
    rating: 4.7,
    likes: 215,
    savedCount: 94,
    featured: false,
    trending: true,
    createdAt: "2026-06-17"
  },
  {
    id: "r4",
    title: "Air Fryer Crispy Avocado & Toast",
    description: "Crispy, breaded air-fried avocado slices layered on sourdough slathered with herby goat cheese spread. High protein, healthy fats, and a phenomenal crunch.",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=800",
    author: "Elena Rostov",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    prepTime: 10,
    cookTime: 8,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      "1 Medium ripe but firm avocado",
      "1/2 cup Panko breadcrumbs",
      "1 Egg, beaten",
      "1/4 cup All-purpose flour",
      "2 slices Artisanal Sourdough bread",
      "4 tbsp Goat cheese or cream cheese",
      "1 tbsp Lemon juice",
      "1 tsp Everything Bagel Seasoning",
      "Salt and red pepper flakes"
    ],
    instructions: [
      "Cut avocado in half, remove pit, peel the skin carefully, and slice into thick crescents.",
      "Set up three bowls for breading: flour in first, beaten egg in second, panko mixed with bagel seasoning in third.",
      "Dredge avocado slices in flour, dip in egg, then press firmly into panko until completely coated.",
      "Preheat air fryer to 200°C (400°F). Spray air fryer basket and avocados with oil spray.",
      "Air fry for 8 minutes, flipping halfway, until crispy and golden brown.",
      "Toast sourdough slices. Spread goat cheese generously. Top with crispy avocado slices, red pepper flakes, lemon juice, and extra seasoning."
    ],
    tips: [
      "Use avocadoes that are just yielding to gentle pressure. Overripe avocados will turn mushy during breading.",
      "This can be easily made vegan by substituting flaxegg for egg, and vegan cream cheese for goat cheese!"
    ],
    nutrition: {
      calories: 440,
      protein: "12g",
      carbs: "38g",
      fat: "24g"
    },
    cuisine: "American",
    mealType: "Breakfast",
    dietType: "Healthy",
    rating: 4.6,
    likes: 198,
    savedCount: 132,
    featured: false,
    trending: false,
    createdAt: "2026-06-10"
  },
  {
    id: "r5",
    title: "Street-Style Vegan Pad Thai",
    description: "An authentic, street food style Thai noodle stir-fry packed with golden tofu, crushed roasted peanuts, fresh bean sprouts, and a sweet, sour, and savory tamarind sauce.",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=800",
    author: "Prasert Chong",
    authorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200",
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    difficulty: "Medium",
    ingredients: [
      "150g Flat rice noodles",
      "150g Extra-firm tofu, cubed",
      "1/4 cup Pad Thai sauce (tamarind paste, coconut sugar, soy sauce)",
      "2 cloves Garlic, minced",
      "1 small Shallot, sliced",
      "1 cup Fresh bean sprouts",
      "1/2 cup Garlic chives, sliced",
      "1/4 cup Roasted peanuts, roughly crushed",
      "1 Lime, cut into wedges",
      "1 tbsp Pickled sweet radish (optional)",
      "Red chili powder to taste"
    ],
    instructions: [
      "Soak flat rice noodles in lukewarm water for 30-40 minutes until pliable but firm. Drain.",
      "In a small bowl, whisk tamarind paste, soy sauce, and melted coconut sugar to create your home-style Pad Thai sauce.",
      "Heat oil in a wok. Fry tofu cubes until crispy and golden on all sides. Push tofu to the side. ",
      "Add garlic, shallot, and pickled radish. Stir-fry for 1 minute until fragrant.",
      "Add soaked noodles and the Pad Thai sauce. Stir-fry aggressively over high heat, wrapping tofu and shallots into the noodles.",
      "If dry, add a splash of water so noodles cook through (about 2-3 minutes).",
      "Throw in chives and three-quarters of bean sprouts. Toss for 30 seconds.",
      "Serve hot garnished with crushed peanuts, remaining bean sprouts, red chili flakes, and a generous squeeze of fresh lime juice."
    ],
    tips: [
      "Never boil rice noodles for Pad Thai! soaking them in room temperature or warm water ensures they don't break or stick during stir-fry."
    ],
    nutrition: {
      calories: 410,
      protein: "15g",
      carbs: "68g",
      fat: "10g"
    },
    cuisine: "Thai",
    mealType: "Lunch",
    dietType: "Vegan",
    rating: 4.8,
    likes: 298,
    savedCount: 220,
    featured: true,
    trending: false,
    createdAt: "2026-06-08"
  },
  {
    id: "r6",
    title: "Crispy Smoky Tinga Mushrooms Tacos",
    description: "Smoky shredded king oyster mushrooms simmered in a rich chipotle-tomato sauce, piled onto blistered warm corn tortillas and completed with creamy cilantro-lime crema.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    author: "Elena Rostova",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    prepTime: 15,
    cookTime: 15,
    servings: 3,
    difficulty: "Easy",
    ingredients: [
      "400g King Oyster mushrooms",
      "1 Can Chipotle peppers in adobo sauce",
      "1 small White onion, sliced",
      "2 cloves Garlic, chopped",
      "1 tsp Mexican oregano",
      "1/2 cup Tomato puree",
      "6 Corn tortillas",
      "1 Avocado, sliced",
      "Fresh cilantro & lime",
      "Vegan sour cream or Greek yogurt (for crema)"
    ],
    instructions: [
      "Shred the king oyster mushrooms using a fork by scraping down the stalks to create a shredded 'pulled pork' texture.",
      "In a blender, blend chipotle peppers (use 1-2 based on spice pref), adobo sauce, chopped garlic, tomato puree, and oregano.",
      "Sauté sliced onion in oil until caramelized. Add shredded mushrooms and cook until golden brown and moisture evaporates.",
      "Pour chipotle tomato blend over mushrooms. Season with salt and simmer for 10 minutes until sauce thickens and coat mushrooms.",
      "Warm tortillas on iron griddle until slightly charred.",
      "Assemble tacos: spoon mushroom tinga onto tortillas, top with avocado slices, fresh cilantro leaves, chopped onion, and lime crema."
    ],
    tips: [
      "Using two forks to shred the mushroom stalks yields an incredible meaty texture that absorbs the sauce dramatically."
    ],
    nutrition: {
      calories: 320,
      protein: "8g",
      carbs: "45g",
      fat: "9g"
    },
    cuisine: "Mexican",
    mealType: "Dinner",
    dietType: "Vegan",
    rating: 4.7,
    likes: 185,
    savedCount: 110,
    featured: false,
    trending: true,
    createdAt: "2026-06-16"
  },
  {
    id: "r7",
    title: "Creamy Matcha Chia Seed Pudding",
    description: "A superfood nutrient powerhouse. High-quality ceremonial matcha blended with nutritious chia seeds, almond milk, and maple syrup, layered with fresh strawberry pureé.",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=800",
    author: "Elena Rostov",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      "1/4 cup Chia seeds",
      "1 cup Sweetened Vanilla Almond milk",
      "1 tsp Ceremonial grade Matcha powder",
      "1 tbsp Maple syrup",
      "1/2 cup Fresh strawberries, blended into a puree",
      "Blueberries and mint for garnish"
    ],
    instructions: [
      "In a jar, whisk matcha powder into warm almond milk thoroughly to avoid any lumps.",
      "Add maple syrup and stir in the chia seeds. Wait for 5 minutes, then give it another good stir to prevent clumping.",
      "Cover and refrigerate for at least 4 hours, or overnight, until it achieves a pudding consistency.",
      "To serve, spoon fresh strawberry puree at the bottom of two glasses.",
      "Layer the set matcha chia pudding on top. Garnish with fresh blueberries and a mint leaf."
    ],
    tips: [
      "Whisking the chia seeds a second time after 5-10 minutes is the secret to a perfectly uniform pudding without large gelatinous lumps."
    ],
    nutrition: {
      calories: 210,
      protein: "6g",
      carbs: "24g",
      fat: "8g"
    },
    cuisine: "American",
    mealType: "Breakfast",
    dietType: "Healthy",
    rating: 4.5,
    likes: 124,
    savedCount: 95,
    featured: false,
    trending: false,
    createdAt: "2026-06-03"
  },
  {
    id: "r8",
    title: "Sweet Sticky Rice with Fresh Mango",
    description: "Indulge in a classic blissful Thai dessert. Fragrant glutinous sticky rice cooked in sweet coconut milk, accompanied by luscious melt-in-the-mouth ripe sweet mangos.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800",
    author: "Prasert Chong",
    authorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200",
    prepTime: 15,
    cookTime: 20,
    servings: 3,
    difficulty: "Medium",
    ingredients: [
      "1 cup Thai Glutinous Sticky Rice",
      "1 Can Premium Unsweetened Coconut milk",
      "1/2 cup Sugar",
      "1/2 tsp Salt",
      "2 Large ripe fragrant sweet Mangos (Alphonso or Nam Dok Mai)",
      "1 tbsp Toasted mung beans or sesame seeds"
    ],
    instructions: [
      "Rinse glutinous rice until water runs clear, then soak in water for at least 3 hours (preferably overnight).",
      "Drain and steam the rice on a cheesecloth-lined steamer for 20 minutes until cooked and soft.",
      "In a saucepan over low heat, dissolve sugar and salt in 3/4 cup of coconut milk. Do not boil.",
      "Pour hot coconut mixture over the warm cooked rice. Cover and let sit for 25 minutes to absorb completely.",
      "Prepare a salted coconut topping sauce by heating remaining coconut milk with a pinch of salt and thickening with cornstarch.",
      "Peel and slice mangos. Scoop sweet sticky rice onto a plate, slide sliced mango alongside, drizzle with salted coconut topping, and sprinkle with toasted sesame seeds."
    ],
    tips: [
      "Regular jasmine rice or basmati rice will absolutely not work for this recipe! You strictly need Glutinous Sweet Rice."
    ],
    nutrition: {
      calories: 460,
      protein: "5g",
      carbs: "84g",
      fat: "14g"
    },
    cuisine: "Thai",
    mealType: "Desserts",
    dietType: "Vegetarian",
    rating: 4.9,
    likes: 580,
    savedCount: 312,
    featured: true,
    trending: true,
    createdAt: "2026-06-14"
  }
];

export const COLLECTIONS_DATA: FoodCollection[] = [
  {
    id: "c1",
    title: "Easy Dinners",
    description: "No time? No problem. These fast, simple, delicious dinners make weeknight cooking a absolute breeze without skimping on rich flavors.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
    recipeIds: ["r1", "r3", "r6"],
    category: "Easy Dinners"
  },
  {
    id: "c2",
    title: "Weekend Specials",
    description: "Take it slow. Treat yourself to elaborate, fragrant, and profoundly comforting recipes built for leisurely weekends with family and friends.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
    recipeIds: ["r2", "r8"],
    category: "Weekend Specials"
  },
  {
    id: "c3",
    title: "Party & Celebrations",
    description: "Elevate your hosting game. Exciting street food, crowd-pleasing snacks, refreshing beverages, and showstopping sweet dessert finishes.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600",
    recipeIds: ["r5", "r6", "r8"],
    category: "Party Food"
  }
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: "res1",
    title: "Subko Coffee Roasters & Bakehouse",
    description: "A gorgeous specialty artisanal coffee shop and sourdough bakery situated inside an old, beautifully restored Bandra cottage. Expect state-of-the-art pour-overs and buttery baked pastries.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
    location: "Bandra West, Mumbai",
    priceRange: "₹₹",
    rating: 4.8,
    highlights: ["Artisanal Sourdough", "Single-Origin Pour Overs", "Quaint Heritage Cottage Vibe", "Work Friendly"],
    category: "Best Cafes",
    mustTry: "Chocochip Sourdough Cookie & Flat White"
  },
  {
    id: "res2",
    title: "The Table",
    description: "One of Mumbai's most prestigious dining spots offering highly curated Farm-to-Table European philosophy with striking contemporary chic interiors, ideal for a refined intimate date night.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
    location: "Colaba, Mumbai",
    priceRange: "₹₹₹",
    rating: 4.7,
    highlights: ["Farm-to-Table ingredients", "Outstanding Wine Pairing", "Interactive Bar Bench", "Romantic Dim Lighting"],
    category: "Date Night Spots",
    mustTry: "The Table Burger & Truffle Fries"
  },
  {
    id: "res3",
    title: "Dome InterContinental",
    description: "An open-air spectacular rooftop bar looking over the iconic marine Queen's Necklace drive. Unbelievable sunset visual panoramas matched with premium cocktails and light finger foods.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800",
    location: "Marine Drive, Mumbai",
    priceRange: "₹₹₹₹",
    rating: 4.6,
    highlights: ["Spectacular Rooftop Skyline", "Mediterranean Lounges", "Live DJ Saxophonist", "Golden Hour Sunset Views"],
    category: "Rooftop Dining",
    mustTry: "Spiced Pomegranate Mule & Sushi Platters"
  },
  {
    id: "res4",
    title: "Britannia & Co. Restaurant",
    description: "Step straight back in time. Operational since the British era in a retro high-ceiling colonial design, serving legendary Iranian-Parsi delicacies with vintage Irani heritage charm.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    location: "Ballard Estate, Fort, Mumbai",
    priceRange: "₹₹",
    rating: 4.7,
    highlights: ["Historic 1923 Heritage", "Iconic Parsi Cuisine", "Friendly Vintage Hosts", "Nostalgic Glass Bottle Sodas"],
    category: "Hidden Gems",
    mustTry: "Mutton Berry Pulav & Caramel Custard"
  },
  {
    id: "res5",
    title: "Candies Cafe & Bakehouse",
    description: "An incredibly sprawling, popular, multi-level maze-like Portuguese-style villa covered in beautiful blue-and-white mosaics. Extremely beloved by college students for very cheap budget eats.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
    location: "Pali Hill, Bandra West, Mumbai",
    priceRange: "₹",
    rating: 4.5,
    highlights: ["Sprawling Multi-Floor Layout", "Beautiful Mosaic Murals", "Extreme College Budget Friendly", "Amazing Cool Slushies"],
    category: "Budget Eats",
    mustTry: "Macaroni Salad, Mutton Puffs, & Pink Lemonade"
  },
  {
    id: "res6",
    title: "Kala Ghoda Cafe",
    description: "A cozy cobblestone-vintage aesthetic café hidden inside an old brick-arched warehouse in Mumbai's artistic hub. Excellent organic healthy salads, single estates, and gluten free items.",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=800",
    location: "Kala Ghoda, Fort, Mumbai",
    priceRange: "₹₹",
    rating: 4.6,
    highlights: ["Arched Brick Architecture", "In-house Art gallery", "Delectable Gluten-Free baking", "Cozy Reading Nooks"],
    category: "Best Cafes",
    mustTry: "Waffles with local organic Honey & Pour-Over Macchiato"
  }
];

export const STREET_FOOD_DATA: StreetFood[] = [
  {
    id: "sf1",
    title: "Ashok Vada Pav",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=800",
    story: "Located right near Kirti College, this is arguably the birthplace of Mumbai's most frantic, crispy, garlic-chutney loaded Vada Pav culture. Ashok has been wrapping gold fried spiced potato balls in sweet bread since over 35 years.",
    recommendation: "Classic Choora Vada Pav with spicy red chutney and fried green chilies",
    location: "Dadar, Mumbai"
  },
  {
    id: "sf2",
    title: "Sardar Refreshments Pav Bhaji",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800",
    story: "If you believe there can never be too much butter, Sardar Pav Bhaji is your holy destination. Watch them smash mounds of sweet spicy seasonal veggies on huge iron tawas and melt entire blocks of Amul butter on top.",
    recommendation: "Cheese Pav Bhaji with twice-buttered pavs and sliced red onions",
    location: "Tardeo, Mumbai"
  },
  {
    id: "sf3",
    title: "Natraj Dahi Bhalla Corner",
    city: "Delhi",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
    story: "Serving since the independence era in the heart of chaotic Chandni Chowk, this minute shop whips up creamy, freezing cold spiced dahi bhallas layered with tart tamarind sweet chutney and spicy mint sprinkles.",
    recommendation: "Creamy Dahi Bhalla & Crispy deep-fried Aloo Tikki and mint dip",
    location: "Chandni Chowk, Old Delhi"
  },
  {
    id: "sf4",
    title: "Bedai and Jalebi at Deviram",
    city: "Delhi",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=800",
    story: "Early mornings in Delhi call for Deviram. Watch hundreds of dynamic street cooks fry crispy puffed whole-wheat pooris cooked with lentils (Bedai) served with aggressively hot potato curry and curling piping hot syrupy orange jalebis.",
    recommendation: "Bedai with spicy Aloo Sabzi and hot Jalebi plate",
    location: "Karol Bagh, New Delhi"
  },
  {
    id: "sf5",
    title: "Bedekar Misal Pav",
    city: "Pune",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    story: "Operational since 1948 in the traditional alleys of old Pune, Bedekar creates a uniquely spicy sprout-based curry (Katt/Rassa) spiked with crunchy farsan mix, topped with fresh coriander and soft slice pav bread.",
    recommendation: "Spicy Puneri Misal with local sweet-sour buttermilk drink (Tak)",
    location: "Shaniwar Peth, Pune"
  },
  {
    id: "sf6",
    title: "Vardan Street Puchka stall",
    city: "Kolkata",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
    story: "Kolkata puchka is completely distinct from standard pani puri. The crisp hollow wheat shells are packed with a highly spiced, punchy, citric mash of black chana, chillies, and boiled potatoes doused inside iced tart tamarind water.",
    recommendation: "Sursur-puchka with spicy lime-tamarind water",
    location: "Kala Mandir, Kolkata"
  },
  {
    id: "sf7",
    title: "Nimrah Cafe and Bakery",
    city: "Hyderabad",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800",
    story: "Under the shadow of the monumental Charminar since decades, this incredible spot feeds thousands of warm Irani chais every morning. Squeeze into wood benches, order a hot milk-reduced chai and a tray of buttery salted cookies.",
    recommendation: "Irani Chai with Osmania Biscuits & Fine Tie Biscuits",
    location: "Charminar, Hyderabad"
  }
];

export const FOOD_GUIDES_DATA: FoodGuide[] = [
  {
    id: "g1",
    title: "The Ultimate Guide to Knife Skills for Absolute Beginners",
    description: "Are you holding your knife the wrong way? Learn how to master the claw grip, make quick chops, and sliced vegetables smoothly. Knife care, selection, and sharpening demystified.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800",
    category: "Cooking Basics",
    content: "Holding your cook knife correctly makes vegetable dicing 3x faster and significantly safer. The secret lies in the 'Claw Grip' where your non-dominant hand holds the produce with fingers tucked safely back. Always curl your fingertips inward and press the flat side of your chef knife gently against your middle finger knuckle as a sliding guard.",
    author: "Elena Rostov",
    readTime: "6 Min Read",
    date: "June 14, 2026"
  },
  {
    id: "g2",
    title: "5 Kitchen Tools Worth Every Single Rupee of Investment",
    description: "Don't fall for useless gadgets. These are the top 5 high-utility essential kitchen tools that will genuine transform the speed, accuracy, and comfort of your cooking.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
    category: "Kitchen Tools",
    content: "If you want to cook like a chef, toss out single-use avocado slicers and invest in these items: 1) A heavy, sturdy 10-inch wooden cutting board that doesn't slip; 2) A high-carbon steel 8-inch chef's knife; 3) A pre-seasoned heavy Cast-iron skillet; 4) A microplane grater for garlic, citrus, or cheese; 5) An instant-read food digital probe thermometer.",
    author: "Kabir Malhotra",
    readTime: "8 Min Read",
    date: "June 11, 2026"
  },
  {
    id: "g3",
    title: "Meal Prep 101: How to Prep Like a Pro Without Getting Bored",
    description: "Tired of eating dry chicken breasts for 5 consecutive days? How to employ component prep instead of meal prep for endless delicious dinner modifications.",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800",
    category: "Meal Prep",
    content: "Instead of cooking exact full replicas of same meals in flat tupperware containers, master 'Component Prep'. Roast a tray of mixed seasonal vegetables, whip up three diverse flavorful sauces (cilantro crema, spicy peanut dressing, vinaigrette), cook one versatile batch of grain (quinoa, brown rice), and prep your proteins separate. Mix & match daily!",
    author: "Ji-Young Park",
    readTime: "10 Min Read",
    date: "June 05, 2026"
  }
];

export const INITIAL_COMMUNITY_PHOTOS: FoodieSubmission[] = [
  {
    id: "p1",
    username: "Rohan_Bites",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=500",
    dishName: "Smokey Mushrooms Tacos",
    caption: "Just tried Sonia's Smoky Tinga Mushrooms Tacos, absolutely blew my mind! 🤤 Tasted exactly like actual meat but totally vegan! #TasteTrails #TacoTuesday",
    likes: 85,
    likedByMe: false,
    location: "Mumbai",
    date: "Today"
  },
  {
    id: "p2",
    username: "Ananya_Eats_World",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=500",
    dishName: "Garlic Cream Penne",
    caption: "The easiest, most satisfying 15 minutes of my life! This penne was velvety, rich, and got approved by everyone in the house! 🍝❤️",
    likes: 120,
    likedByMe: true,
    location: "Pune",
    date: "Yesterday"
  }
];
