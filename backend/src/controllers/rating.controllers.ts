import { Request, Response } from "express";
import Recipe from "../models/Recipe";

export const addOrUpdateRating = async (req: Request, res: Response) => {
  const { recipeId, rating } = req.body;
  const userId = (req as any).user?._id;

  if (!recipeId || !rating) {
    return res.status(400).json({ success: false, message: "Recipe ID and rating are required" });
  }

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    // Check if user already rated
    // const existingRating = recipe.ratings?.find(r => r.user.toString() === userId.toString());
    if (!recipe.userRatings) {
        recipe.userRatings = [];
    }

    const existingRatingIndex = recipe.userRatings?.findIndex(
        (r) => r.user.toString() === userId.toString()
      );
  
      if (existingRatingIndex !== undefined && existingRatingIndex > -1) {
        // Update
        if(recipe.userRatings[existingRatingIndex]){
            recipe.userRatings![existingRatingIndex].rating = rating;
        }
      } else {
        // Add new
        recipe.userRatings = recipe.userRatings || [];
        recipe.userRatings.push({ user: userId, rating });
      }

    // Optionally: compute average rating
    // Recalculate aggregated ratings
    const totalRatings = recipe.userRatings!.length;
    const totalScore = recipe.userRatings!.reduce((acc, r) => acc + r.rating, 0);
    const avgRating = totalScore / totalRatings;

    // Calculate rating distribution
    const distribution = { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };
    recipe.userRatings!.forEach((r) => {
      distribution[r.rating.toString() as keyof typeof distribution]++;
    });

    recipe.ratings = {
      averageRating: avgRating,
      totalReviews: totalRatings,
      ratingDistribution: distribution,
    };

    recipe.rating = avgRating;

    await recipe.save();

    // Return updated info
    const userRating = rating;
    res.json({ success: true, avgRating, userRating, ratings: recipe.ratings });

  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
