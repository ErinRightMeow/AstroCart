import React from 'react';
import { Map, Info, ArrowRight } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';

interface AstrocartographyMapProps {
  onNext: () => void;
  onBack: () => void;
  userData: {
    birthDate: string;
    birthTime: string;
    birthLocation: string;
    currentLocation: string;
    avatar: string;
  };
}

export const AstrocartographyMap: React.FC<AstrocartographyMapProps> = ({ 
  onNext, 
  onBack, 
  userData 
}) => {
  const getAvatarDetails = () => {
    const avatars = {
      apollo: { color: 'bg-gradient-to-br from-yellow-300 to-orange-300', symbol: '☀️' },
      athena: { color: 'bg-gradient-to-br from-blue-300 to-indigo-300', symbol: '🦉' },
      venus: { color: 'bg-gradient-to-br from-pink-300 to-rose-300', symbol: '💕' },
      mercury: { color: 'bg-gradient-to-br from-purple-300 to-violet-300', symbol: '⚡' },
      diana: { color: 'bg-gradient-to-br from-green-300 to-emerald-300', symbol: '🏹' }
    };
    return avatars[userData.avatar as keyof typeof avatars] || avatars.apollo;
  };

  const avatarDetails = getAvatarDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <ProgressIndicator currentStep={3} totalSteps={5} />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100">
          {/* Header with Avatar */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 rounded-full ${avatarDetails.color} flex items-center justify-center text-2xl shadow-lg`}>
                {avatarDetails.symbol}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Your Personal Astrocartography Map
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              This map shows how planetary energies influence different locations around the world based on your birth chart. 
              Each line represents a different planetary influence that can affect various aspects of your life.
            </p>
          </div>

          {/* Birth Info Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Birth Date</h4>
                <p className="text-slate-600">{new Date(userData.birthDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Birth Time</h4>
                <p className="text-slate-600">{userData.birthTime}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Birth Location</h4>
                <p className="text-slate-600">{userData.birthLocation}</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative mb-8">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-12 text-center border-2 border-dashed border-slate-300">
              <Map className="w-24 h-24 text-slate-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-600 mb-4">Interactive Astrocartography Map</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-6">
                Your personalized map will appear here, showing planetary lines and their influences across the globe.
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-slate-300 text-slate-600">
                <Info className="w-4 h-4 mr-2" />
                Map integration coming soon
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-2xl p-6 mb-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">Planetary Line Meanings</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-slate-700 mb-1">Sun Lines</h4>
                <p className="text-sm text-slate-600">Identity, vitality, recognition</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-slate-700 mb-1">Moon Lines</h4>
                <p className="text-sm text-slate-600">Emotions, home, intuition</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-slate-700 mb-1">Venus Lines</h4>
                <p className="text-sm text-slate-600">Love, beauty, relationships</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-slate-700 mb-1">Mars Lines</h4>
                <p className="text-sm text-slate-600">Energy, action, courage</p>
              </div>
            </div>
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
              onClick={onNext}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-400 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-200 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
            >
              <span>Continue to Focus Selection</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};