
import { Request, Response } from "express";
// import recipes from "../../src/seeds/recipes.json";
import RecipeModel, { IRecipe } from "../models/Recipe";
import Recipe from "../models/Recipe";
import { MulterRequest } from '../types/MulterRequest';

export const getRecipes = async (req: Request, res: Response) => {
  try {
    //  Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    //  Filters
    const search = req.query.search as string;
    const category = req.query.category as string;
    const rating = req.query.rating ? Number(req.query.rating) : null;
    const time = req.query.time ? Number(req.query.time) : null;
    const sortBy = req.query.sort as string;

    //  Build query
    const query: any = {};

    if (search) {
      query.ingredients = { $regex: search, $options: "i" }; // case-insensitive
    }

    if (category) {
      query.category = { $regex: `^${category}$`, $options: "i"};
    }

    if (rating !== null) {
      query.rating = { $gte: rating };
    }

    if (time !== null) {
      query.prepTime = { $lte: time };
    }

    //  Sorting
    let sort: any = {};
    if (sortBy === "rating") {
      sort.rating = -1;
    } else if (sortBy === "date") {
      sort.createdAt = -1;
    } else if (sortBy === "time") {
      sort.prepTime = 1;
    }


    //  Query DB
    const recipes = await RecipeModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalCount = await RecipeModel.countDocuments(query);
    const hasMore = page * limit < totalCount;

    res.json({
      success: true,
      recipes,
      hasMore,
    });
  } catch (error) {
    console.error("Error loading recipes:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to load recipes" });
  }
};



export const getRecipeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if(!id){
    return res.json({
      success: false,
      message: "Recipe ID is required"
    })
  } 
  // const recipe = recipes.find(r => parseInt(r.id) === parseInt(id));

  const recipe = await RecipeModel.findById(id)

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: "Recipe not found",
    });
  }

  res.json({ success: true, recipe });
}

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const createdBy = (req as any).user?._id;

    if (!createdBy) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // If image was uploaded via multer-storage-cloudinary
    const imageUrl = req.file?.path || "";


    console.log("req.file=========================2222", req.file);
    console.log("req.files======666666", req.files);


    const recipeData: Partial<IRecipe> = {
      ...req.body,
      createdBy,
      imageUrl, // store Cloudinary URL
    };


    console.log("before Created Recipe:", recipeData);

    const recipe = new Recipe(recipeData);
    await recipe.save();

    console.log("Created Recipe:", recipe);

    res.status(201).json({ success: true, recipe, message: "Recipe created successfully" });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRecipe = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, ingredients } = req.body;
  if (!title || !ingredients) {
    return res.status(400).json({
      success: false,
      message: "Title and ingredients are required"
    });
  }
  // Dummy update - replace with DB call
  const updatedRecipe = { id, title, ingredients };
  res.json({ success: true, recipe: updatedRecipe });
}

// export const deleteRecipe = (req: Request, res: Response) => {
//   const { id } = req.params;
//   // Dummy deletion - replace with DB call
//   res.json({ success: true, message: `Recipe ${id} deleted` });
// }   
//       success: false,
//         message: "Invalid email or password" }); 