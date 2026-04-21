import React, { useState } from 'react';
import { Stars, Sparkles, User, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { UserMenu } from './UserMenu';

interface LandingPageProps {
  onGetStarted: () => void;
  onViewReadings: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onViewReadings }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      onGetStarted();
    } else {
      setAuthMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* Header with Auth */}
      <div className="absolute top-6 right-6">
        {user ? (
          <UserMenu onViewReadings={onViewReadings} />
        ) : (
          <button
            onClick={handleSignIn}
            className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 hover:bg-white transition-all duration-200"
          >
            <LogIn className="w-4 h-4 text-purple-400" />
            <span className="text-slate-700 font-medium">Sign In</span>
          </button>
        )}
      </div>

      <div className="text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 relative">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Stars className="w-16 h-16 text-purple-400 animate-pulse" />
              <Sparkles className="w-8 h-8 text-blue-400 absolute -top-2 -right-2 animate-ping" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            AstroGuide
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light">
            Discover Your Cosmic Path
          </p>
        </div>

        {/* Description */}
        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6">
            Unlock the hidden energies of the Earth through astrocartography—a form of locational astrology that maps how the planets at your birth influence different places around the world. Discover where love flourishes, purpose unfolds, and prosperity flows.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleGetStarted}
          className="group relative px-12 py-4 bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold text-lg rounded-full hover:shadow-xl hover:shadow-purple-200 transform hover:scale-105 transition-all duration-300 ease-out"
        >
          <span className="relative z-10">
            {user ? 'Begin Your Journey' : 'Create Account & Start'}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-40">
          <Stars className="w-6 h-6 text-purple-300 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 opacity-40">
          <Sparkles className="w-4 h-4 text-blue-300 animate-ping" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-40">
          <Stars className="w-8 h-8 text-indigo-300 animate-pulse" />
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};