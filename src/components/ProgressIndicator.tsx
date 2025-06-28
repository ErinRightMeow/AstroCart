import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-indigo-200">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium text-indigo-200">{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>
      <div className="w-full bg-indigo-900/30 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-indigo-400 to-purple-400 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};