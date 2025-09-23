import { Star } from "lucide-react";

interface RatingsProps {
  handleRating: (star: number) => void;
  setHoverRating: (star: number) => void;
  hoverRating: number;
  recipe: { rating: number };
}

export const Ratings = ({ handleRating, setHoverRating, hoverRating, recipe }: RatingsProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
          <Star className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Rate this Recipe</h2>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-gray-600">Your rating:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= (hoverRating || recipe.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {recipe.rating > 0 && (
          <span className="text-sm text-gray-600">
            You rated this {recipe.rating} star{recipe.rating !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
};
