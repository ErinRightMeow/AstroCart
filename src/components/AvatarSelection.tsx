import React, { useState } from 'react';
import { ProgressIndicator } from './ProgressIndicator';

interface AvatarSelectionProps {
  onNext: (avatar: string) => void;
  onBack: () => void;
}

// A list of placeholder avatars. In a real app, these would be in your public folder.
const avatars = [
  '/avatars/avatar-1.svg',
  '/avatars/avatar-2.svg',
  '/avatars/avatar-3.svg',
  '/avatars/avatar-4.svg',
  '/avatars/avatar-5.svg',
  '/avatars/avatar-6.svg',
];

export const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onNext, onBack }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedAvatar) {
      onNext(selectedAvatar);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <ProgressIndicator currentStep={2} totalSteps={3} />
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Choose Your Avatar
          </h2>
          <p className="text-indigo-200 text-center mb-8">
            Select an image that represents you on this cosmic journey.
          </p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
            {avatars.map((avatar) => {
              const isSelected = selectedAvatar === avatar;
              return (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`aspect-square rounded-full border-4 bg-white/10 p-2 transition-all duration-300 transform hover:scale-110 ${
                    isSelected ? 'border-indigo-400' : 'border-transparent'
                  }`}
                >
                  <img src={avatar} alt="User Avatar" className="w-full h-full object-cover rounded-full" />
                </button>
              );
            })}
          </div>

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