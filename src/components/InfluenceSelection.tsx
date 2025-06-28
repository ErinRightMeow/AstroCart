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
      title: 'Love & Relationships',
      description: 'Find cities where your romantic energy flourishes and meaningful connections await',
      icon: Heart,
      gradient: 'from-pink-300 to-rose-300',
      hoverGradient: 'from-pink-200 to-rose-200'
    },
    {
      type: 'career' as const,
      title: 'Career & Growth',
      description: 'Discover locations that align with your professional aspirations and career advancement',
      icon: Briefcase,
      gradient: 'from-blue-300 to-indigo-300',
      hoverGradient: 'from-blue-200 to-indigo-200'
    },
    {
      type: 'wealth' as const,
      title: 'Wealth & Prosperity',
      description: 'Uncover places where financial opportunities and abundance naturally flow to you',
      icon: DollarSign,
      gradient: 'from-yellow-300 to-orange-300',
      hoverGradient: 'from-yellow-200 to-orange-200'
    }
  ];

  const handleContinue = () => {
    if (selectedInfluence) {
      onNext(selectedInfluence);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <ProgressIndicator currentStep={3} totalSteps={4} />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Choose Your Focus
          </h2>
          <p className="text-slate-600 text-center mb-8">
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
                      ? `bg-gradient-to-r ${influence.gradient} shadow-lg border-2 border-white`
                      : 'bg-white hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${influence.gradient} flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-white'}`} />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                    {influence.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed ${isSelected ? 'text-white/90' : 'text-slate-600'}`}>
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
              className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-300 transition-all duration-200"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedInfluence}
              className={`flex-1 px-6 py-3 font-medium rounded-xl transition-all duration-200 ${
                selectedInfluence
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400 text-white hover:shadow-lg hover:shadow-purple-200 transform hover:scale-105'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
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