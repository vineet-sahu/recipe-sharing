import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  ChefHat, 
  Plus, 
  X, 
  Clock, 
  Save,
} from 'lucide-react';
import { useAddRecipe, useUpdateRecipe } from '../hooks/useRecipes';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { Recipe } from '../types/Recipe';
interface RecipeFormProps {
  recipe?: Recipe;
  isEditing?: boolean;
  onSave?: (recipe: Recipe) => void;
  onCancel?: () => void;
}

interface ImageFile extends File {
  preview: string;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ 
  recipe, 
  isEditing = false, 
  onSave = () => {}, 
  onCancel = () => {} 
}) => {
  const [formData, setFormData] = useState({
    title: recipe?.title || '',
    category: recipe?.category || '',
    prepTime: recipe?.prepTime || 30,
    image: recipe?.image || '',
    ingredients: recipe?.ingredients || [''],
    steps: recipe?.steps || ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [files, setFiles] = useState<ImageFile[]>([]);

  const { mutateAsync: addRecipe } = useAddRecipe();
  const { mutateAsync: updateRecipe } = useUpdateRecipe();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      }) as ImageFile
    );
    setFiles(filesWithPreview);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    }
  })

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (formData.prepTime < 1) newErrors.prepTime = 'Prep time must be at least 1 minute';

    const validIngredients = formData.ingredients.filter(ing => ing.trim());
    if (validIngredients.length < 2) newErrors.ingredients = 'At least 2 ingredients are required';

    if (!formData.steps.trim()) newErrors.steps = 'Recipe instructions are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    URL.revokeObjectURL(fileToRemove.preview);
    setFiles(files.filter((_, i) => i !== index));
  };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface RecipeResponse extends AxiosResponse<any, any> {
    recipe?:  Recipe;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      const formPayload = new FormData();
      formPayload.append("title", formData.title.trim());
      formPayload.append("category", formData.category);
      formPayload.append("prepTime", formData.prepTime.toString());
      formData.ingredients
        .filter((ing) => ing.trim())
        .forEach((ing, i) => formPayload.append(`ingredients[${i}]`, ing));
      formPayload.append("steps", formData.steps.trim());
  
      if (files.length > 0) {
        formPayload.append("image", files[0]); 
      }
  
      let response: RecipeResponse;
      if (isEditing && recipe) {
        response = await updateRecipe({ id: recipe._id, data: formPayload as Partial<Recipe>});
        console.log("Recipe updated successfully!");
        toast.success("Recipe updated successfully!");
      } else {
        response = await addRecipe(formPayload as Partial<Recipe>);
        console.log("Recipe created successfully!");
        toast.success("Recipe created successfully!");
      }
  
      onSave((response.data.recipe) as Recipe);
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Error saving recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
                    <ChefHat className="h-8 w-8 text-white" />
                  </div>
                  {isEditing ? 'Edit Recipe' : 'Create New Recipe'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {isEditing ? 'Update your recipe details' : 'Share your culinary creation with the community'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter recipe title..."
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 transition-colors ${
                    errors.title ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 transition-colors ${
                    errors.category ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Starter">Starter</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Snack">Snack</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preparation Time (minutes) *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="number"
                    min="1"
                    value={formData.prepTime}
                    onChange={(e) => handleInputChange('prepTime', parseInt(e.target.value) || 0)}
                    placeholder="30"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 transition-colors ${
                      errors.prepTime ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'
                    }`}
                  />
                </div>
                {errors.prepTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Recipe Image</h2>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                      isDragActive ? "bg-orange-50 border-orange-400" : "bg-gray-50 border-gray-300"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p className="text-orange-600">Drop the images here ...</p>
                    ) : (
                      <p className="text-gray-600">Drag & drop an image here, or click to select</p>
                    )}
                  </div>

                  {files.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2">Selected Image:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {files.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="cursor-pointer absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100"
                            >
                              ×
                            </button>
                            <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Ingredients</h2>
              <button
                type="button"
                onClick={addIngredient}
                className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                <Plus className="h-4 w-4" />
                Add Ingredient
              </button>
            </div>

            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-1">
                    <input
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}...`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                  </div>
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="cursor-pointer flex-shrink-0 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-3">{errors.ingredients}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Instructions</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Step-by-step instructions *
              </label>
              <textarea
                value={formData.steps}
                onChange={(e) => handleInputChange('steps', e.target.value)}
                placeholder={`1. Preheat oven to 350°F...\n2. Mix all dry ingredients...\n3. Add wet ingredients...`}
                rows={10}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 transition-colors resize-none ${
                  errors.steps ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'
                }`}
              />
              {errors.steps && (
                <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Recipe' : 'Save Recipe'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
