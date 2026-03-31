import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { WiDaySunny } from 'react-icons/wi';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiArrowLeft } from 'react-icons/fi';
import SearchBar from '../Search/SearchBar';
import Settings from '../Settings/Settings';
import GoogleSignIn from '../Auth/GoogleSignIn';
import './Header.css';

const Header = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { globalLoading } = useSelector((state) => state.weather);
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailView = location.pathname.startsWith('/city/');

  return (
    <header className="header" id="app-header">
      <div className="header__inner">
        {}
        <div className="header__left">
          {isDetailView && (
            <button
              className="header__back-btn"
              onClick={() => navigate('/')}
              title="Back to Dashboard"
              id="back-to-dashboard-btn"
            >
              <FiArrowLeft size={20} />
            </button>
          )}
          <div
            className="header__logo"
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            id="logo-home-link"
          >
            <div className="header__logo-icon">
              <WiDaySunny size={32} />
            </div>
            <div className="header__logo-text">
              <h1>WeatherLens</h1>
              <span className="header__logo-subtitle">Analytics Dashboard</span>
            </div>
          </div>
        </div>

        {}
        <div className="header__center">
          <SearchBar />
        </div>

        {}
        <div className="header__right">
          {globalLoading && (
            <div className="header__status" title="Refreshing data...">
              <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
              <span>Syncing</span>
            </div>
          )}

          <button
            className="header__icon-btn"
            onClick={() => setShowSettings(!showSettings)}
            title="Settings"
            id="settings-toggle-btn"
          >
            <IoSettingsOutline size={20} />
          </button>

          <GoogleSignIn />

          {}
          {showSettings && (
            <div className="header__settings-dropdown animate-fade-in-up">
              <Settings onClose={() => setShowSettings(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
