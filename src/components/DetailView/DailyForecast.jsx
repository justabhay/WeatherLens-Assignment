import {
  convertTemp, tempUnit, getWeatherIconUrl, formatDay,
  capitalize, groupForecastByDay
} from '../../utils/helpers';
import { FiDroplet, FiWind } from 'react-icons/fi';
import './DailyForecast.css';

const DailyForecast = ({ forecastList, unit }) => {
  const days = groupForecastByDay(forecastList);

  if (!days.length) return null;

  return (
    <div className="daily glass-card" id="daily-forecast">
      {days.map((day, index) => {
        const maxTemp = convertTemp(day.maxTemp, unit);
        const minTemp = convertTemp(day.minTemp, unit);
        const iconUrl = getWeatherIconUrl(day.icon, '2x');
        const dayLabel = formatDay(day.dt);
        const pop = Math.round(day.pop * 100);

        return (
          <div className="daily__item" key={day.date} id={`daily-item-${index}`}>
            <span className="daily__day">{dayLabel}</span>

            <div className="daily__icon-wrap">
              <img src={iconUrl} alt={day.description} className="daily__icon" loading="lazy" />
            </div>

            <span className="daily__condition">{capitalize(day.description)}</span>

            <div className="daily__meta">
              {pop > 0 && (
                <span className="daily__pop">
                  <FiDroplet size={11} />
                  {pop}%
                </span>
              )}
            </div>

            <div className="daily__temps">
              <span className="daily__temp-max">{maxTemp}°</span>
              <div className="daily__temp-bar">
                <div
                  className="daily__temp-bar-fill"
                  style={{
                    '--temp-range': `${((maxTemp - minTemp) / 40) * 100}%`,
                  }}
                />
              </div>
              <span className="daily__temp-min">{minTemp}°</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyForecast;
