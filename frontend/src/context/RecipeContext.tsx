import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  PropsWithChildren,
} from "react";

// ==================
// Types
// ==================
export type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  steps: string;
  category: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

type RecipeState = typeof initialState;

type RecipeAction = {
  type: string;
  payload?: any;
};

export type RecipeContextValue = RecipeState & {
  loadRecipes: () => void;
  addRecipe: (
    recipeData: Omit<Recipe, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateRecipe: (id: string, recipeData: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  selectRecipe: (recipe: Recipe) => void;
  clearSelected: () => void;
  clearError: () => void;
  getRecipeById: (id: string) => Recipe | undefined;
  searchRecipes: (query: string) => Recipe[];
  getRecipesByCategory: (category: string) => Recipe[];
};

// ==================
// Constants
// ==================
export const RECIPE_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  LOAD_RECIPES: "LOAD_RECIPES",
  ADD_RECIPE: "ADD_RECIPE",
  UPDATE_RECIPE: "UPDATE_RECIPE",
  DELETE_RECIPE: "DELETE_RECIPE",
  SELECT_RECIPE: "SELECT_RECIPE",
  CLEAR_SELECTED: "CLEAR_SELECTED",
} as const;

const initialState = {
  recipes: [] as Recipe[],
  loading: false,
  error: null as string | null,
  selectedRecipe: null as Recipe | null,
};

// ==================
// Context
// ==================
export const RecipeContext = createContext<RecipeContextValue | undefined>(
  undefined
);

// ==================
// Reducer
// ==================
const recipeReducer = (
  state: RecipeState,
  action: RecipeAction
): RecipeState => {
  switch (action.type) {
    case RECIPE_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case RECIPE_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case RECIPE_ACTIONS.LOAD_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
        error: null,
      };

    case RECIPE_ACTIONS.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
        loading: false,
        error: null,
      };

    case RECIPE_ACTIONS.UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
        selectedRecipe: action.payload,
        loading: false,
        error: null,
      };

    case RECIPE_ACTIONS.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) => recipe.id !== action.payload
        ),
        selectedRecipe:
          state.selectedRecipe?.id === action.payload
            ? null
            : state.selectedRecipe,
        loading: false,
        error: null,
      };

    case RECIPE_ACTIONS.SELECT_RECIPE:
      return { ...state, selectedRecipe: action.payload };

    case RECIPE_ACTIONS.CLEAR_SELECTED:
      return { ...state, selectedRecipe: null };

    default:
      return state;
  }
};

// ==================
// Provider
// ==================
export const RecipeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Load recipes from localStorage on mount
  useEffect(() => {
    loadRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save to localStorage whenever recipes change
  useEffect(() => {
    if (state.recipes.length > 0) {
      localStorage.setItem("recipes", JSON.stringify(state.recipes));
    }
  }, [state.recipes]);

  // ==================
  // Action Creators
  // ==================
  const loadRecipes = () => {
    try {
      dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: true });

      const savedRecipes = localStorage.getItem("recipes");
      const recipes = savedRecipes ? JSON.parse(savedRecipes) : [];

      dispatch({ type: RECIPE_ACTIONS.LOAD_RECIPES, payload: recipes });
    } catch {
      dispatch({
        type: RECIPE_ACTIONS.SET_ERROR,
        payload: "Failed to load recipes",
      });
    }
  };

  const addRecipe = (
    recipeData: Omit<Recipe, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: true });

      const newRecipe: Recipe = {
        id: Date.now().toString(),
        ...recipeData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch({ type: RECIPE_ACTIONS.ADD_RECIPE, payload: newRecipe });
    } catch {
      dispatch({
        type: RECIPE_ACTIONS.SET_ERROR,
        payload: "Failed to add recipe",
      });
    }
  };

  const updateRecipe = (id: string, recipeData: Partial<Recipe>) => {
    try {
      dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: true });

      const updatedRecipe: Recipe = {
        ...(state.recipes.find((r) => r.id === id) as Recipe),
        ...recipeData,
        id,
        updatedAt: new Date().toISOString(),
      };

      dispatch({ type: RECIPE_ACTIONS.UPDATE_RECIPE, payload: updatedRecipe });
    } catch {
      dispatch({
        type: RECIPE_ACTIONS.SET_ERROR,
        payload: "Failed to update recipe",
      });
    }
  };

  const deleteRecipe = (id: string) => {
    try {
      dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: RECIPE_ACTIONS.DELETE_RECIPE, payload: id });

      const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id);
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    } catch {
      dispatch({
        type: RECIPE_ACTIONS.SET_ERROR,
        payload: "Failed to delete recipe",
      });
    }
  };

  const selectRecipe = (recipe: Recipe) => {
    dispatch({ type: RECIPE_ACTIONS.SELECT_RECIPE, payload: recipe });
  };

  const clearSelected = () => {
    dispatch({ type: RECIPE_ACTIONS.CLEAR_SELECTED });
  };

  const clearError = () => {
    dispatch({ type: RECIPE_ACTIONS.SET_ERROR, payload: null });
  };

  // ==================
  // Helpers
  // ==================
  const getRecipeById = (id: string) =>
    state.recipes.find((recipe) => recipe.id === id);

  const searchRecipes = (query: string) => {
    if (!query) return state.recipes;

    const lowercaseQuery = query.toLowerCase();
    return state.recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowercaseQuery) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(lowercaseQuery)
        )
    );
  };

  const getRecipesByCategory = (category: string) =>
    state.recipes.filter((recipe) => recipe.category === category);

  const value: RecipeContextValue = {
    ...state,
    loadRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    selectRecipe,
    clearSelected,
    clearError,
    getRecipeById,
    searchRecipes,
    getRecipesByCategory,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};

// ==================
// Hook
// ==================
export const useRecipes = (): RecipeContextValue => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }

  return context;
};
