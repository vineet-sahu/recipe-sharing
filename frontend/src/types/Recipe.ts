export interface RatingInfo {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export type RecipeType = "Veg" | "Non-Veg";

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  steps: string;
  category: string;
  image?: string;
  rating: number; // overall rating (can be average)
  prepTime: number; // in minutes
  type?: RecipeType; // defaults to Veg if not defined
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  ratings?: RatingInfo;
  servingSize?: number;
  calories?: number;
  authorId?: string;
}