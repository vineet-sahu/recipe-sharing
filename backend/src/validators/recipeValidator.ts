import { body } from "express-validator";

export const recipeValidator = [
  body("title")
    .isString().withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters"),

  body("ingredients")
    .isArray({ min: 2 }).withMessage("Ingredients must be an array with at least two item")
    .custom((ingredients) => ingredients.every((i: string) => typeof i === "string"))
    .withMessage("All ingredients must be strings"),

  body("steps")
    .optional()
    .isString().withMessage("Steps must be a string")
    .isLength({ min: 5 }).withMessage("Steps must be at least 5 characters long"),

  body("category")
    .optional()
    .isString().withMessage("Category must be a string"),

  body("type")
    .optional()
    .isIn(["Veg", "Non-Veg"]).withMessage("Type must be either Veg or Non-Veg"),

  body("imageUrl")
    .optional()
    .isURL().withMessage("Image URL must be a valid URL"),

  body("prepTime")
    .optional()
    .isInt({ min: 1 }).withMessage("Prep time must be a positive integer"),

  body("calories")
    .optional()
    .isInt({ min: 0 }).withMessage("Calories must be a non-negative integer"),

  body("servingSize")
    .optional()
    .isInt({ min: 1 }).withMessage("Serving size must be at least 1"),

  body("userRatings")
    .optional()
    .isArray().withMessage("UserRatings must be an array"),
  body("userRatings.*.user")
    .optional()
    .isMongoId().withMessage("Each rating must have a valid user id"),
  body("userRatings.*.rating")
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage("Each rating must be between 1 and 5"),
];
