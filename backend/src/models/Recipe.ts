import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUserRating {
  user: Types.ObjectId;
  rating: number;
}

export interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  category?: string; 
  steps?: string;
  type?: "Veg" | "Non-Veg"; 
  imageUrl?: string;
  prepTime?: number; 
  rating?: number;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  calories?: number;
  servingSize?: number;

  
  ratings?: {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
      "5": number;
      "4": number;
      "3": number;
      "2": number;
      "1": number;
    };
  };

  
  userRatings?: IUserRating[];
}

const UserRatingSchema = new Schema<IUserRating>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { _id: false }
);

const RecipeSchema: Schema<IRecipe> = new Schema(
  {
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    steps: { type: String, required: true },
    category: { type: String },
    type: { type: String, enum: ["Veg", "Non-Veg"], default: "Veg" },
    imageUrl: { type: String },
    prepTime: { type: Number },
    rating: {type: Number, default: 0},
    calories: { type: Number },
    servingSize: { type: Number },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },

    ratings: {
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
      ratingDistribution: {
        "5": { type: Number, default: 0 },
        "4": { type: Number, default: 0 },
        "3": { type: Number, default: 0 },
        "2": { type: Number, default: 0 },
        "1": { type: Number, default: 0 },
      },
    },

    userRatings: [UserRatingSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IRecipe>("Recipe", RecipeSchema);
