import React, { useState } from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';

interface UserInfoFormProps {
  onNext: (resultId: string) => void;
  onBack: () => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    currentLocation: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.birthTime) newErrors.birthTime = 'Birth time is required';
    if (!formData.birthLocation) newErrors.birthLocation = 'Birth location is required';
    if (!formData.currentLocation) newErrors.currentLocation = 'Current location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({}); // Clear previous API errors

    // --- Step 1: Geocode Birth Location ---
    let birthCoords;
    try {
      const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
      if (!accessToken) {
        throw new Error("Mapbox access token is not configured. Please contact support.");
      }
      
      const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(formData.birthLocation)}.json?access_token=${accessToken}&limit=1`;
      const geoResponse = await fetch(geocodingUrl);
      const geoData = await geoResponse.json();

      if (!geoResponse.ok || !geoData.features || geoData.features.length === 0) {
        throw new Error("Could not find this location. Please try a different address.");
      }
      
      const [lon, lat] = geoData.features[0].center;
      birthCoords = { lat, lon };

    } catch (error: any) {
      console.error('Geocoding failed:', error);
      setErrors({ birthLocation: error.message || 'Invalid location. Please check the address.' });
      setIsLoading(false);
      return;
    }
    
    // The planets are fixed to Venus, Mars, and Jupiter to align with the app's core influences.
    const planetsForApi = ["Venus", "Mars", "Jupiter"];

    const apiRequestBody = {
      birth_dt: `${formData.birthDate}T${formData.birthTime}:00`,
      birth_lat: birthCoords.lat,
      birth_lon: birthCoords.lon,
      planets: planetsForApi,
      orb_tolerance: 2.0 // Using default from API
    };

    try {
      // In a production app, this URL should come from an environment variable
      const response = await fetch('http://127.0.0.1:8000/astrocartography', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle HTTP errors from the API (e.g., 400, 500)
        const errorMessage = data.detail || 'An unknown server error occurred.';
        setErrors({ api: errorMessage });
        return;
      }

      // On success, the API returns a result_id. Pass it to the next step.
      onNext(data.result_id);

    } catch (error) {
      console.error('API call failed:', error);
      setErrors({ api: 'Failed to connect to the server. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <ProgressIndicator currentStep={1} totalSteps={3} />
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Tell Us About Yourself
          </h2>
          <p className="text-indigo-200 text-center mb-8">
            We need your birth details to create your personalized cosmic profile
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Birth Date */}
            <div>
              <label className="flex items-center text-white font-medium mb-2">
                <Calendar className="w-5 h-5 mr-2 text-indigo-300" />
                Birth Date
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
              {errors.birthDate && <p className="text-red-400 text-sm mt-1">{errors.birthDate}</p>}
            </div>

            {/* Birth Time */}
            <div>
              <label className="flex items-center text-white font-medium mb-2">
                <Clock className="w-5 h-5 mr-2 text-indigo-300" />
                Birth Time
              </label>
              <input
                type="time"
                value={formData.birthTime}
                onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
              {errors.birthTime && <p className="text-red-400 text-sm mt-1">{errors.birthTime}</p>}
            </div>

            {/* Birth Location */}
            <div>
              <label className="flex items-center text-white font-medium mb-2">
                <MapPin className="w-5 h-5 mr-2 text-indigo-300" />
                Birth Location
              </label>
              <input
                type="text"
                placeholder="e.g., New York, NY, USA"
                value={formData.birthLocation}
                onChange={(e) => setFormData({...formData, birthLocation: e.target.value})}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
              {errors.birthLocation && <p className="text-red-400 text-sm mt-1">{errors.birthLocation}</p>}
            </div>

            {/* Current Location */}
            <div>
              <label className="flex items-center text-white font-medium mb-2">
                <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                Current Location
              </label>
              <input
                type="text"
                placeholder="e.g., Los Angeles, CA, USA"
                value={formData.currentLocation}
                onChange={(e) => setFormData({...formData, currentLocation: e.target.value})}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
              {errors.currentLocation && <p className="text-red-400 text-sm mt-1">{errors.currentLocation}</p>}
            </div>

            {errors.api && (
              <div className="text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{errors.api}</div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-6 py-3 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Calculating...' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};