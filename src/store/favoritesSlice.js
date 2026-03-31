import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITIES, MAX_FAVORITES } from '../utils/constants';
import { getCityId } from '../utils/helpers';


const loadFavorites = () => {
  try {
    const stored = localStorage.getItem('weather_favorites_v2');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load favorites from localStorage:', e);
  }
  
  return DEFAULT_CITIES;
};

const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('weather_favorites_v2', JSON.stringify(favorites));
  } catch (e) {
    console.warn('Failed to save favorites to localStorage:', e);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      const city = action.payload;
      const cityId = getCityId(city.lat, city.lon);
      const exists = state.favorites.some(
        (f) => getCityId(f.lat, f.lon) === cityId
      );
      if (!exists && state.favorites.length < MAX_FAVORITES) {
        state.favorites.push({
          id: cityId,
          name: city.name,
          country: city.country,
          lat: city.lat,
          lon: city.lon,
        });
        saveFavorites(state.favorites);
      }
    },
    removeFavorite: (state, action) => {
      const cityId = action.payload;
      state.favorites = state.favorites.filter(
        (f) => getCityId(f.lat, f.lon) !== cityId
      );
      saveFavorites(state.favorites);
    },
    reorderFavorites: (state, action) => {
      state.favorites = action.payload;
      saveFavorites(state.favorites);
    },
  },
});

export const { addFavorite, removeFavorite, reorderFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
