import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCityWeather } from '../../store/weatherSlice';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import { FiStar } from 'react-icons/fi';
import {
  convertTemp, tempUnit, getWeatherIconUrl, capitalize,
  formatTime, getWindDirection, convertWindSpeed, windSpeedUnit,
  formatVisibility, calculateDewPoint, getCityId, timeAgo,
} from '../../utils/helpers';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import WeatherStats from './WeatherStats';
import TemperatureChart from '../Charts/TemperatureChart';
import PrecipitationChart from '../Charts/PrecipitationChart';
import WindChart from '../Charts/WindChart';
import './DetailView.css';

const DetailView = () => {
  const { lat, lon } = useParams();
  const dispatch = useDispatch();
  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);
  const cityId = getCityId(latNum, lonNum);

  const weatherData = useSelector((state) => state.weather.cities[cityId]);
  const isLoading = useSelector((state) => state.weather.loading[cityId]);
  const error = useSelector((state) => state.weather.errors[cityId]);
  const { unit } = useSelector((state) => state.settings);
  const { favorites } = useSelector((state) => state.favorites);

  
  useEffect(() => {
    if (!weatherData) {
      dispatch(fetchCityWeather({
        lat: latNum,
        lon: lonNum,
        name: '',
        country: '',
      }));
    }
  }, [dispatch, latNum, lonNum, weatherData]);

  if (isLoading && !weatherData) {
    return (
      <div className="detail-view__loading">
        <div className="spinner" />
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error && !weatherData) {
    return (
      <div className="detail-view__error">
        <h3>Failed to load weather data</h3>
        <p>{error}</p>
        <button
          className="btn-primary"
          onClick={() => dispatch(fetchCityWeather({ lat: latNum, lon: lonNum, name: '', country: '' }))}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!weatherData) return null;

  const { current, forecast } = weatherData;
  const cityName = weatherData.name || current.name;
  const country = weatherData.country || current.sys?.country || '';
  
  const isFavorite = favorites.some((f) => getCityId(f.lat, f.lon) === cityId);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(cityId));
    } else {
      dispatch(addFavorite({
        name: cityName,
        country: country,
        lat: latNum,
        lon: lonNum,
      }));
    }
  };

  const temp = convertTemp(current.main.temp, unit);
  const feelsLike = convertTemp(current.main.feels_like, unit);
  const tempMin = convertTemp(current.main.temp_min, unit);
  const tempMax = convertTemp(current.main.temp_max, unit);
  const condition = capitalize(current.weather[0].description);
  const iconUrl = getWeatherIconUrl(current.weather[0].icon, '4x');
  const humidity = current.main.humidity;
  const pressure = current.main.pressure;
  const visibility = current.visibility;
  const windSpeed = convertWindSpeed(current.wind.speed, unit);
  const windGust = current.wind.gust ? convertWindSpeed(current.wind.gust, unit) : null;
  const windDir = getWindDirection(current.wind.deg || 0);
  const sunrise = formatTime(current.sys.sunrise, current.timezone);
  const sunset = formatTime(current.sys.sunset, current.timezone);
  const dewPoint = calculateDewPoint(current.main.temp, humidity);
  const dewPointConverted = unit === 'fahrenheit'
    ? Math.round(dewPoint * 9 / 5 + 32)
    : Math.round(dewPoint);
  const lastUpdatedText = weatherData.lastUpdated ? timeAgo(weatherData.lastUpdated) : '';

  const forecastList = forecast?.list || [];

  return (
    <div className="detail-view" id="detail-view-page">
      {}
      <section className="detail-view__hero glass-card animate-fade-in-up">
        <div className="detail-view__hero-left">
          <div className="detail-view__location">
            <h2 className="detail-view__city-name">{cityName}</h2>
            {country && <span className="detail-view__country">{country}</span>}
            <button
              className={`detail-view__fav-btn ${isFavorite ? 'detail-view__fav-btn--active' : ''}`}
              onClick={handleToggleFavorite}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <FiStar size={24} />
            </button>
          </div>
          <div className="detail-view__current">
            <span className="detail-view__temp">{temp}°</span>
            <span className="detail-view__temp-unit">{tempUnit(unit)}</span>
          </div>
          <p className="detail-view__condition">{condition}</p>
          <div className="detail-view__temp-range">
            <span>H: {tempMax}°</span>
            <span>L: {tempMin}°</span>
            <span>Feels like {feelsLike}°</span>
          </div>
          {lastUpdatedText && (
            <span className="detail-view__updated">
              Updated {lastUpdatedText}
              {isLoading && ' · Refreshing...'}
            </span>
          )}
        </div>
        <div className="detail-view__hero-right">
          <img
            src={iconUrl}
            alt={condition}
            className="detail-view__hero-icon float-animation"
          />
        </div>
      </section>

      {}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <h3 className="detail-view__section-title">Hourly Forecast</h3>
        <HourlyForecast
          forecastList={forecastList}
          unit={unit}
          timezone={current.timezone}
        />
      </section>

      {}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
        <h3 className="detail-view__section-title">5-Day Forecast</h3>
        <DailyForecast forecastList={forecastList} unit={unit} />
      </section>

      {}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h3 className="detail-view__section-title">Weather Details</h3>
        <WeatherStats
          humidity={humidity}
          pressure={pressure}
          visibility={visibility}
          windSpeed={windSpeed}
          windGust={windGust}
          windDir={windDir}
          windUnit={windSpeedUnit(unit)}
          feelsLike={feelsLike}
          tempUnit={tempUnit(unit)}
          dewPoint={dewPointConverted}
          sunrise={sunrise}
          sunset={sunset}
        />
      </section>

      {}
      <section className="detail-view__charts animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
        <h3 className="detail-view__section-title">Temperature Trends</h3>
        <div className="detail-view__chart-card glass-card">
          <TemperatureChart forecastList={forecastList} unit={unit} timezone={current.timezone} />
        </div>

        <h3 className="detail-view__section-title">Precipitation</h3>
        <div className="detail-view__chart-card glass-card">
          <PrecipitationChart forecastList={forecastList} timezone={current.timezone} />
        </div>

        <h3 className="detail-view__section-title">Wind Speed & Gusts</h3>
        <div className="detail-view__chart-card glass-card">
          <WindChart forecastList={forecastList} unit={unit} timezone={current.timezone} />
        </div>
      </section>
    </div>
  );
};

export default DetailView;
