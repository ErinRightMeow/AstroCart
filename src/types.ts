export interface UserData {
  resultId: string;
  avatar: string;
  influence: 'love' | 'career' | 'wealth' | null;
  selectedPlanet: string | null;
}

// Represents a single city object from the backend API
export interface ApiCityData {
  city: string;
  country:string;
  latitude: number;
  longitude: number;
  population: number;
  distance_km: number;
  orb: number;
}

// Represents the entire JSON file structure for a result,
// mapping planet names to a list of city data.
export interface ApiResults {
  [planetName: string]: ApiCityData[];
}