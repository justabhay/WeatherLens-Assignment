import { convertTemp, tempUnit, getWeatherIconUrl, formatHour } from '../../utils/helpers';
import './HourlyForecast.css';

const HourlyForecast = ({ forecastList, unit, timezone }) => {
  
  const hourlyData = forecastList.slice(0, 8);

  if (!hourlyData.length) return null;

  return (
    <div className="hourly glass-card" id="hourly-forecast">
      <div className="hourly__scroll">
        {hourlyData.map((item, index) => {
          const temp = convertTemp(item.main.temp, unit);
          const iconUrl = getWeatherIconUrl(item.weather[0].icon, '2x');
          const time = index === 0 ? 'Now' : formatHour(item.dt, timezone);
          const pop = Math.round((item.pop || 0) * 100);

          return (
            <div className="hourly__item" key={item.dt} id={`hourly-item-${index}`}>
              <span className="hourly__time">{time}</span>
              <img
                src={iconUrl}
                alt={item.weather[0].description}
                className="hourly__icon"
                loading="lazy"
              />
              <span className="hourly__temp">{temp}°</span>
              {pop > 0 && (
                <span className="hourly__pop">
                  💧 {pop}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
