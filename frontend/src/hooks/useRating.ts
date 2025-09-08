// hooks/useRating.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

interface RatingPayload {
  recipeId: string;
  rating: number;
}

export const useAddRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RatingPayload) => api.post("/ratings/rate", payload),
    onSuccess: (_data, payload) => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({queryKey: ["recipe", payload.recipeId] });
    },
  });
};
