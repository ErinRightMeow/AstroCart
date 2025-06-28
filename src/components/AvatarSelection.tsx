import React, { useState } from 'react';
import { ProgressIndicator } from './ProgressIndicator';

interface AvatarSelectionProps {
  onNext: (avatar: string) => void;
  onBack: () => void;
}

export const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onNext, onBack }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  const avatars = [
    { id: 'avatar1', color: 'bg-blue-500', initials: 'A' },
    { id: 'avatar2', color: 'bg-green-500', initials: 'B' },
    { id: 'avatar3', color: 'bg-purple-500', initials: 'C' },
    { id: 'avatar4', color: 'bg-pink-500', initials: 'D' },
    { id: 'avatar5', color: 'bg-yellow-500', initials: 'E' },
    { id: 'avatar6', color: 'bg-red-500', initials: 'F' },
    { id: 'avatar7', color: 'bg-indigo-500', initials: 'G' },
    { id: 'avatar8', color: 'bg-teal-500', initials: 'H' },
    { id: 'avatar9', color: 'bg-orange-500', initials: 'I' },
    { id: 'avatar10', color: 'bg-cyan-500', initials: 'J' },
    { id: 'avatar11', color: 'bg-emerald-500', initials: 'K' },
    { id: 'avatar12', color: 'bg-violet-500', initials: 'L' }
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
            Select an avatar that represents you
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
                <div className={`w-12 h-12 rounded-full ${avatar.color} flex items-center justify-center text-white font-bold text-lg mx-auto mb-2`}>
                  {avatar.initials}
                </div>
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