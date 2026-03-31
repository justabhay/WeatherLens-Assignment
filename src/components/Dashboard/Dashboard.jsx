import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCityWeather, refreshAllCities } from '../../store/weatherSlice';
import { REFRESH_INTERVAL_MS } from '../../utils/constants';
import CityCard from './CityCard';
import { WiDaySunny } from 'react-icons/wi';
import { FiPlus } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  const { cities, loading, errors } = useSelector((state) => state.weather);
  const refreshTimerRef = useRef(null);

  
  useEffect(() => {
    favorites.forEach((city) => {
      dispatch(fetchCityWeather({
        lat: city.lat,
        lon: city.lon,
        name: city.name,
        country: city.country,
      }));
    });
  }, []); 

  
  useEffect(() => {
    refreshTimerRef.current = setInterval(() => {
      dispatch(refreshAllCities());
    }, REFRESH_INTERVAL_MS);

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [dispatch]);

  
  useEffect(() => {
    favorites.forEach((city) => {
      const cityId = `${city.lat.toFixed(2)}_${city.lon.toFixed(2)}`;
      if (!cities[cityId]) {
        dispatch(fetchCityWeather({
          lat: city.lat,
          lon: city.lon,
          name: city.name,
          country: city.country,
        }));
      }
    });
  }, [favorites, cities, dispatch]);

  return (
    <div className="dashboard" id="dashboard-page">
      {}
      <div className="dashboard__header animate-fade-in">
        <div className="dashboard__title-group">
          <h2 className="dashboard__title">Dashboard</h2>
          <p className="dashboard__subtitle">
            Monitoring {favorites.length} {favorites.length === 1 ? 'city' : 'cities'} · Real-time updates every 60s
          </p>
        </div>
      </div>

      {}
      {favorites.length > 0 ? (
        <div className="dashboard__grid">
          {favorites.map((city, index) => {
            const cityId = `${city.lat.toFixed(2)}_${city.lon.toFixed(2)}`;
            const weatherData = cities[cityId];
            const isLoading = loading[cityId];
            const cityError = errors[cityId];

            return (
              <CityCard
                key={cityId}
                city={city}
                weatherData={weatherData}
                isLoading={isLoading}
                error={cityError}
                index={index}
              />
            );
          })}

          {}
          <div
            className="dashboard__add-card"
            onClick={() => document.getElementById('search-input')?.focus()}
            id="add-city-card"
          >
            <FiPlus size={32} />
            <span>Add City</span>
            <span className="dashboard__add-hint">Use the search bar above</span>
          </div>
        </div>
      ) : (
        <div className="dashboard__empty animate-fade-in-up">
          <div className="dashboard__empty-icon float-animation">
            <WiDaySunny size={80} />
          </div>
          <h3>No cities yet</h3>
          <p>Search for a city above to get started with your weather dashboard.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
