import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipe } from "../../hooks/useRecipes";

import { 
  ArrowLeft, 
  Clock, 
//   Users, 
  Star, 
  ChefHat,
  Utensils,
  MessageCircle,
  Send
} from 'lucide-react';
import { CommentCard } from '../../components/CommentCard';
import { Comment } from '../../types/Comment';
// import { useQueryClient } from '@tanstack/react-query';
import { useAddComment, useComments } from '../../hooks/useComment';
import {useAddRating} from '../../hooks/useRating';

const RecipeView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const { data: recipe, isLoading, error } = useRecipe(id!);
  const { data: fetchedComments = [], isLoading: isCommentsLoading, error: commentError } = useComments(id!);

  const addCommentMutation = useAddComment();
  const addRatingMutation = useAddRating();

  console.log('Recipe data:', recipe);
  console.log('Comments data----:', fetchedComments);  
  console.log('Comments isCommentsLoading:', isCommentsLoading);
  console.log('Comments commentError:', commentError);


  useEffect(() => {
    // Set comments from API
    console.log('Fetched comments:', fetchedComments);
    setComments(fetchedComments);
  }, [fetchedComments]);

  if (isLoading) {
    return <p>Loading recipe...</p>;
  }
  if (error || !recipe) {
    return <p>Recipe not found.</p>;
  }

  const handleRating = (rating: number) => {

    if (!recipe?._id) return;

    addRatingMutation.mutate({ recipeId: recipe._id, rating });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
  
    setIsSubmittingComment(true);
    try {
      await addCommentMutation.mutateAsync({ recipeId: recipe._id, text: newComment.trim() });
      setNewComment("");
      setComments(fetchedComments);
    } catch (err) {
      alert(`Failed to submit comment ${err}`);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  const steps = (recipe.steps || "").split('\n').filter(step => step.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Recipes</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recipe Hero */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-8">
          <div className="relative h-96 bg-gradient-to-r from-orange-500 to-red-500">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ChefHat className="h-24 w-24 text-white/60" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/30"></div>
            
            {/* Recipe Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.category}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{recipe.title}</h1>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.prepTime} mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span>{recipe.rating.toFixed(1)} rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{comments.length} comments</span>
                </div>
              </div>
            </div>


          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
                  <Utensils className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Ingredients</h2>
              </div>

              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-all"
                  >
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions and Interactions Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Instructions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
                  <ChefHat className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Instructions</h2>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="leading-relaxed text-gray-700">
                        {step.trim()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Section */}
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

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Comments ({comments.length})
                </h2>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts about this recipe..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    disabled={!newComment.trim() || isSubmittingComment}
                    className="bg-gradient-to-r  cursor-pointer from-orange-500 to-red-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <CommentCard comment={comment}/>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeView;