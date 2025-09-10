import { Calendar, ChefHat, Clock, Eye, 
  // Heart, 
  Star, 
  // Users 
} from "lucide-react";
import { Recipe } from "../../types/Recipe";
import placeholderImage from "../../assets/recipe-placeholder.svg";

type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  // helper for rendering stars (you may already have it elsewhere)
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition group flex flex-col">
      {/* Image */}
      <div className="aspect-w-16 aspect-h-9">
        <div className="relative h-48 overflow-hidden">
          {(recipe.image || recipe.imageUrl) ? (
            <img
              src={recipe.image || recipe.imageUrl || placeholderImage}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
              <ChefHat className="h-12 w-12 text-orange-500" />
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <a
              href={`/recipes?category=${encodeURIComponent(recipe.category)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition"
            >
              {recipe.category}
            </a>
          </div>

          {/* Heart Icon */}
          {/* <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button> */}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            {recipe.title}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">{renderStars(recipe.rating)}</div>
          <span className="text-sm font-medium text-gray-700">
            {recipe.rating}
          </span>
        </div>

        {/* Ingredients Preview */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {recipe.ingredients.slice(0, 3).join(", ")}
            {recipe.ingredients.length > 3 &&
              ` +${recipe.ingredients.length - 3} more`}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.prepTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(recipe.createdAt!).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          onClick={() => window.location.href = `/recipes/${recipe._id}`}>
            <Eye className="h-4 w-4" />
            View Recipe
          </button>
          {/* <button className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
            <Users className="h-4 w-4" />
          </button> */}
        </div>
      </div>
    </div>
  );
};
