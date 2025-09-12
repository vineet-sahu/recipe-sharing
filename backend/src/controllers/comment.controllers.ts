import { Request, Response } from "express";
import mongoose from "mongoose";
import Comment from "../models/Comment";
import Recipe from "../models/Recipe";
import { errorResponse, successResponse } from "../utils/response.util";

export const createComment = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { recipeId, text } = req.body;

    if (!userId) return errorResponse(res, "Unauthorized", 401);
    if (!recipeId || !text) return errorResponse(res, "Recipe ID and text are required", 400);
    if (!mongoose.Types.ObjectId.isValid(recipeId)) return errorResponse(res, "Invalid Recipe ID format", 400);

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return errorResponse(res, "Recipe not found", 404);

    const comment = await Comment.create({ recipe: recipeId, user: userId, text });

    return successResponse(res, { comment }, "Comment created successfully", 201);
  } catch (error: any) {
    console.error(error);
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return errorResponse(res, "Invalid input", 400, validationErrors);
    }
    return errorResponse(res, "Internal server error", 500, error.message);
  }
};

export const getCommentsByRecipe = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;

    if (!recipeId) return errorResponse(res, "Recipe ID is required", 400);
    if (!mongoose.Types.ObjectId.isValid(recipeId)) return errorResponse(res, "Invalid Recipe ID format", 400);

    const comments = await Comment.find({ recipe: recipeId })
      .populate("user", "email")
      .sort({ createdAt: -1 });

    return successResponse(res, { comments }, "Comments retrieved successfully");
  } catch (error: any) {
    console.error(error);
    return errorResponse(res, "Internal server error", 500, error.message);
  }
};
