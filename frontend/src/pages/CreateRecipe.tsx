import React from "react";
import RecipeForm from "../components/RecipeForm";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../types/Recipe";

export const CreateRecipe: React.FC = () => { 


  const navigate = useNavigate();

  return (
    <RecipeForm 
    onSave = {(recipe: Recipe) => {
      console.log("reciepe======", recipe);
      if(recipe?._id){
        navigate("/recipes/" + recipe?._id);
      }
    }}
    />
  );
}