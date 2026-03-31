












export const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'YOUR_API_KEY_HERE';

// project constants used across the app















export const API_BASE_URL = 'https://api.openweathermap.org';

export const API_ROUTES = {
  
  
  
  CURRENT_WEATHER: '/data/2.5/weather',

  
  
  
  FORECAST: '/data/2.5/forecast',

  
  
  
  GEO_DIRECT: '/geo/1.0/direct',

  
  
  
  GEO_REVERSE: '/geo/1.0/reverse',

  
  
  
  ICON_URL: 'https://openweathermap.org/img/wn',
};




export const DEFAULT_CITIES = [];




export const REFRESH_INTERVAL_MS = 60 * 1000; 
export const SEARCH_DEBOUNCE_MS = 400;
export const MAX_SEARCH_RESULTS = 5;
export const MAX_FAVORITES = 12;




export const WEATHER_BACKGROUNDS = {
  Clear: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
  Clouds: 'linear-gradient(135deg, #0f172a 0%, #334155 50%, #0f172a 100%)',
  Rain: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
  Drizzle: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
  Thunderstorm: 'linear-gradient(135deg, #0f172a 0%, #1a1a2e 50%, #0f172a 100%)',
  Snow: 'linear-gradient(135deg, #0f172a 0%, #2d3748 50%, #0f172a 100%)',
  Mist: 'linear-gradient(135deg, #0f172a 0%, #374151 50%, #0f172a 100%)',
  Haze: 'linear-gradient(135deg, #0f172a 0%, #374151 50%, #0f172a 100%)',
  Fog: 'linear-gradient(135deg, #0f172a 0%, #374151 50%, #0f172a 100%)',
  Smoke: 'linear-gradient(135deg, #0f172a 0%, #374151 50%, #0f172a 100%)',
  Dust: 'linear-gradient(135deg, #0f172a 0%, #44403c 50%, #0f172a 100%)',
};

export const CONDITION_COLORS = {
  Clear: '#f59e0b',
  Clouds: '#94a3b8',
  Rain: '#6366f1',
  Drizzle: '#818cf8',
  Thunderstorm: '#a855f7',
  Snow: '#e2e8f0',
  Mist: '#9ca3af',
  Haze: '#9ca3af',
  Fog: '#9ca3af',
};
