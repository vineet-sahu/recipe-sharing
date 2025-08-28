import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: fetch details from backend
  const recipe = {
    title: "Sample Recipe",
    description: "This is a sample recipe description.",
    ingredients: ["Salt", "Pepper", "Oil"],
    instructions: "Mix everything and cook for 10 minutes.",
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
      <p className="mb-4">{recipe.description}</p>

      <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
      <ul className="list-disc ml-6 mb-4">
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
