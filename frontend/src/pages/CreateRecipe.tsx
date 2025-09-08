import React from "react";
import RecipeForm from "../components/RecipeForm";
import { useNavigate } from "react-router-dom";

export const CreateRecipe: React.FC = () => { 


  const navigate = useNavigate();

  return (
    <RecipeForm 
    onSave = {() => {
      navigate("/recipes");
    }}
    />
  );
}