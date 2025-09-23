import { Request, Response } from "express";
import Recipe from "../models/Recipe";
import { successResponse, errorResponse } from "../utils/response.util";

export const addOrUpdateRating = async (req: Request, res: Response) => {
  try {
    const { recipeId, rating } = req.body;
    const userId = (req as any).user?._id;

    
    if (!recipeId || typeof rating !== "number") {
      return errorResponse(res, "Recipe ID and numeric rating are required", 400);
    }

    if (!userId) {
      return errorResponse(res, "Unauthorized", 401);
    }

    
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return errorResponse(res, "Recipe not found", 404);
    }

    
    if (!Array.isArray(recipe.userRatings)) {
      recipe.userRatings = [];
    }

    
    const existingIndex = recipe.userRatings.findIndex(
      (r) => r.user.toString() === userId.toString()
    );

    if (existingIndex > -1) {
      recipe.userRatings[existingIndex]!.rating = rating; 
    } else {
      recipe.userRatings.push({ user: userId, rating }); 
    }

    
    const totalRatings = recipe.userRatings.length;
    const totalScore = recipe.userRatings.reduce((acc, r) => acc + r.rating, 0);
    const avgRating = Number((totalScore / totalRatings).toFixed(2)); 

    const distribution = { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };
    recipe.userRatings.forEach((r) => {
      const key = r.rating.toString() as keyof typeof distribution;
      if (distribution[key] !== undefined) distribution[key]++;
    });

    recipe.ratings = {
      averageRating: avgRating,
      totalReviews: totalRatings,
      ratingDistribution: distribution,
    };

    recipe.rating = avgRating;

    await recipe.save();

    return successResponse(res, {
      avgRating,
      userRating: rating,
      ratings: recipe.ratings,
    }, "Rating updated successfully");
  } catch (err: any) {
    console.error("Error in addOrUpdateRating:", err);
    return errorResponse(res, err.message, 500, err.errors);
  }
};
