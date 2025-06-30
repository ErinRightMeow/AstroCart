import React, { useState, useEffect } from 'react';
import { MapPin, Users, Star, Share2, ArrowRight, ArrowLeft } from 'lucide-react';
import { UserData, ApiCityData, ApiResults } from '../types';

interface ResultsPageProps {
  userData: UserData;
  onBack: () => void;
  onStartOver: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ userData, onBack, onStartOver }) => {
  const [cities, setCities] = useState<ApiCityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      // Reset states on new fetch
      setIsLoading(true);
      setError(null);

      if (!userData.resultId || !userData.selectedPlanet) {
        setError("Could not load results. Please go back and try again.");
        setIsLoading(false);
        return;
      }

      try {
        // Fetch the results from the API using the resultId
        const response = await fetch(`http://127.0.0.1:8000/results/${userData.resultId}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ detail: 'An unknown error occurred.' }));
          throw new Error(errorData.detail || `Server responded with status ${response.status}`);
        }
        
        const allResults: ApiResults = await response.json();
        const relevantCities = allResults[userData.selectedPlanet];

        if (relevantCities && relevantCities.length > 0) {
          setCities(relevantCities.slice(0, 3));
        } else {
          setError(`No cities found with a strong ${userData.selectedPlanet} influence. Try another focus.`);
        }
      } catch (e: any) {
        console.error("Failed to fetch results:", e);
        setError(e.message || "An unexpected error occurred while fetching your results.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [userData.resultId, userData.selectedPlanet]);

  const handleShare = () => {
    const shareText = `I just discovered my perfect cities for ${userData.influence} using AstroCart! ✨`;
    if (navigator.share) {
      navigator.share({
        title: 'My AstroCart Results',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('Link to results copied to clipboard!');
    }
  };

  // This static data can be used to enrich the UI for each city
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
  const nextStep = nextStepsByInfluence[userData.influence!] || nextStepsByInfluence.career;

  const getInfluenceColor = () => {
    switch (userData.influence) {
      case 'love': return 'from-pink-500 to-rose-500';
      case 'career': return 'from-blue-500 to-indigo-500';
      case 'wealth': return 'from-yellow-500 to-orange-500';
      default: return 'from-indigo-500 to-purple-500';
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-white text-xl">Generating Your Cosmic Insights...</div>;
    }

    if (error) {
      return <div className="text-center text-red-400 bg-red-900/50 p-6 rounded-lg">{error}</div>;
    }

    if (cities.length === 0) {
      return (
        <div className="text-center text-yellow-300 bg-yellow-900/50 p-6 rounded-lg">
          {`No cities found with a strong ${userData.selectedPlanet} influence. Try another focus.`}
        </div>
      );
    }

    return (
      <>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Your Cosmic Insights
            </h2>
            <p className="text-indigo-200 text-lg">
              Based on your birth chart, here are the perfect cities for your {userData.influence} journey
            </p>
          </div>

          {/* City Recommendations */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-yellow-400" />
              Top 3 Recommended Cities
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {cities.map((city, index) => (
                <div key={city.city} className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-white">{city.city}</h4>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-5 h-5 mr-1 fill-current" />
                      <span className="text-sm font-medium">#{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-indigo-300 text-sm mb-4">
                    <Users className="w-4 h-4 mr-1" />
                    <span>
                      {(city.population ?? 0).toLocaleString()} pop. • {Math.round(city.distance_km ?? 0).toLocaleString()} km away
                    </span>
                  </div>
                  
                  {/* Astrological Reason */}
                  <div className="flex items-start mb-6">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-white text-sm">
                      Strong planetary influence with an orb of only <strong>{city.orb.toFixed(2)}°</strong>.
                    </p>
                  </div>

                  {/* Next Step */}
                  <div className="border-t border-white/20 pt-4">
                    <h5 className="text-white font-semibold mb-2">{nextStep.title}</h5>
                    <p className="text-indigo-200 text-sm mb-3">{nextStep.description}</p>
                    <button className={`w-full px-4 py-2 bg-gradient-to-r ${getInfluenceColor()} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center`}>
                      {nextStep.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl mb-6">
          {renderContent()}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBack}
              className="flex items-center justify-center px-6 py-3 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Change Focus
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-200"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share My Results
            </button>
            <button
              onClick={onStartOver}
              className="flex items-center justify-center px-6 py-3 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-200"
            >
              Start New Journey
            </button>
        </div>
      </div>
    </div>
  );
};