import { Outlet } from 'react-router-dom';
import Header from './Header';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">
        <p>Weather Analytics Dashboard &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;
