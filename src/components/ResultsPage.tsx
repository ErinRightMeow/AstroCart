import React from 'react';
import { MapPin, Users, Star, ExternalLink, Share2, ArrowLeft } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';
import { UserData, CityRecommendation, ActionableInsight } from '../types';

interface ResultsPageProps {
  userData: UserData;
  onBack: () => void;
  onStartOver: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ userData, onBack, onStartOver }) => {
  // Mock data for demonstration - in production, this would come from Swiss Ephemeris calculations
  const getCityRecommendations = (): CityRecommendation[] => {
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

    return baseCities.map(city => ({
      ...city,
      reasons: reasonsByInfluence[userData.influence!]
    }));
  };

  const getActionableInsights = (): ActionableInsight[] => {
    const insightsByInfluence = {
      love: [
        {
          title: 'Local Dating Events',
          description: 'Join speed dating and singles mixers in your recommended city',
          link: 'https://www.meetup.com',
          platform: 'Meetup'
        },
        {
          title: 'Relationship Coaching',
          description: 'Connect with certified relationship coaches in the area',
          link: 'https://www.psychology.com',
          platform: 'Psychology Today'
        },
        {
          title: 'Social Activities',
          description: 'Explore hobby groups and social clubs for meaningful connections',
          link: 'https://www.eventbrite.com',
          platform: 'Eventbrite'
        }
      ],
      career: [
        {
          title: 'Job Opportunities',
          description: 'Browse open positions in your field in the recommended cities',
          link: 'https://www.linkedin.com',
          platform: 'LinkedIn'
        },
        {
          title: 'Networking Events',
          description: 'Attend professional meetups and industry conferences',
          link: 'https://www.meetup.com',
          platform: 'Meetup'
        },
        {
          title: 'Career Development',
          description: 'Find mentors and career coaches in your target location',
          link: 'https://www.score.org',
          platform: 'SCORE'
        }
      ],
      wealth: [
        {
          title: 'Financial Advisors',
          description: 'Connect with certified financial planners in your area',
          link: 'https://www.cfp.net',
          platform: 'CFP Board'
        },
        {
          title: 'Investment Opportunities',
          description: 'Explore local real estate and investment options',
          link: 'https://www.biggerpockets.com',
          platform: 'BiggerPockets'
        },
        {
          title: 'Business Networking',
          description: 'Join entrepreneur groups and business chambers',
          link: 'https://www.chamber.com',
          platform: 'Chamber of Commerce'
        }
      ]
    };

    return insightsByInfluence[userData.influence!];
  };

  const cities = getCityRecommendations();
  const insights = getActionableInsights();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4">
      <div className="max-w-6xl mx-auto">
        <ProgressIndicator currentStep={4} totalSteps={4} />
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl mb-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Your Cosmic Insights
            </h2>
            <p className="text-indigo-200 text-lg">
              Based on your birth chart, here are the perfect cities for your {userData.influence} journey
            </p>
          </div>

          {/* City Recommendations */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-yellow-400" />
              Top 3 Recommended Cities
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {cities.map((city, index) => (
                <div key={city.name} className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-white">{city.name}</h4>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-5 h-5 mr-1 fill-current" />
                      <span className="text-sm font-medium">#{index + 1}</span>
                    </div>
                  </div>
                  <p className="text-indigo-200 mb-2">{city.country}</p>
                  <div className="flex items-center text-indigo-300 text-sm mb-4">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{city.population} • {city.distance} away</span>
                  </div>
                  <div className="space-y-2">
                    {city.reasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-white text-sm">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Insights */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Recommended Actions
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <div key={index} className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-all duration-300">
                  <h4 className="text-lg font-bold text-white mb-3">{insight.title}</h4>
                  <p className="text-indigo-200 mb-4">{insight.description}</p>
                  <a
                    href={insight.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200"
                  >
                    Visit {insight.platform}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleShare}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-200"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Results
            </button>
            <button
              onClick={onStartOver}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-200"
            >
              Start New Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};