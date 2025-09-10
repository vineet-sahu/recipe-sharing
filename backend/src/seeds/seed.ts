import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "../models/Recipe";
import recipes from "./recipes.json"
import users from "./users.json"

import User from "../models/User";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    await Recipe.deleteMany();
    await User.deleteMany();

    const createdRecipes =  await Recipe.insertMany(recipes);
    const createdUsers  = await User.insertMany(users);

    console.log(`${createdRecipes.length} recipes inserted.`);
    console.log(`✅ ${createdUsers.length} users inserted.`);
    
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedData();
