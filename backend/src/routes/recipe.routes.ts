import { response, Router } from "express";
import { createRecipe, getRecipeById, getRecipes } from "../controllers/recipe.controllers";
import { createRecipeSchema, validate } from "../validators/recipeValidator";
import { authenticateJWT } from "../middleware/auth.middleware";
import upload from "../middleware/multer";


const router = Router();

router.get("/", getRecipes)
router.get("/:id", getRecipeById)
router.post("/", 
    authenticateJWT,
    upload.single('image'),
    validate(createRecipeSchema),
    createRecipe
);

export default router;

