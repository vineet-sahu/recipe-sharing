import React, { useEffect, useRef } from "react";
import { ChefHat, 
  Search } from "lucide-react";
import { RecipeCard } from "../../components/UI/RecipeCard";
import { useRecipeContext } from "../../context/RecipeContext";
import { useSearchParams } from "react-router-dom";
import RecipeFilters from "../../components/RecipeFilters";
import { useRecipes } from "../../hooks/useRecipes";

const Recipes: React.FC = () => {
  const {
    filters,
    setFilters,
    clearFilters
  } = useRecipeContext();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useRecipes(filters);

    const recipes =
    data?.pages.flatMap((page) => page.recipes) ?? [];

  const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      const searchIngredient = searchParams.get("search") || "";
      const categoryFilter = searchParams.get("category") || "";
      const ratingFilter = searchParams.get("rating")
        ? Number(searchParams.get("rating"))
        : null;
  
      setFilters((prev) => ({
        ...prev,
        searchIngredient,
        categoryFilter,
        ratingFilter,
      }));
    }, [searchParams, setFilters]);

    useEffect(() => {
      const params: Record<string, string> = {};
      if (filters.searchIngredient) params.search = filters.searchIngredient;
      if (filters.categoryFilter) params.category = filters.categoryFilter;
      if (filters.ratingFilter) params.rating = filters.ratingFilter.toString();
      setSearchParams(params);
    }, [filters, setSearchParams]);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current as Element;

    if (loaderRef.current) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <p className="text-center py-16">Loading recipes...</p>;
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-red-600">
        Failed to fetch recipes. Please try again later.
      </div>
    );
  }

  return (
    <>
    {/* Header */}
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
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
              Discover {recipes.length} amazing recipes from our community
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Filters + Results */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RecipeFilters />

      {recipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>

          {/* Loader for Infinite Scroll */}
          <div ref={loaderRef} className="py-10 text-center">
            {isFetchingNextPage && <p>Loading more recipes...</p>}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No recipes found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search terms
          </p>
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
