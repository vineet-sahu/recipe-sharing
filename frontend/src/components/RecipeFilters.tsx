import React from "react";
import { Filter, Search } from "lucide-react";
import { useRecipeContext } from "../context/RecipeContext";

const RecipeFilters: React.FC = () => {
  const { filters, setFilters, clearFilters } = useRecipeContext();

  console.log("filtersfiltersfiltersfilters", filters);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Filters & Search</h2>
        {(filters.searchIngredient ||
          filters.categoryFilter ||
          filters.ratingFilter ||
          filters.timeFilter ||
          filters.sortBy) && (
          <button
            onClick={clearFilters}
            className="ml-auto text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search recipes or ingredients..."
            value={filters.searchIngredient}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchIngredient: e.target.value }))
            }
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>

        <select
          value={filters.categoryFilter?.toLowerCase() ?? ""}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, categoryFilter: e.target.value }))
          }
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        >
          <option value="">All Categories</option>
          <option value="main course">Main Course</option>
          <option value="starter">Starter</option>
          <option value="dessert">Dessert</option>
          <option value="drink">Drink</option>
          <option value="breakfast">Breakfast</option>
        </select>

        <select
          value={filters.ratingFilter ?? ""}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              ratingFilter: e.target.value ? Number(e.target.value) : null,
            }))
          }
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        >
          <option value="">Any Rating</option>
          <option value="4">4★ & above</option>
          <option value="4.5">4.5★ & above</option>
        </select>

        <select
          value={filters.timeFilter ?? ""}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              timeFilter: e.target.value ? Number(e.target.value) : null,
            }))
          }
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        >
          <option value="">Any Time</option>
          <option value="15">Quick (≤15 min)</option>
          <option value="30">Medium (≤30 min)</option>
          <option value="60">Long (≤60 min)</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        >
          <option value="">Sort By</option>
          <option value="rating">Highest Rated</option>
          <option value="date">Most Recent</option>
          <option value="time">Quickest First</option>
        </select>
      </div>
    </div>
  );
};

export default RecipeFilters;
