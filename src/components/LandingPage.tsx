import React from 'react';
import { Stars, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 relative">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Stars className="w-16 h-16 text-yellow-400 animate-pulse" />
              <Sparkles className="w-8 h-8 text-indigo-300 absolute -top-2 -right-2 animate-ping" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent mb-4">
            AstroGuide
          </h1>
          <p className="text-xl md:text-2xl text-indigo-200 font-light">
            Discover Your Cosmic Path
          </p>
        </div>

        {/* Description */}
        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-indigo-100 leading-relaxed mb-6">
            Unlock personalized astrological insights that guide you toward the perfect cities for love, career, and wealth based on your unique cosmic blueprint.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl mb-2">💝</div>
              <h3 className="font-semibold text-indigo-200">Love Alignment</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl mb-2">💼</div>
              <h3 className="font-semibold text-indigo-200">Career Growth</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold text-indigo-200">Wealth Creation</h3>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="group relative px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-yellow-400/25 transform hover:scale-105 transition-all duration-300 ease-out"
        >
          <span className="relative z-10">Begin Your Journey</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-30">
          <Stars className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 opacity-30">
          <Sparkles className="w-4 h-4 text-purple-300 animate-ping" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-30">
          <Stars className="w-8 h-8 text-indigo-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
};