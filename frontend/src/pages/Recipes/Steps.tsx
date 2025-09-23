/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChefHat } from "lucide-react";

export const Steps = ({steps}: any) => {    
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
          <ChefHat className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Instructions</h2>
      </div>

      <div className="space-y-4">
        {steps && steps.map((step: any, index: any) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-all"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white">
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="leading-relaxed text-gray-700">
                {step.trim()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}