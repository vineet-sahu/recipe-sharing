import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./components/RecipeDetail";
import NotFound from "./components/NotFound";
import { CreateRecipe } from "./pages/CreateRecipe";
import { RecipeProvider } from "./context/RecipeContext";

import "./App.css";
import { Navbar } from "./components/UI/navbar";

function App() {

  return (
    <RecipeProvider>
          <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/create_recipes" element={<CreateRecipe />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
    </RecipeProvider>  
  );
}

export default App;
