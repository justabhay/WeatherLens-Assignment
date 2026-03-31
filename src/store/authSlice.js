import { createSlice } from '@reduxjs/toolkit';


const loadAuth = () => {
  try {
    const stored = localStorage.getItem('weather_auth');
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Failed to load auth from localStorage:', e);
  }
  return { user: null, isAuthenticated: false };
};

const saveAuth = (auth) => {
  try {
    localStorage.setItem('weather_auth', JSON.stringify(auth));
  } catch (e) {
    console.warn('Failed to save auth to localStorage:', e);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuth(),
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveAuth(state);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('weather_auth');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
