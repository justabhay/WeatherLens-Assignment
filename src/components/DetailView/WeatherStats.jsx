import {
  FiDroplet, FiWind, FiEye, FiSunrise, FiSunset, FiThermometer,
} from 'react-icons/fi';
import { WiBarometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import { TbTemperature } from 'react-icons/tb';
import './WeatherStats.css';

const WeatherStats = ({
  humidity,
  pressure,
  visibility,
  windSpeed,
  windGust,
  windDir,
  windUnit,
  feelsLike,
  tempUnit,
  dewPoint,
  sunrise,
  sunset,
}) => {
  const stats = [
    {
      id: 'feels-like',
      label: 'Feels Like',
      value: `${feelsLike}${tempUnit}`,
      icon: <FiThermometer size={20} />,
      color: 'var(--accent-warm)',
    },
    {
      id: 'humidity',
      label: 'Humidity',
      value: `${humidity}%`,
      icon: <FiDroplet size={20} />,
      color: 'var(--accent-secondary)',
      bar: humidity,
    },
    {
      id: 'wind',
      label: 'Wind',
      value: `${windSpeed} ${windUnit}`,
      subtitle: `Direction: ${windDir}`,
      icon: <FiWind size={20} />,
      color: 'var(--accent-primary)',
    },
    {
      id: 'pressure',
      label: 'Pressure',
      value: `${pressure} hPa`,
      icon: <WiBarometer size={24} />,
      color: 'var(--accent-rain)',
    },
    {
      id: 'visibility',
      label: 'Visibility',
      value: visibility >= 1000
        ? `${(visibility / 1000).toFixed(1)} km`
        : `${visibility} m`,
      icon: <FiEye size={20} />,
      color: 'var(--text-secondary)',
    },
    {
      id: 'dew-point',
      label: 'Dew Point',
      value: `${dewPoint}${tempUnit}`,
      icon: <TbTemperature size={20} />,
      color: 'var(--accent-cold)',
    },
    {
      id: 'sunrise',
      label: 'Sunrise',
      value: sunrise,
      icon: <FiSunrise size={20} />,
      color: 'var(--accent-warm)',
    },
    {
      id: 'sunset',
      label: 'Sunset',
      value: sunset,
      icon: <FiSunset size={20} />,
      color: '#e87d50',
    },
  ];

  
  if (windGust !== null) {
    stats.splice(3, 0, {
      id: 'wind-gust',
      label: 'Wind Gust',
      value: `${windGust} ${windUnit}`,
      icon: <WiStrongWind size={24} />,
      color: 'var(--accent-primary)',
    });
  }

  return (
    <div className="weather-stats" id="weather-stats">
      {stats.map((stat) => (
        <div
          className="weather-stats__tile glass-subtle"
          key={stat.id}
          id={`stat-${stat.id}`}
        >
          <div className="weather-stats__tile-header">
            <span
              className="weather-stats__tile-icon"
              style={{ color: stat.color }}
            >
              {stat.icon}
            </span>
            <span className="weather-stats__tile-label">{stat.label}</span>
          </div>
          <span className="weather-stats__tile-value">{stat.value}</span>
          {stat.subtitle && (
            <span className="weather-stats__tile-subtitle">{stat.subtitle}</span>
          )}
          {stat.bar !== undefined && (
            <div className="weather-stats__tile-bar">
              <div
                className="weather-stats__tile-bar-fill"
                style={{ width: `${stat.bar}%`, background: stat.color }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeatherStats;
