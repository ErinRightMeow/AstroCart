import React, { useState } from 'react';
import { Heart, Briefcase, DollarSign } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';

interface InfluenceSelectionProps {
  onNext: (influence: 'love' | 'career' | 'wealth') => void;
  onBack: () => void;
}

export const InfluenceSelection: React.FC<InfluenceSelectionProps> = ({ onNext, onBack }) => {
  const [selectedInfluence, setSelectedInfluence] = useState<'love' | 'career' | 'wealth' | null>(null);

  const influences = [
    {
      type: 'love' as const,
      planet: 'Venus',
      title: 'Love & Relationships',
      description: 'Find cities where your romantic energy flourishes and meaningful connections await',
      icon: Heart,
      gradient: 'from-pink-500 to-rose-500',
      hoverGradient: 'from-pink-400 to-rose-400'
    },
    {
      type: 'career' as const,
      planet: 'Mars',
      title: 'Career & Growth',
      description: 'Discover locations that align with your professional aspirations and career advancement',
      icon: Briefcase,
      gradient: 'from-blue-500 to-indigo-500',
      hoverGradient: 'from-blue-400 to-indigo-400'
    },
    {
      type: 'wealth' as const,
      planet: 'Jupiter',
      title: 'Wealth & Prosperity',
      description: 'Uncover places where financial opportunities and abundance naturally flow to you',
      icon: DollarSign,
      gradient: 'from-yellow-500 to-orange-500',
      hoverGradient: 'from-yellow-400 to-orange-400'
    }
  ];

  const handleContinue = () => {
    if (selectedInfluence) {
      onNext(selectedInfluence);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <ProgressIndicator currentStep={3} totalSteps={3} />
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Choose Your Focus
          </h2>
          <p className="text-indigo-200 text-center mb-8">
            What aspect of your life would you like to enhance?
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {influences.map((influence) => {
              const Icon = influence.icon;
              const isSelected = selectedInfluence === influence.type;
              
              return (
                <button
                  key={influence.type}
                  onClick={() => setSelectedInfluence(influence.type)}
                  className={`group relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? `bg-gradient-to-r ${influence.gradient} shadow-2xl`
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${influence.gradient} flex items-center justify-center mb-4 mx-auto ${
                    isSelected ? 'bg-white/20' : ''
                  }`}>
                    <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-white'}`} />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${isSelected ? 'text-white' : 'text-white'}`}>
                    {influence.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed ${isSelected ? 'text-white/90' : 'text-indigo-200'}`}>
                    {influence.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-200"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedInfluence}
              className={`flex-1 px-6 py-3 font-medium rounded-xl transition-all duration-200 ${
                selectedInfluence
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Get My Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};