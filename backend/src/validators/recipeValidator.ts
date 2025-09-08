// validators/recipeValidator.ts
import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  ingredients: z.array(z.string()).nonempty("At least one ingredient required"),
  steps: z.string().min(1, "Steps are required"),
  category: z.string().optional(),
  imageUrl: z.string().url().optional(),
  prepTime: z.number().optional(),
  calories: z.number().optional(),
  servingSize: z.number().optional(),
  type: z.enum(["Veg", "Non-Veg"]).default("Veg"),
});

// Middleware
export const validate =
  (schema: any) => (req: any, res: any, next: any) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.errors,
      });
    }
  };
