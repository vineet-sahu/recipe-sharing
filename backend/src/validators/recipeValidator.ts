// validators/recipeValidator.ts
import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  ingredients: z.preprocess(
    (val) => {
      if (Array.isArray(val)) return val;
      if (typeof val === "string") return [val];
      return [];
    },
    z.array(z.string()).nonempty("At least one ingredient required")
  ),
  steps: z.string().min(1, "Steps are required"),
  category: z.string().optional(),
  imageUrl: z.string().url().optional(),
  prepTime: z.preprocess((val) => Number(val), z.number().optional()),
  calories: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().optional()),
  servingSize: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().optional()),
  type: z.enum(["Veg", "Non-Veg"]).default("Veg"),
});


// Middleware
export const validate =
  (schema: any) => (req: any, res: any, next: any) => {

    try {
      const parsed = schema.parse(req.body);
      req.body = parsed; // ✅ now safe & typed
      next();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };