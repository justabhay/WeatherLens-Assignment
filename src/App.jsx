// App root and routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store/store';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import DetailView from './components/DetailView/DetailView';
import Landing from './components/Landing/Landing';
import './App.css';

function AppContent() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isAuthenticated ? <Dashboard /> : <Landing />} />
          <Route path="city/:lat/:lon" element={<DetailView />} />
        </Route>
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      {/* Provide Redux store to the app */}
      <AppContent />
    </Provider>
  );
}

export default App;
