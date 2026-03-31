import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { convertTemp, tempUnit, formatHour } from '../../utils/helpers';
import './Charts.css';

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="chart-tooltip__value" style={{ color: entry.color }}>
          {entry.name}: {entry.value}{tempUnit(unit)}
        </p>
      ))}
    </div>
  );
};

const TemperatureChart = ({ forecastList, unit, timezone }) => {
  const data = forecastList.slice(0, 16).map((item) => ({
    time: formatHour(item.dt, timezone),
    Temperature: convertTemp(item.main.temp, unit),
    'Feels Like': convertTemp(item.main.feels_like, unit),
    'Min': convertTemp(item.main.temp_min, unit),
    'Max': convertTemp(item.main.temp_max, unit),
  }));

  if (!data.length) {
    return <p className="chart-empty">No temperature data available</p>;
  }

  return (
    <div className="chart-container" id="temperature-chart">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="feelsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
            </linearGradient>
          </defs>
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
            tickFormatter={(val) => `${val}°`}
          />
          <Tooltip content={<CustomTooltip unit={unit} />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            type="monotone"
            dataKey="Temperature"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#tempGradient)"
            dot={false}
            activeDot={{ r: 5, fill: '#3b82f6', stroke: '#1e293b', strokeWidth: 2 }}
            animationDuration={1200}
          />
          <Area
            type="monotone"
            dataKey="Feels Like"
            stroke="#06b6d4"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            fill="url(#feelsGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#06b6d4', stroke: '#1e293b', strokeWidth: 2 }}
            animationDuration={1200}
            animationBegin={200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
