import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChefHat, 
  // Heart,
   Menu, X, Search, 
  // User, 
  Home, LogOut, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";


      
export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {logout, user} = useAuth();
  const location =  useLocation();
  const navigate = useNavigate();

      {/* Navigation Bar */}
      return (<nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => { console.log('Navigate to /'); navigate('/');}}
                className="cursor-pointer flex items-center gap-2 cursor-pointer text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors"
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                Share My Recipe
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => { console.log('Navigate to /'); navigate('/');}}
                className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                <Home className="h-4 w-4" />
                Home
              </button>
              <button 
                onClick={() => { console.log('Navigate to /recipes'); navigate('/recipes');}}
                className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                <Search className="h-4 w-4" />
                Browse Recipes
              </button>
              <button 
                onClick={() => { console.log('Navigate to /create_recipes'); navigate('/create_recipes');}}
                className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                <ChefHat className="h-4 w-4" />
                Create Recipe
              </button>
                {/* 🔹 Sign In / Sign Out */}
                {user ? (
                  <button
                    onClick={async () => {
                      await logout?.();
                    }}
                    className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600 transition-colors font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate(`/login?redirect=${location.pathname}`);
                    }}
                    className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600 transition-colors font-medium"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </button>)}
              {/* <button 
                onClick={() => console.log('Navigate to /favorites')}
                className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                <Heart className="h-4 w-4" />
                My Favorites
              </button>
              <button 
                onClick={() => console.log('Navigate to /profile')}
                className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300"
              >
                <User className="h-4 w-4" />
                Profile
              </button> */}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2 border border-gray-200">
                {/* Home */}
                <button 
                  onClick={() => {
                    navigate("/");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  <Home className="h-4 w-4" />
                  Home
                </button>

                {/* Browse Recipes */}
                <button 
                  onClick={() => {
                    navigate("/recipes");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  <Search className="h-4 w-4" />
                  Browse Recipes
                </button>

                {/* Create Recipe */}
                <button 
                  onClick={() => {
                    navigate("/create_recipes");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  <ChefHat className="h-4 w-4" />
                  Create Recipe
                </button>

                {/* 🔹 Sign In / Sign Out */}
                {user ? (
                  <button
                    onClick={async () => {
                      await logout?.();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-3 py-2 text-red-600 hover:text-red-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate(`/login?redirect=${location}`);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </button>
                )}
              


                {/* <button 
                  onClick={() => {
                    navigate("/favorites");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  <Heart className="h-4 w-4" />
                  My Favorites
                </button> */}

                {/* <button 
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  <User className="h-4 w-4" />
                  Profile
                </button> */}
              </div>
            </div>
          )}

        </div>
      </nav>);
}
      