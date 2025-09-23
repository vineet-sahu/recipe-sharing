import { response, Router } from "express";
import { createRecipe, getRecipeById, getRecipes } from "../controllers/recipe.controllers";
import { authenticateJWT } from "../middleware/auth.middleware";
import upload from "../middleware/multer";
import { recipeValidator } from "../validators/recipeValidator";
import { validate } from "../middleware/validate";


const router = Router();

router.get("/", getRecipes)
router.get("/:id", getRecipeById)
router.post("/", 
    authenticateJWT,
    upload.single('image'),
    recipeValidator,
    validate,
    createRecipe
);

export default router;

