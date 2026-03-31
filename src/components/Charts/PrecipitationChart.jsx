import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { formatHour } from '../../utils/helpers';
import './Charts.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="chart-tooltip__value" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
          {entry.name === 'Precipitation' ? ' mm' : '%'}
        </p>
      ))}
    </div>
  );
};

const PrecipitationChart = ({ forecastList, timezone }) => {
  const data = forecastList.slice(0, 16).map((item) => {
    const pop = Math.round((item.pop || 0) * 100);
    const rain = item.rain?.['3h'] || 0;
    const snow = item.snow?.['3h'] || 0;

    return {
      time: formatHour(item.dt, timezone),
      'Rain Chance': pop,
      'Precipitation': Math.round((rain + snow) * 10) / 10,
    };
  });

  if (!data.length) {
    return <p className="chart-empty">No precipitation data available</p>;
  }

  
  const getBarColor = (value) => {
    if (value >= 80) return '#4f46e5';
    if (value >= 60) return '#6366f1';
    if (value >= 40) return '#818cf8';
    if (value >= 20) return '#a5b4fc';
    return '#c7d2fe';
  };

  return (
    <div className="chart-container" id="precipitation-chart">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
            tickFormatter={(val) => `${val}%`}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
            iconType="circle"
            iconSize={8}
          />
          <Bar
            dataKey="Rain Chance"
            radius={[4, 4, 0, 0]}
            animationDuration={1200}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry['Rain Chance'])}
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecipitationChart;
