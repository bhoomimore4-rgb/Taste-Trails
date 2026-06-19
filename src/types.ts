export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  rating?: number;
}

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  authorAvatar?: string;
  prepTime: number; // in mins
  cookTime: number; // in mins
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  tips: string[];
  nutrition: NutritionInfo;
  cuisine: "Indian" | "Italian" | "Chinese" | "Korean" | "Mexican" | "Thai" | "American";
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "Desserts";
  dietType: "All" | "Vegetarian" | "Vegan" | "High Protein" | "Healthy";
  rating: number;
  likes: number;
  savedCount: number;
  featured?: boolean;
  trending?: boolean;
  createdAt: string;
}

export interface Restaurant {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  priceRange: "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹";
  rating: number;
  highlights: string[];
  category: "Best Cafes" | "Date Night Spots" | "Rooftop Dining" | "Budget Eats" | "Hidden Gems";
  mustTry: string;
}

export interface StreetFood {
  id: string;
  title: string;
  description?: string;
  image: string;
  city: "Mumbai" | "Delhi" | "Pune" | "Kolkata" | "Hyderabad";
  story: string;
  recommendation: string;
  location: string;
}

export interface FoodGuide {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "Cooking Basics" | "Kitchen Tools" | "Meal Prep" | "Grocery Tips" | "Seasonal" | "Trends";
  content: string;
  author: string;
  readTime: string;
  date: string;
}

export interface FoodieSubmission {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  likedByMe?: boolean;
  dishName: string;
  location?: string;
  date: string;
}

export interface FoodCollection {
  id: string;
  title: string;
  description: string;
  image: string;
  recipeIds: string[];
  category: "Easy Dinners" | "Weekend Specials" | "Party Food";
}
