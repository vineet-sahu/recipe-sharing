/* eslint-disable @typescript-eslint/no-explicit-any */
import { Utensils } from "lucide-react"

export const Ingredients = ({recipe}: any) => {
  return  <div className="grid grid-cols-1 gap-8">
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
        {(recipe?.ingredients || []).map((ingredient: any, index: any) => (
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
  </div>
}