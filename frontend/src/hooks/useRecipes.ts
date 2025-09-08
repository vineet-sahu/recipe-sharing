import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { Filters, Recipe } from "../types/Recipe";
import api from "../services/api";

interface RecipesResponse {
  recipes: Recipe[];
  hasMore: boolean;
}

export const useRecipes = (filters: Filters) => {
  return useInfiniteQuery<RecipesResponse, Error>({
    queryKey: ["recipes", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const page = pageParam as number;
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "10");

      if (filters.searchIngredient) params.append("search", filters.searchIngredient);
      if (filters.categoryFilter) params.append("category", filters.categoryFilter);
      if (filters.ratingFilter) params.append("rating", filters.ratingFilter.toString());
      if (filters.timeFilter) params.append("time", filters.timeFilter.toString());
      if (filters.sortBy) params.append("sort", filters.sortBy);

      const res = await api.get(`/recipes?${params.toString()}`);
      return res.data as RecipesResponse;
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
};



export const useRecipe = (id: string) => {
    return useQuery<Recipe>({
      queryKey: ["recipe", id],
      queryFn: async () => {
        const res = await api.get(`/recipes/${id}`);
        return res.data.recipe;
      },
      enabled: !!id,
    });
};

export const useAddRecipe = () => {
    const queryClient = useQueryClient();

    // console.log("calling add recipe hook");
    return useMutation({
      mutationFn: (newRecipe: Partial<Recipe>) => api.post("/recipes", newRecipe),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["recipes"] });
      },
    });
};


export const useUpdateRecipe = () => {
    const queryClient = useQueryClient();
    // console.log("calling update recipe hook");

    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<Recipe> }) =>
        api.put(`/recipes/${id}`, data),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ["recipes"] });
        queryClient.invalidateQueries({ queryKey: ["recipe", id] });
      },
    });
  };