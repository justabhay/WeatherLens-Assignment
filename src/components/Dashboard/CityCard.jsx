import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../../store/favoritesSlice';
import { clearCityData, fetchCityWeather } from '../../store/weatherSlice';
import {
  convertTemp, tempUnit, convertWindSpeed, windSpeedUnit,
  getWeatherIconUrl, timeAgo, capitalize, getCityId,
} from '../../utils/helpers';
import { FiStar, FiDroplet, FiWind, FiEye } from 'react-icons/fi';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import './CityCard.css';

const CityCard = ({ city, weatherData, isLoading, index, error }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { unit } = useSelector((state) => state.settings);
  const cityId = getCityId(city.lat, city.lon);

  const handleClick = () => {
    navigate(`/city/${city.lat}/${city.lon}`);
  };

  const handleRemoveFavorite = (e) => {
    e.stopPropagation();
    dispatch(removeFavorite(cityId));
    dispatch(clearCityData(cityId));
  };

  const handleRetry = (e) => {
    e.stopPropagation();
    dispatch(fetchCityWeather({
      lat: city.lat,
      lon: city.lon,
      name: city.name,
      country: city.country,
    }));
  };

  
  if (isLoading && !weatherData) {
    return (
      <div className={`city-card city-card--loading stagger-${Math.min(index + 1, 8)}`}>
        <div className="city-card__skeleton-header">
          <div className="skeleton" style={{ width: '60%', height: 20 }} />
          <div className="skeleton" style={{ width: '30%', height: 14 }} />
        </div>
        <div className="city-card__skeleton-body">
          <div className="skeleton" style={{ width: 64, height: 64, borderRadius: '50%' }} />
          <div className="skeleton" style={{ width: '40%', height: 40 }} />
        </div>
        <div className="city-card__skeleton-footer">
          <div className="skeleton" style={{ width: '30%', height: 14 }} />
          <div className="skeleton" style={{ width: '30%', height: 14 }} />
          <div className="skeleton" style={{ width: '30%', height: 14 }} />
        </div>
      </div>
    );
  }

  
  if (!weatherData) {
    return (
      <div className={`city-card glass-card animate-fade-in-up stagger-${Math.min(index + 1, 8)}`} id={`city-card-${cityId}`}>
        <div className="city-card__header">
          <div className="city-card__location">
            <h3 className="city-card__city-name">{city.name}</h3>
            <span className="city-card__country">{city.country}</span>
          </div>
          <button
            className="city-card__fav-btn city-card__fav-btn--active"
            onClick={handleRemoveFavorite}
            title="Remove from favorites"
          >
            <FiStar size={16} />
          </button>
        </div>
        <div className="city-card__error-body">
          <p className="city-card__error-text">
            {error || 'Unable to load weather data. Check your API key in constants.js or .env file.'}
          </p>
          <button className="btn-primary" onClick={handleRetry}>Retry</button>
        </div>
      </div>
    );
  }

  const { current } = weatherData;
  const temp = convertTemp(current.main.temp, unit);
  const feelsLike = convertTemp(current.main.feels_like, unit);
  const condition = current.weather[0].main;
  const description = capitalize(current.weather[0].description);
  const iconUrl = getWeatherIconUrl(current.weather[0].icon, '4x');
  const humidity = current.main.humidity;
  const wind = convertWindSpeed(current.wind.speed, unit);
  const pressure = current.main.pressure;
  const visibility = current.visibility;
  const lastUpdatedText = weatherData.lastUpdated ? timeAgo(weatherData.lastUpdated) : '';

  return (
    <div
      className={`city-card glass-card animate-fade-in-up stagger-${Math.min(index + 1, 8)}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      id={`city-card-${cityId}`}
    >
      {}
      <div className="city-card__header">
        <div className="city-card__location">
          <h3 className="city-card__city-name">{city.name}</h3>
          <span className="city-card__country">{city.country}</span>
        </div>
        <button
          className="city-card__fav-btn city-card__fav-btn--active"
          onClick={handleRemoveFavorite}
          title="Remove from favorites"
          id={`remove-fav-${cityId}`}
        >
          <FiStar size={16} />
        </button>
      </div>

      {}
      <div className="city-card__body">
        <div className="city-card__icon-wrap">
          <img
            src={iconUrl}
            alt={description}
            className="city-card__icon float-animation"
            loading="lazy"
          />
        </div>
        <div className="city-card__temp-wrap">
          <span className="city-card__temp">{temp}°</span>
          <span className="city-card__unit">{tempUnit(unit)}</span>
        </div>
      </div>

      {}
      <div className="city-card__condition">
        <span className="city-card__condition-text">{description}</span>
        <span className="city-card__feels-like">Feels like {feelsLike}{tempUnit(unit)}</span>
      </div>

      {}
      <div className="city-card__stats">
        <div className="city-card__stat" title="Humidity">
          <FiDroplet size={13} />
          <span>{humidity}%</span>
        </div>
        <div className="city-card__stat" title="Wind Speed">
          <FiWind size={13} />
          <span>{wind} {windSpeedUnit(unit)}</span>
        </div>
        <div className="city-card__stat" title="Pressure">
          <WiBarometer size={18} />
          <span>{pressure} hPa</span>
        </div>
      </div>

      {}
      {lastUpdatedText && (
        <div className="city-card__footer">
          <span className="city-card__updated">Updated {lastUpdatedText}</span>
          {isLoading && <div className="spinner" style={{ width: 10, height: 10, borderWidth: 1.5 }} />}
        </div>
      )}
    </div>
  );
};

export default CityCard;
