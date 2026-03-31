















import { API_KEY, API_BASE_URL, API_ROUTES, MAX_SEARCH_RESULTS } from '../utils/constants';


const apiFetch = async (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  
  
  
  
  url.searchParams.append('appid', API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('API rate limit exceeded. Please wait a moment and try again.');
    }
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your API key in constants.js or .env file.');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};






export const fetchCurrentWeather = async (lat, lon) => {
  return apiFetch(API_ROUTES.CURRENT_WEATHER, { lat, lon });
};


export const fetchForecast = async (lat, lon) => {
  return apiFetch(API_ROUTES.FORECAST, { lat, lon });
};






export const searchCities = async (query) => {
  if (!query || query.trim().length < 2) return [];
  return apiFetch(API_ROUTES.GEO_DIRECT, {
    q: query.trim(),
    limit: MAX_SEARCH_RESULTS,
  });
};


export const reverseGeocode = async (lat, lon) => {
  return apiFetch(API_ROUTES.GEO_REVERSE, { lat, lon, limit: 1 });
};


export const fetchCityWeatherData = async (lat, lon) => {
  const [current, forecast] = await Promise.all([
    fetchCurrentWeather(lat, lon),
    fetchForecast(lat, lon),
  ]);
  return { current, forecast };
};
