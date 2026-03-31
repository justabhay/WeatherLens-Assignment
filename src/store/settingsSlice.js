import { createSlice } from '@reduxjs/toolkit';


const loadSettings = () => {
  try {
    const stored = localStorage.getItem('weather_settings');
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Failed to load settings from localStorage:', e);
  }
  return { unit: 'celsius' };
};

const saveSettings = (settings) => {
  try {
    localStorage.setItem('weather_settings', JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save settings to localStorage:', e);
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: loadSettings(),
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'celsius' ? 'fahrenheit' : 'celsius';
      saveSettings(state);
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
      saveSettings(state);
    },
  },
});

export const { toggleUnit, setUnit } = settingsSlice.actions;
export default settingsSlice.reducer;
