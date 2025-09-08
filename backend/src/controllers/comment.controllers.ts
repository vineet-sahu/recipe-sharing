import { Request, Response } from "express";
import Comment from "../models/Comment";
import Recipe from "../models/Recipe";

export const createComment = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?._id;
    const { recipeId, text } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!recipeId || !text) {
      return res.status(400).json({ success: false, message: "Recipe ID and text are required" });
    }

    // Ensure recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    const comment = new Comment({
      recipe: recipeId,
      user: userId,
      text,
    });

    await comment.save();

    res.status(201).json({ success: true, comment });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCommentsByRecipe = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;

    if (!recipeId) {
      return res.status(400).json({ success: false, message: "Recipe ID is required" });
    }

    // Optional: check if recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    const comments = await Comment.find({ recipe: recipeId })
      .populate("user", "email") // populate user email
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
