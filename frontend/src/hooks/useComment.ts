import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { Comment } from "../types/Comment"; // define this interface in types

// Add comment mutation
export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment: { recipeId: string; text: string }) =>
      api.post("/comments", newComment),
    onSuccess: (_data, variables) => {
      // Invalidate or update comments cache for this recipe
      queryClient.invalidateQueries({ queryKey: ["comments", variables.recipeId] });
    },
  });
};

// Fetch comments for a recipe
export const useComments = (recipeId: string) => {
  return useQuery<Comment[]>({
    queryKey: ["comments", recipeId],
    queryFn: async () => {
      const res = await api.get(`/comments/recipe/${recipeId}`);

      console.log("comment res", res);
      return res.data.comments;
    },
    staleTime: 1000 * 60, // 1 min cache
  });
};
