export interface RatingInfo {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export type RecipeType = "Veg" | "Non-Veg";

export interface Recipe extends RecipeBase {
  _id: string;
}

export type NewRecipe = Omit<RecipeBase, 'createdAt' | 'updatedAt'>;
interface RecipeBase {
  title: string;
  ingredients: string[];
  category: string;
  type?: RecipeType;
  prepTime?: number;
  steps?: string;
  image?: string;
  imageUrl?: string;
  rating: number;
  createdAt?: string; 
  updatedAt?: string;
  ratings?: RatingInfo;
  servingSize?: number;
  calories?: number;
  authorId?: string;
}
export interface Filters {
  searchIngredient?: string;
  categoryFilter?: string;
  ratingFilter?: number | null;
  timeFilter?: number | null;
  sortBy?: string;
};