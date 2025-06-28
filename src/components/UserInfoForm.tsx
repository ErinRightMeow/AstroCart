import React, { useState } from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';

interface UserInfoFormProps {
  onNext: (data: {
    birthDate: string;
    birthTime: string;
    birthLocation: string;
    currentLocation: string;
  }) => void;
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.birthTime) newErrors.birthTime = 'Birth time is required';
    if (!formData.birthLocation) newErrors.birthLocation = 'Birth location is required';
    if (!formData.currentLocation) newErrors.currentLocation = 'Current location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <ProgressIndicator currentStep={1} totalSteps={4} />
        
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
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-200"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};