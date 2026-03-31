import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCityWeatherData } from '../services/weatherApi';
import { getCityId } from '../utils/helpers';




export const fetchCityWeather = createAsyncThunk(
  'weather/fetchCityWeather',
  async ({ lat, lon, name, country }, { rejectWithValue }) => {
    try {
      const data = await fetchCityWeatherData(lat, lon);
      return {
        cityId: getCityId(lat, lon),
        name,
        country,
        lat,
        lon,
        current: data.current,
        forecast: data.forecast,
        lastUpdated: Date.now(),
      };
    } catch (error) {
      return rejectWithValue({
        cityId: getCityId(lat, lon),
        error: error.message,
      });
    }
  }
);


export const refreshAllCities = createAsyncThunk(
  'weather/refreshAllCities',
  async (_, { getState, dispatch }) => {
    const { favorites } = getState().favorites;
    const promises = favorites.map((city) =>
      dispatch(
        fetchCityWeather({
          lat: city.lat,
          lon: city.lon,
          name: city.name,
          country: city.country,
        })
      )
    );
    await Promise.allSettled(promises);
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    cities: {},       
    loading: {},      
    errors: {},       
    globalLoading: false,
    globalError: null,
  },
  reducers: {
    clearCityData: (state, action) => {
      const cityId = action.payload;
      delete state.cities[cityId];
      delete state.loading[cityId];
      delete state.errors[cityId];
    },
    clearAllErrors: (state) => {
      state.errors = {};
      state.globalError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchCityWeather.pending, (state, action) => {
        const cityId = getCityId(action.meta.arg.lat, action.meta.arg.lon);
        state.loading[cityId] = true;
        state.errors[cityId] = null;
      })
      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        const { cityId, ...data } = action.payload;
        state.cities[cityId] = data;
        state.loading[cityId] = false;
        state.errors[cityId] = null;
      })
      .addCase(fetchCityWeather.rejected, (state, action) => {
        const { cityId, error } = action.payload || {};
        if (cityId) {
          state.loading[cityId] = false;
          state.errors[cityId] = error || 'Failed to fetch weather data';
        }
      })
      
      .addCase(refreshAllCities.pending, (state) => {
        state.globalLoading = true;
      })
      .addCase(refreshAllCities.fulfilled, (state) => {
        state.globalLoading = false;
      })
      .addCase(refreshAllCities.rejected, (state, action) => {
        state.globalLoading = false;
        state.globalError = action.error.message;
      });
  },
});

export const { clearCityData, clearAllErrors } = weatherSlice.actions;
export default weatherSlice.reducer;
