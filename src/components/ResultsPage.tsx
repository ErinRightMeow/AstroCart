import React from 'react';
import { MapPin, Users, Star, Share2, ArrowLeft, Briefcase, Calendar, Building, Heart, DollarSign } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';
import { UserData, CityRecommendation } from '../types';

interface ResultsPageProps {
  userData: UserData;
  onBack: () => void;
  onStartOver: () => void;
}

interface CityWithAstroData extends CityRecommendation {
  lines: string;
  meaning: string;
  nextStep: {
    title: string;
    description: string;
    action: string;
  };
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ userData, onBack, onStartOver }) => {
  const getCityRecommendations = (): CityWithAstroData[] => {
    const nextStepsByInfluence = {
      love: {
        title: 'Find Local Dating Events',
        description: 'Connect with singles in your area through organized meetups and social gatherings',
        action: 'Browse Events'
      },
      career: {
        title: 'Explore Job Opportunities',
        description: 'Search for career opportunities and professional networking events in this city',
        action: 'View Jobs'
      },
      wealth: {
        title: 'Connect with Financial Advisors',
        description: 'Find certified financial planners and investment opportunities in this location',
        action: 'Find Advisors'
      }
    };

    if (userData.influence === 'love') {
      return [
        {
          name: 'Lisbon',
          country: 'Portugal',
          distance: '~5,755 km',
          population: '',
          lines: 'Venus Descendant, Moon Descendant',
          meaning: 'Strong potential for romantic relationships, emotional connection, and being seen as desirable by others.',
          reasons: [],
          nextStep: nextStepsByInfluence.love
        },
        {
          name: 'Istanbul',
          country: 'Turkey',
          distance: '~8,499 km',
          population: '',
          lines: 'Moon Descendant',
          meaning: 'Deep emotional bonds, nurturing partnerships, and intuitive relational energy.',
          reasons: [],
          nextStep: nextStepsByInfluence.love
        },
        {
          name: 'Rome',
          country: 'Italy',
          distance: '~7,289 km',
          population: '',
          lines: 'Moon Descendant',
          meaning: 'Ideal for heartfelt relationships, emotional resonance, and feeling cared for in connections.',
          reasons: [],
          nextStep: nextStepsByInfluence.love
        }
      ];
    } else if (userData.influence === 'career') {
      return [
        {
          name: 'San Francisco',
          country: 'USA',
          distance: '~4,075 km',
          population: '',
          lines: 'Sun Midheaven',
          meaning: 'Strong visibility, leadership potential, and recognition for your talents.',
          reasons: [],
          nextStep: nextStepsByInfluence.career
        },
        {
          name: 'Sydney',
          country: 'Australia',
          distance: '~15,767 km',
          population: '',
          lines: 'Mars Midheaven',
          meaning: 'Energizing for ambition, courage, and direct action in leadership.',
          reasons: [],
          nextStep: nextStepsByInfluence.career
        },
        {
          name: 'Bangkok',
          country: 'Thailand',
          distance: '~14,390 km',
          population: '',
          lines: 'Saturn Ascendant',
          meaning: 'Ideal for building long-term authority, structure, and mastering your craft.',
          reasons: [],
          nextStep: nextStepsByInfluence.career
        }
      ];
    } else if (userData.influence === 'wealth') {
      return [
        {
          name: 'San Francisco',
          country: 'USA',
          distance: '~4,075 km',
          population: '',
          lines: 'Venus Midheaven',
          meaning: 'Prosperity through social capital, charm, and artistic or people-driven success.',
          reasons: [],
          nextStep: nextStepsByInfluence.wealth
        },
        {
          name: 'Seattle',
          country: 'USA',
          distance: '~3,943 km',
          population: '',
          lines: 'Venus Midheaven',
          meaning: 'Similar to SF — potential for beauty-meets-business energy, luxury, or values-aligned wealth.',
          reasons: [],
          nextStep: nextStepsByInfluence.wealth
        },
        {
          name: 'Buenos Aires',
          country: 'Argentina',
          distance: '~8,118 km',
          population: '',
          lines: 'Jupiter Midheaven',
          meaning: 'Expansion and success through teaching, travel, international markets, or abundance-minded ventures.',
          reasons: [],
          nextStep: nextStepsByInfluence.wealth
        }
      ];
    } else {
      // Fallback - should not reach here with current flow
      return [];
    }
  };

  const cities = getCityRecommendations();

  const handleShare = () => {
    const shareText = `I just discovered my perfect cities for ${userData.influence} using AstroGuide! ✨`;
    if (navigator.share) {
      navigator.share({
        title: 'My AstroGuide Results',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('Results copied to clipboard!');
    }
  };

  const getInfluenceColor = () => {
    switch (userData.influence) {
      case 'love': return 'from-pink-300 to-rose-300';
      case 'career': return 'from-blue-300 to-indigo-300';
      case 'wealth': return 'from-yellow-300 to-orange-300';
      default: return 'from-purple-300 to-blue-300';
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <ProgressIndicator currentStep={4} totalSteps={4} />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100 mb-6">
          {/* Avatar and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className={`w-24 h-24 rounded-full ${avatarDetails.color} flex items-center justify-center text-4xl shadow-lg`}>
                {avatarDetails.symbol}
              </div>
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Your Cosmic Insights
            </h2>
            <p className="text-slate-600 text-lg">
              Based on your birth chart, here are the perfect cities for your <span className="font-bold">{userData.influence} journey</span>
            </p>
          </div>

          {/* City Recommendations */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center justify-center">
              <MapPin className="w-6 h-6 mr-2 text-purple-400" />
              Top Astrocartography Influences
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {cities.map((city, index) => (
                <div key={city.name} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-slate-800">{city.name}</h4>
                    <div className="flex items-center text-purple-400">
                      <Star className="w-5 h-5 mr-1 fill-current" />
                      <span className="text-sm font-medium">#{index + 1}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-2">{city.country}</p>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Distance from Virginia Beach: {city.distance}</span>
                  </div>

                  {/* Love Lines / Line Information */}
                  <div className="mb-4">
                    <h5 className="text-slate-800 font-semibold mb-2">
                      {userData.influence === 'love' ? 'Love Lines:' : 'Line:'}
                    </h5>
                    <p className="text-purple-600 font-medium text-sm mb-2">{city.lines}</p>
                    <p className="text-slate-700 text-sm">{city.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal Action Links */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-300 to-indigo-300 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Job Opportunities
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-green-300 to-emerald-300 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" />
                Networking Events
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-300 to-violet-300 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                <Building className="w-5 h-5 mr-2" />
                Conferences
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBack}
              className="flex items-center justify-center px-6 py-3 bg-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-300 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-300 to-emerald-300 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-green-200 transform hover:scale-105 transition-all duration-200"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Results
            </button>
            <button
              onClick={onStartOver}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-400 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-200 transform hover:scale-105 transition-all duration-200"
            >
              Start New Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};