export interface Recipe {
    id: string;
    title: string;
    ingredients: string[];
    steps: string;
    category: string;
    image?: string;
    rating: number;
    prepTime: number;
    createdAt: string;
    updatedAt: string;
  }