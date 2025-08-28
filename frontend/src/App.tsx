import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./components/RecipeDetail";
import NotFound from "./components/NotFound";
import { CreateRecipe } from "./pages/CreateRecipe";

import "./App.css";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/create" element={<CreateRecipe />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
