import { WiDaySunny } from 'react-icons/wi';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page animate-fade-in-up">
      <div className="landing-page__icon float-animation">
        <WiDaySunny size={100} />
      </div>
      <h1 className="landing-page__title">Welcome to WeatherLens</h1>
      <p className="landing-page__subtitle">
        Search for a city above to view its real-time weather analytics, 
        <br />or sign in to create and monitor your own custom dashboard.
      </p>
    </div>
  );
};

export default Landing;
