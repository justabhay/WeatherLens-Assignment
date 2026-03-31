// small helper utilities
import { API_ROUTES } from './constants';


export const kelvinToCelsius = (k) => Math.round(k - 273.15);
export const kelvinToFahrenheit = (k) => Math.round((k - 273.15) * 9 / 5 + 32);

export const convertTemp = (kelvin, unit) => {
  if (unit === 'fahrenheit') return kelvinToFahrenheit(kelvin);
  return kelvinToCelsius(kelvin);
};

export const tempUnit = (unit) => (unit === 'fahrenheit' ? '°F' : '°C');


export const formatDate = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

export const formatTime = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
};

export const formatDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const formatHour = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone: 'UTC',
  });
};


export const getWeatherIconUrl = (iconCode, size = '2x') => {
  return `${API_ROUTES.ICON_URL}/${iconCode}@${size}.png`;
};


export const getWindDirection = (deg) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};


export const msToKmh = (ms) => Math.round(ms * 3.6);
export const msToMph = (ms) => Math.round(ms * 2.237);

export const convertWindSpeed = (ms, unit) => {
  if (unit === 'fahrenheit') return msToMph(ms);
  return msToKmh(ms);
};

export const windSpeedUnit = (unit) => (unit === 'fahrenheit' ? 'mph' : 'km/h');


export const formatVisibility = (meters) => {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${meters} m`;
};


export const formatPressure = (hPa) => `${hPa} hPa`;


export const calculateDewPoint = (tempKelvin, humidity) => {
  const tempC = tempKelvin - 273.15;
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * tempC) / (b + tempC) + Math.log(humidity / 100);
  const dewPointC = (b * alpha) / (a - alpha);
  return dewPointC;
};


export const getCityId = (lat, lon) => `${lat.toFixed(2)}_${lon.toFixed(2)}`;


export const groupForecastByDay = (forecastList) => {
  const days = {};
  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(item);
  });

  return Object.entries(days).map(([date, items]) => {
    const temps = items.map((i) => i.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    
    const middayItem = items.find((i) => {
      const hour = new Date(i.dt * 1000).getHours();
      return hour >= 11 && hour <= 15;
    }) || items[Math.floor(items.length / 2)];

    return {
      date,
      dt: items[0].dt,
      minTemp,
      maxTemp,
      icon: middayItem.weather[0].icon,
      condition: middayItem.weather[0].main,
      description: middayItem.weather[0].description,
      humidity: Math.round(items.reduce((s, i) => s + i.main.humidity, 0) / items.length),
      windSpeed: Math.max(...items.map((i) => i.wind.speed)),
      pop: Math.max(...items.map((i) => i.pop || 0)),
      items,
    };
  });
};


export const timeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};


export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);
