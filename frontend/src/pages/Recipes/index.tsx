import React, { useEffect, useState } from "react";
import { useRecipes } from "../../context/RecipeContext";
import {isEqual} from "lodash";
import { ChefHat, Filter, Search } from "lucide-react";
import { RecipeCard } from "./RecipeCard";


// Types
type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  steps: string;
  category: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
  prepTime: number; // in minutes
};

const Recipes: React.FC = () => {

  const {
    recipes: recipeList,
    loadRecipes,
    // addRecipe,
    // updateRecipe,
    // deleteRecipe,
    // searchRecipes,
  } = useRecipes();

  const [recipes, setRecipes] = useState<Recipe[]>(recipeList);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  // Filters
  const [searchIngredient, setSearchIngredient] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [timeFilter, setTimeFilter] = useState<number | null>(null);
  

  // Sorting
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
    if (!isEqual(recipes, recipeList)) {
      console.log("updatation");
      setRecipes(recipeList);
    }
  }
  , [recipeList, recipes]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Replace this with real API call
        const response = await fetch("/seeds/recipes.json")
        const data = await response.json();

        // Update global store
        console.log("data", data);
        loadRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
        // fallback: load from localStorage
        loadRecipes();
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    let results = [...recipes];

    if (searchIngredient) {
      results = results.filter((r) =>
        r.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchIngredient.toLowerCase())
        )
      );
    }

    if (categoryFilter) {
      results = results.filter((r) => r.category === categoryFilter);
    }

    if (ratingFilter !== null) {
      results = results.filter((r) => r.rating >= ratingFilter);
    }

    if (timeFilter !== null) {
      results = results.filter((r) => r.prepTime <= timeFilter);
    }

    if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "date") {
      results.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setFilteredRecipes(results);
  }, [recipes, searchIngredient, categoryFilter, ratingFilter, timeFilter, sortBy]);


  const clearFilters = () => {
    setSearchIngredient("");
    setCategoryFilter("");
    setRatingFilter(null);
    setTimeFilter(null);
    setSortBy("");
  };

  return (
    <>
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              Browse Recipes
            </h1>
            <p className="text-gray-600 mt-2">
              Discover {filteredRecipes.length} amazing recipes from our community
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Filters Section */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Filters & Search</h2>
        {(searchIngredient || categoryFilter || ratingFilter || timeFilter || sortBy) && (
          <button
            onClick={clearFilters}
            className="ml-auto text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search recipes or ingredients..."
            value={searchIngredient}
            onChange={(e) => setSearchIngredient(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        >
          <option value="">All Categories</option>
          <option value="Main Course">Main Course</option>
          <option value="Starter">Starter</option>
          <option value="Dessert">Dessert</option>
        </select>

        {/* Rating Filter */}
        <select
          value={ratingFilter ?? ""}
          onChange={(e) =>
            setRatingFilter(e.target.value ? Number(e.target.value) : null)
          }
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        >
          <option value="">Any Rating</option>
          <option value="4">4★ & above</option>
          <option value="4.5">4.5★ & above</option>
        </select>

        {/* Time Filter */}
        <select
          value={timeFilter ?? ""}
          onChange={(e) =>
            setTimeFilter(e.target.value ? Number(e.target.value) : null)
          }
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        >
          <option value="">Any Time</option>
          <option value="15">Quick (≤15 min)</option>
          <option value="30">Medium (≤30 min)</option>
          <option value="60">Long (≤60 min)</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        >
          <option value="">Sort By</option>
          <option value="rating">Highest Rated</option>
          <option value="date">Most Recent</option>
          <option value="time">Quickest First</option>
        </select>
      </div>
    </div>

    {/* Results */}
    {filteredRecipes.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe, idx) => (
          <div
            key={`${idx}-${recipe.id}`}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
          >
            <RecipeCard recipe={recipe} />
           </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-16">
        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <Search className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
        <button
          onClick={clearFilters}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
        >
          Clear all filters
        </button>
      </div>
    )}
    </div>
    </>
  );
};

export default Recipes;
