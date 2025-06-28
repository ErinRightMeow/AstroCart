import React, { useState } from 'react';
import { ProgressIndicator } from './ProgressIndicator';

interface AvatarSelectionProps {
  onNext: (avatar: string) => void;
  onBack: () => void;
}

export const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onNext, onBack }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  const avatars = [
    { id: 'avatar1', emoji: '👨‍💼', name: 'Professional' },
    { id: 'avatar2', emoji: '👩‍🎨', name: 'Creative' },
    { id: 'avatar3', emoji: '👨‍🔬', name: 'Analytical' },
    { id: 'avatar4', emoji: '👩‍🏫', name: 'Educator' },
    { id: 'avatar5', emoji: '👨‍⚕️', name: 'Healer' },
    { id: 'avatar6', emoji: '👩‍💻', name: 'Tech Innovator' },
    { id: 'avatar7', emoji: '👨‍🍳', name: 'Culinary Artist' },
    { id: 'avatar8', emoji: '👩‍🎤', name: 'Performer' },
    { id: 'avatar9', emoji: '👨‍🌾', name: 'Nature Lover' },
    { id: 'avatar10', emoji: '👩‍✈️', name: 'Adventurer' },
    { id: 'avatar11', emoji: '👨‍🎭', name: 'Artist' },
    { id: 'avatar12', emoji: '👩‍⚖️', name: 'Justice Seeker' }
  ];

  const handleContinue = () => {
    if (selectedAvatar) {
      onNext(selectedAvatar);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <ProgressIndicator currentStep={2} totalSteps={4} />
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Choose Your Avatar
          </h2>
          <p className="text-indigo-200 text-center mb-8">
            Select an avatar that resonates with your personality
          </p>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`group relative p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                  selectedAvatar === avatar.id
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-yellow-400/25'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <div className="text-4xl mb-2">{avatar.emoji}</div>
                <p className={`text-xs font-medium ${
                  selectedAvatar === avatar.id ? 'text-black' : 'text-white'
                }`}>
                  {avatar.name}
                </p>
                {selectedAvatar === avatar.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
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
              disabled={!selectedAvatar}
              className={`flex-1 px-6 py-3 font-medium rounded-xl transition-all duration-200 ${
                selectedAvatar
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
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