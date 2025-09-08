import express from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { createComment, getCommentsByRecipe } from "../controllers/comment.controllers";
const router = express.Router();

router.post("/", authenticateJWT, createComment);

router.get("/recipe/:recipeId", getCommentsByRecipe);

export default router;
