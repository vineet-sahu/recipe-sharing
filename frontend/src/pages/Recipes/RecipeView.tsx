import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipe } from "../../hooks/useRecipes";

import { 
  ArrowLeft, 
  Clock, 
  Star, 
  ChefHat,
  MessageCircle,
} from 'lucide-react';
import { useAddComment, useComments } from '../../hooks/useComment';
import {useAddRating} from '../../hooks/useRating';
import { Ingredients } from './Ingredients';
import { Steps } from './Steps';
import { Ratings } from './Ratings';
import CommentsSection from './CommentSection';

const RecipeView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  const { data: recipe, isLoading, error } = useRecipe(id!);
  const { data: fetchedComments = [], isLoading: isCommentsLoading, error: commentError } = useComments(id!);

  const addCommentMutation = useAddComment();
  const addRatingMutation = useAddRating();

  console.log('Recipe data:', recipe);
  console.log('Comments data----:', fetchedComments);  
  console.log('Comments isCommentsLoading:', isCommentsLoading);
  console.log('Comments commentError:', commentError);

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
    try {
      await addCommentMutation.mutateAsync({ recipeId: recipe._id, text: newComment.trim() });
      setNewComment("");
    } catch (err) {
      alert(`Failed to submit comment ${err}`);
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
            
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.category}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{recipe.title}</h1>
              
              
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
                  <span>{fetchedComments.length} comments</span>
                </div>
              </div>
            </div>


          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          { recipe && <Ingredients recipe={recipe} /> }

          
          <div className="lg:col-span-2 space-y-8">
            
            <Steps steps={steps} />

            
            <Ratings { ...{handleRating ,setHoverRating, hoverRating, recipe}} />

            
            <CommentsSection
              comments={fetchedComments}
              onSubmitComment={handleCommentSubmit}   
/>          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeView;