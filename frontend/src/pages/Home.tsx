import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🍳 Share My Recipe</h1>
      <p className="mb-6">Welcome! Browse or share your favorite recipes.</p>

      <div className="flex gap-4">
        <Link
          to="/recipes"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Browse Recipes
        </Link>
        <Link
          to="/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Recipe
        </Link>
      </div>
    </div>
  );
};

export default Home;
