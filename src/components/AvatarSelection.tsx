import React, { useState } from 'react';
import { ProgressIndicator } from './ProgressIndicator';

interface AvatarSelectionProps {
  onNext: (avatar: string) => void;
  onBack: () => void;
}

export const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onNext, onBack }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  const avatars = [
    { id: 'avatar1', color: 'bg-blue-300', initials: 'A' },
    { id: 'avatar2', color: 'bg-green-300', initials: 'B' },
    { id: 'avatar3', color: 'bg-purple-300', initials: 'C' },
    { id: 'avatar4', color: 'bg-pink-300', initials: 'D' },
    { id: 'avatar5', color: 'bg-yellow-300', initials: 'E' },
    { id: 'avatar6', color: 'bg-red-300', initials: 'F' },
    { id: 'avatar7', color: 'bg-indigo-300', initials: 'G' },
    { id: 'avatar8', color: 'bg-teal-300', initials: 'H' },
    { id: 'avatar9', color: 'bg-orange-300', initials: 'I' },
    { id: 'avatar10', color: 'bg-cyan-300', initials: 'J' },
    { id: 'avatar11', color: 'bg-emerald-300', initials: 'K' },
    { id: 'avatar12', color: 'bg-violet-300', initials: 'L' }
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
            Choose Your Avatar
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Select an avatar that represents you
          </p>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`group relative p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                  selectedAvatar === avatar.id
                    ? 'bg-gradient-to-r from-purple-200 to-blue-200 shadow-lg shadow-purple-200'
                    : 'bg-white hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${avatar.color} flex items-center justify-center text-white font-bold text-lg mx-auto mb-2`}>
                  {avatar.initials}
                </div>
                {selectedAvatar === avatar.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
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