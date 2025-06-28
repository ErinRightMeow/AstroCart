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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <ProgressIndicator currentStep={1} totalSteps={4} />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Tell Us About Yourself
          </h2>
          <p className="text-slate-600 text-center mb-8">
            We need your birth details to create your personalized cosmic profile
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Birth Date */}
            <div>
              <label className="flex items-center text-slate-700 font-medium mb-2">
                <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                Birth Date
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200"
              />
              {errors.birthDate && <p className="text-red-400 text-sm mt-1">{errors.birthDate}</p>}
            </div>

            {/* Birth Time */}
            <div>
              <label className="flex items-center text-slate-700 font-medium mb-2">
                <Clock className="w-5 h-5 mr-2 text-purple-400" />
                Birth Time
              </label>
              <input
                type="time"
                value={formData.birthTime}
                onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200"
              />
              {errors.birthTime && <p className="text-red-400 text-sm mt-1">{errors.birthTime}</p>}
            </div>

            {/* Birth Location */}
            <div>
              <label className="flex items-center text-slate-700 font-medium mb-2">
                <MapPin className="w-5 h-5 mr-2 text-purple-400" />
                Birth Location
              </label>
              <input
                type="text"
                placeholder="e.g., New York, NY, USA"
                value={formData.birthLocation}
                onChange={(e) => setFormData({...formData, birthLocation: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200"
              />
              {errors.birthLocation && <p className="text-red-400 text-sm mt-1">{errors.birthLocation}</p>}
            </div>

            {/* Current Location */}
            <div>
              <label className="flex items-center text-slate-700 font-medium mb-2">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                Current Location
              </label>
              <input
                type="text"
                placeholder="e.g., Los Angeles, CA, USA"
                value={formData.currentLocation}
                onChange={(e) => setFormData({...formData, currentLocation: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200"
              />
              {errors.currentLocation && <p className="text-red-400 text-sm mt-1">{errors.currentLocation}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-300 transition-all duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-400 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-200 transform hover:scale-105 transition-all duration-200"
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