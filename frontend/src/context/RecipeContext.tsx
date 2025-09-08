import React, { createContext, useContext, useState } from "react";
import { Filters } from "../types/Recipe";

type RecipeContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  clearFilters: () => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [filters, setFilters] = useState<Filters>({
    searchIngredient: "",
    categoryFilter: "",
    ratingFilter: null,
    timeFilter: null,
    sortBy: "",
  });

  const clearFilters = () =>
    setFilters({
      searchIngredient: "",
      categoryFilter: "",
      ratingFilter: null,
      timeFilter: null,
      sortBy: "",
    });

  return (
    <RecipeContext.Provider value={{ filters, setFilters, clearFilters }}>
      {children}
    </RecipeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRecipeContext = () => {
  const ctx = useContext(RecipeContext);
  if (!ctx) {
    throw new Error("useRecipeContext must be used inside RecipeProvider");
  }
  return ctx;
};
