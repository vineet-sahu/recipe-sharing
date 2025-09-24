import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/Home";
import { RecipeProvider } from "../../context/RecipeContext";
import Recipes from "../../pages/Recipes";
import RecipeView from "../../pages/Recipes/RecipeView";
import ProtectedRoute from "../ProtectedRoute";
import { CreateRecipe } from "../../pages/CreateRecipe";
import Login from "../../pages/Login";
import { Signup } from "../../pages/Signup";
import NotFound from "../NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/recipes"
        element={
          <RecipeProvider>
            <Recipes />
          </RecipeProvider>
        }
      />
      <Route path="/recipes/:id" element={<RecipeView />} />

      <Route
        path="/create_recipes"
        element={
          <ProtectedRoute>
            <CreateRecipe />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
