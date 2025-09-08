import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes/index";
import NotFound from "./components/NotFound";
import { CreateRecipe } from "./pages/CreateRecipe";
import { RecipeProvider } from "./context/RecipeContext";

import "./App.css";
import { Navbar } from "./components/UI/navbar";
import RecipeView from "./pages/Recipes/RecipeView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";

// App.tsx
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
          <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<RecipeProvider> <Recipes /></RecipeProvider>} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App;