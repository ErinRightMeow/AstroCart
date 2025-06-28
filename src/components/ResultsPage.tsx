import React from 'react';
import { MapPin, Users, Star, Share2, ArrowRight, ArrowLeft } from 'lucide-react';
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
      { name: 'Austin', country: 'USA', distance: '1,200 miles', population: '978,908' },
      { name: 'Barcelona', country: 'Spain', distance: '5,500 miles', population: '1.6M' },
      { name: 'Vancouver', country: 'Canada', distance: '2,400 miles', population: '675,218' }
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
        'Jupiter line activation for abundance',
        'Solar return chart shows financial growth',
        'Favorable Venus-Pluto aspects for investments'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <ProgressIndicator currentStep={4} totalSteps={4} />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100 mb-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Your Cosmic Insights
            </h2>
            <p className="text-slate-600 text-lg">
              Based on your birth chart, here are the perfect cities for your {userData.influence} journey
            </p>
          </div>

          {/* City Recommendations */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-purple-400" />
              Top 3 Recommended Cities
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

                  {/* Next Step */}
                  <div className="border-t border-slate-200 pt-4">
                    <h5 className="text-slate-800 font-semibold mb-2">{city.nextStep.title}</h5>
                    <p className="text-slate-600 text-sm mb-3">{city.nextStep.description}</p>
                    <button className={`w-full px-4 py-2 bg-gradient-to-r ${getInfluenceColor()} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center`}>
                      {city.nextStep.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
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