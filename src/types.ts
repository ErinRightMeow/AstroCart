export interface UserData {
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  currentLocation: string;
  avatar: string;
  influence: 'love' | 'career' | 'wealth' | null;
}

export interface CityRecommendation {
  name: string;
  country: string;
  distance: string;
  population: string;
  reasons: string[];
}

export interface ActionableInsight {
  title: string;
  description: string;
  link: string;
  platform: string;
}

export interface SavedReading {
  id: string;
  user_id: string;
  birth_date: string;
  birth_time: string;
  birth_location: string;
  current_location: string;
  avatar: string;
  influence: 'love' | 'career' | 'wealth';
  created_at: string;
  updated_at: string;
}