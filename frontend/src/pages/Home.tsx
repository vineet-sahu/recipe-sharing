import { ChefHat, Users, Clock, Star, TrendingUp, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  const categoriesWithIcon = [
    { name: "Breakfast", emoji: "🥞", color: "from-yellow-400 to-orange-500" },
    { name: "Dessert", emoji: "🍰", color: "from-pink-400 to-rose-500" },
    { name: "Drink", emoji: "🥤", color: "from-blue-400 to-indigo-500" },
    { name: "Main Course", emoji: "🍛", color: "from-red-400 to-red-500" },
    { name: "Starter", emoji: "🥗", color: "from-emerald-400 to-green-500" }
  ]
  return (
    <>
          {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-yellow-100/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-full shadow-lg">
                <ChefHat className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Share My Recipe
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover amazing recipes from home cooks around the world. Share your culinary creations and build a community of food lovers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => {console.log('Navigate to /recipes'); navigate('/recipes');}}
                className="group cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Star className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                Browse Recipes
              </button>
              <button
                onClick={() => {console.log('Navigate to /create'); navigate('/create_recipes');}}
                className="group cursor-pointer bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-gray-200 hover:border-orange-300 flex items-center justify-center gap-2"
              >
                <ChefHat className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Share Your Recipe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Share My Recipe?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of home cooks sharing their passion for great food
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with passionate home cooks, share tips, and discover family recipes passed down through generations.
            </p>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="bg-gradient-to-r from-green-100 to-green-200 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy & Quick</h3>
            <p className="text-gray-600 leading-relaxed">
              Find recipes by cooking time, difficulty level, and dietary preferences. Get cooking faster with step-by-step guides.
            </p>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Trending Recipes</h3>
            <p className="text-gray-600 leading-relaxed">
              Stay up-to-date with the latest food trends and seasonal recipes that are loved by the community.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                10K+
              </div>
              <div className="text-orange-100 text-lg">Recipes Shared</div>
            </div>
            <div className="group">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                5K+
              </div>
              <div className="text-orange-100 text-lg">Home Cooks</div>
            </div>
            <div className="group">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                50K+
              </div>
              <div className="text-orange-100 text-lg">Recipe Views</div>
            </div>
            <div className="group">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                4.8★
              </div>
              <div className="text-orange-100 text-lg">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 sm:p-12 text-center shadow-lg">
          <Heart className="h-16 w-16 text-red-500 mx-auto mb-8 animate-pulse" />
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Share Your Culinary Magic?
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Every great dish tells a story. Share yours with the world and inspire others to create delicious memories.
          </p>
          
          <button
            onClick={() => {console.log('Navigate to /create'); navigate('/create_recipes');}}
            className="cursor-pointer inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
          >
            <ChefHat className="h-6 w-6 group-hover:rotate-12 transition-transform" />
            Start Sharing Today
          </button>
        </div>
      </div>

      {/* Popular Categories Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-lg text-gray-600">
            Explore recipes by your favorite cuisine types
          </p>
        </div>

        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
          {categoriesWithIcon.map((category) => (
            <button
              key={category.name}
              onClick={() =>
                navigate(`/recipes?category=${category.name.toLowerCase()}`)
              }
              className={`cursor-pointer group bg-gradient-to-br ${category.color} rounded-2xl p-6 text-center text-white hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {category.emoji}
              </div>
              <div className="font-semibold text-sm sm:text-base">{category.name}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;