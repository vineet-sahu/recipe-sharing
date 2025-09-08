import { Router } from "express";
import { createRecipe, getRecipeById, getRecipes } from "../controllers/recipe.controllers";
import { createRecipeSchema, validate } from "../validators/recipeValidator";
import { authenticateJWT } from "../middleware/auth.middleware";


const router = Router();

router.get("/", getRecipes)
router.get("/:id", getRecipeById)
router.post("/", 
    authenticateJWT,
    validate(createRecipeSchema), 
    createRecipe);

export default router;

