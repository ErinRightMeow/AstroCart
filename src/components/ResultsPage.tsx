import React from 'react';
import { MapPin, Users, Star, Share2, ArrowRight, ArrowLeft, Briefcase, Calendar, Building } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';
import { UserData, CityRecommendation } from '../types';

interface ResultsPageProps {
  userData: UserData;
  onBack: () => void;
  onStartOver: () => void;
}

interface CityWithNextStep extends CityRecommendation {
  nextStep: {
    title: string;
    description: string;
    action: string;
  };
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ userData, onBack, onStartOver }) => {
  // Mock data for demonstration - in production, this would come from Swiss Ephemeris calculations
  const getCityRecommendations = (): CityWithNextStep[] => {
    const baseCities = [
      { name: 'Mexico City', country: 'Mexico', distance: '1,200 miles', population: '978,908' },
      { name: 'Buenos Aires', country: 'Argentina', distance: '5,500 miles', population: '1.6M' },
      { name: 'Lagos', country: 'Nigeria', distance: '2,400 miles', population: '675,218' }
    ];

    const reasonsByInfluence = {
      love: [
        'Strong Venus planetary line alignment',
        'High concentration of compatible energy',
        'Favorable lunar aspects for relationships'
      ],
      career: [
        'Powerful Mercury-Jupiter conjunction',
        'Enhanced professional networking energy',
        'Optimal timing for career advancement'
      ],
      wealth: [
        'Cities with the strongest astrological alignment for your wealth goals',
        'Locations where planetary influences support your personal growth and success',
        'Places with optimal cosmic timing for major life decisions and opportunities'
      ]
    };

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

    return baseCities.map(city => ({
      ...city,
      reasons: reasonsByInfluence[userData.influence!],
      nextStep: nextStepsByInfluence[userData.influence!]
    }));
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

  const getMainBulletPoints = () => {
    switch (userData.influence) {
      case 'wealth':
        return [
          'Jupiter Midheaven (MC) Line – Brings big career opportunities, luck, and public success.',
          'Venus Midheaven (MC) Line – Attracts money through charm, beauty, and social visibility.',
          'Venus Ascendant (AC) Line – Makes you magnetic to people and wealth-building connections.'
        ];
      case 'love':
        return [
          'Strong Venus planetary line alignment',
          'High concentration of compatible energy',
          'Favorable lunar aspects for relationships'
        ];
      case 'career':
        return [
          'Powerful Mercury-Jupiter conjunction',
          'Enhanced professional networking energy',
          'Optimal timing for career advancement'
        ];
      default:
        return [];
    }
  };

  const avatarDetails = getAvatarDetails();
  const mainBulletPoints = getMainBulletPoints();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <ProgressIndicator currentStep={4} totalSteps={4} />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100 mb-6">
          {/* Avatar and Header */}
          <div className="text-center mb-8">
            <div className={`w-24 h-24 rounded-full ${avatarDetails.color} flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg`}>
              {avatarDetails.symbol}
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Your Cosmic Insights
            </h2>
            <p className="text-slate-600 text-lg">
              Based on your birth chart, here are the perfect cities for your {userData.influence} journey
            </p>
          </div>

          {/* City Recommendations */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center justify-center">
                <MapPin className="w-6 h-6 mr-2 text-purple-400" />
                Top 3 Recommended Cities
              </h3>
              
              {/* Three bullet points - centered */}
              <div className="max-w-2xl mx-auto space-y-2">
                {mainBulletPoints.map((point, index) => (
                  <div key={index} className="flex items-start justify-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-slate-700 text-left">{point}</p>
                  </div>
                ))}
              </div>
            </div>

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
                    <Users className="w-4 h-4 mr-1" />
                    <span>{city.population} • {city.distance} away</span>
                  </div>
                  
                  {/* Astrological Reasons */}
                  <div className="space-y-2 mb-6">
                    {city.reasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-slate-700 text-sm">{reason}</p>
                      </div>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="border-t border-slate-200 pt-4 space-y-3">
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-300 to-indigo-300 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Job Opportunities
                    </button>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-green-300 to-emerald-300 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Networking Events
                    </button>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-300 to-violet-300 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                      <Building className="w-4 h-4 mr-2" />
                      Conferences
                    </button>
                  </div>
                </div>
              ))}
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