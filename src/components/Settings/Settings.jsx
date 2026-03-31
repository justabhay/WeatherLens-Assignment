import { useSelector, useDispatch } from 'react-redux';
import { toggleUnit } from '../../store/settingsSlice';
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from 'react-icons/tb';
import './Settings.css';

const Settings = ({ onClose }) => {
  const dispatch = useDispatch();
  const { unit } = useSelector((state) => state.settings);

  return (
    <div className="settings glass-card" id="settings-panel">
      <div className="settings__header">
        <h3>Settings</h3>
      </div>

      <div className="settings__section">
        <label className="settings__label">Temperature Unit</label>
        <div className="settings__toggle-group">
          <button
            className={`settings__toggle-btn ${unit === 'celsius' ? 'settings__toggle-btn--active' : ''}`}
            onClick={() => { if (unit !== 'celsius') dispatch(toggleUnit()); }}
            id="unit-celsius-btn"
          >
            <TbTemperatureCelsius size={20} />
            <span>Celsius</span>
          </button>
          <button
            className={`settings__toggle-btn ${unit === 'fahrenheit' ? 'settings__toggle-btn--active' : ''}`}
            onClick={() => { if (unit !== 'fahrenheit') dispatch(toggleUnit()); }}
            id="unit-fahrenheit-btn"
          >
            <TbTemperatureFahrenheit size={20} />
            <span>Fahrenheit</span>
          </button>
        </div>
      </div>

      <div className="settings__info">
        <p>Preferences are saved automatically and persist between sessions.</p>
      </div>
    </div>
  );
};

export default Settings;
