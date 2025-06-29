import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Star, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { UserData } from '../types';

interface SavedReadingsProps {
  onBack: () => void;
  onLoadReading: (userData: UserData) => void;
}

interface SavedReading {
  id: string;
  birth_date: string;
  birth_time: string;
  birth_location: string;
  current_location: string;
  avatar: string;
  influence: 'love' | 'career' | 'wealth';
  created_at: string;
}

export const SavedReadings: React.FC<SavedReadingsProps> = ({ onBack, onLoadReading }) => {
  const [readings, setReadings] = useState<SavedReading[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchReadings();
    }
  }, [user]);

  const fetchReadings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('readings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReadings(data || []);
    } catch (error) {
      console.error('Error fetching readings:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReading = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reading?')) return;

    try {
      const { error } = await supabase
        .from('readings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setReadings(readings.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting reading:', error);
    }
  };

  const loadReading = (reading: SavedReading) => {
    const userData: UserData = {
      birthDate: reading.birth_date,
      birthTime: reading.birth_time,
      birthLocation: reading.birth_location,
      currentLocation: reading.current_location,
      avatar: reading.avatar,
      influence: reading.influence
    };
    onLoadReading(userData);
  };

  const getAvatarDetails = (avatar: string) => {
    const avatars = {
      apollo: { color: 'bg-gradient-to-br from-yellow-300 to-orange-300', symbol: '☀️' },
      athena: { color: 'bg-gradient-to-br from-blue-300 to-indigo-300', symbol: '🦉' },
      venus: { color: 'bg-gradient-to-br from-pink-300 to-rose-300', symbol: '💕' },
      mercury: { color: 'bg-gradient-to-br from-purple-300 to-violet-300', symbol: '⚡' },
      diana: { color: 'bg-gradient-to-br from-green-300 to-emerald-300', symbol: '🏹' }
    };
    return avatars[avatar as keyof typeof avatars] || avatars.apollo;
  };

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'love': return 'text-pink-600 bg-pink-50';
      case 'career': return 'text-blue-600 bg-blue-50';
      case 'wealth': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-purple-600 bg-purple-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your readings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-4"
            >
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h2 className="text-3xl font-bold text-slate-800">My Readings</h2>
          </div>

          {readings.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No readings yet</h3>
              <p className="text-slate-500">Create your first cosmic reading to see it here!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {readings.map((reading) => {
                const avatarDetails = getAvatarDetails(reading.avatar);
                return (
                  <div key={reading.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full ${avatarDetails.color} flex items-center justify-center text-xl mr-3`}>
                          {avatarDetails.symbol}
                        </div>
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getInfluenceColor(reading.influence)}`}>
                            {reading.influence.charAt(0).toUpperCase() + reading.influence.slice(1)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteReading(reading.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-slate-600 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(reading.birth_date).toLocaleDateString()} at {reading.birth_time}
                      </div>
                      <div className="flex items-center text-slate-600 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {reading.birth_location}
                      </div>
                      <div className="text-slate-500 text-xs">
                        Created {new Date(reading.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <button
                      onClick={() => loadReading(reading)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-blue-400 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      View Reading
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};