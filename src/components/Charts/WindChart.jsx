import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { convertWindSpeed, windSpeedUnit, formatHour } from '../../utils/helpers';
import './Charts.css';

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="chart-tooltip__value" style={{ color: entry.color }}>
          {entry.name}: {entry.value} {windSpeedUnit(unit)}
        </p>
      ))}
    </div>
  );
};

const WindChart = ({ forecastList, unit, timezone }) => {
  const data = forecastList.slice(0, 16).map((item) => ({
    time: formatHour(item.dt, timezone),
    'Wind Speed': convertWindSpeed(item.wind.speed, unit),
    'Gusts': item.wind.gust ? convertWindSpeed(item.wind.gust, unit) : null,
  }));

  if (!data.length) {
    return <p className="chart-empty">No wind data available</p>;
  }

  const hasGusts = data.some((d) => d['Gusts'] !== null);

  return (
    <div className="chart-container" id="wind-chart">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `${val}`}
          />
          <Tooltip content={<CustomTooltip unit={unit} />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
            iconType="circle"
            iconSize={8}
          />
          <Line
            type="monotone"
            dataKey="Wind Speed"
            stroke="#22c55e"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#22c55e', stroke: '#1e293b', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#22c55e', stroke: '#1e293b', strokeWidth: 2 }}
            animationDuration={1200}
          />
          {hasGusts && (
            <Line
              type="monotone"
              dataKey="Gusts"
              stroke="#f59e0b"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 4, fill: '#f59e0b', stroke: '#1e293b', strokeWidth: 2 }}
              animationDuration={1200}
              animationBegin={300}
              connectNulls
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WindChart;
