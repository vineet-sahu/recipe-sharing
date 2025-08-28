import React, { useEffect, useState } from "react";
import { seedRecipes } from "../seeds/recipes";


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

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  // Filters
  const [searchIngredient, setSearchIngredient] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [timeFilter, setTimeFilter] = useState<number | null>(null);

  // Sorting
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    // Simulate fetch
    const fetchRecipes = async () => {
      setRecipes(seedRecipes);
      setFilteredRecipes(seedRecipes);
    };

    fetchRecipes();
  }, []);

  // Filtering + Sorting
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by ingredient..."
          value={searchIngredient}
          onChange={(e) => setSearchIngredient(e.target.value)}
          className="border rounded-lg p-2 w-full bg-white text-black"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-lg p-2 w-full bg-white text-black"
        >
          <option value="">All Categories</option>
          <option value="Main Course">Main Course</option>
          <option value="Starter">Starter</option>
          <option value="Dessert">Dessert</option>
        </select>

        <select
          value={ratingFilter ?? ""}
          onChange={(e) =>
            setRatingFilter(e.target.value ? Number(e.target.value) : null)
          }
          className="border rounded-lg p-2 w-full bg-white text-black"
        >
          <option value="">Min Rating</option>
          <option value="3">3 ★ & up</option>
          <option value="4">4 ★ & up</option>
        </select>

        <select
          value={timeFilter ?? ""}
          onChange={(e) =>
            setTimeFilter(e.target.value ? Number(e.target.value) : null)
          }
          className="border rounded-lg p-2 w-full bg-white text-black"
        >
          <option value="">Max Prep Time</option>
          <option value="15">15 mins</option>
          <option value="30">30 mins</option>
          <option value="60">1 hr</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg p-2 w-full bg-white text-black"
        >
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
          <option value="date">Newest</option>
        </select>
      </div>

      {/* Recipe List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{recipe.title}</h2>
              <p className="text-sm text-gray-500">{recipe.category}</p>
              <p className="text-sm">⭐ {recipe.rating}</p>
              <p className="text-sm">⏱ {recipe.prepTime} mins</p>
              <p className="text-xs text-gray-400">
                {new Date(recipe.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
