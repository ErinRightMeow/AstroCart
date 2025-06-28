import React, { useState } from 'react';
import { ProgressIndicator } from './ProgressIndicator';

interface AvatarSelectionProps {
  onNext: (avatar: string) => void;
  onBack: () => void;
}

export const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onNext, onBack }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  const avatars = [
    { 
      id: 'apollo', 
      name: 'Apollo',
      description: 'God of Sun & Music',
      color: 'bg-gradient-to-br from-yellow-300 to-orange-300',
      symbol: '☀️'
    },
    { 
      id: 'athena', 
      name: 'Athena',
      description: 'Goddess of Wisdom',
      color: 'bg-gradient-to-br from-blue-300 to-indigo-300',
      symbol: '🦉'
    },
    { 
      id: 'venus', 
      name: 'Venus',
      description: 'Goddess of Love',
      color: 'bg-gradient-to-br from-pink-300 to-rose-300',
      symbol: '💕'
    },
    { 
      id: 'mercury', 
      name: 'Mercury',
      description: 'Messenger of Gods',
      color: 'bg-gradient-to-br from-purple-300 to-violet-300',
      symbol: '⚡'
    },
    { 
      id: 'diana', 
      name: 'Diana',
      description: 'Goddess of Hunt',
      color: 'bg-gradient-to-br from-green-300 to-emerald-300',
      symbol: '🏹'
    }
  ];

  const handleContinue = () => {
    if (selectedAvatar) {
      onNext(selectedAvatar);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <ProgressIndicator currentStep={2} totalSteps={4} />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Choose Your Divine Guide
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Select a mythological deity that resonates with your cosmic journey. They will stay with you along your path.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`group relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  selectedAvatar === avatar.id
                    ? 'bg-gradient-to-r from-purple-200 to-blue-200 shadow-xl shadow-purple-200 border-2 border-purple-300'
                    : 'bg-white hover:bg-slate-50 border border-slate-200 hover:shadow-lg'
                }`}
              >
                {selectedAvatar === avatar.id && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
                
                <div className={`w-20 h-20 rounded-full ${avatar.color} flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg`}>
                  {avatar.symbol}
                </div>
                
                <h3 className={`text-lg font-bold mb-1 ${selectedAvatar === avatar.id ? 'text-slate-800' : 'text-slate-800'}`}>
                  {avatar.name}
                </h3>
                
                <p className={`text-sm ${selectedAvatar === avatar.id ? 'text-slate-600' : 'text-slate-500'}`}>
                  {avatar.description}
                </p>
              </button>
            ))}
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
              disabled={!selectedAvatar}
              className={`flex-1 px-6 py-3 font-medium rounded-xl transition-all duration-200 ${
                selectedAvatar
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400 text-white hover:shadow-lg hover:shadow-purple-200 transform hover:scale-105'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};