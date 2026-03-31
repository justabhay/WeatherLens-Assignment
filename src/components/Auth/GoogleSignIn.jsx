import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../../store/authSlice';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import './GoogleSignIn.css';

const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  const handleGoogleLogin = () => {
    dispatch(loginSuccess({
      name: 'Demo User',
      email: 'demo@example.com',
      picture: '',
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowMenu(false);
  };

  if (isAuthenticated && user) {
    return (
      <div className="auth" id="auth-section">
        <button
          className="auth__avatar-btn"
          onClick={() => setShowMenu(!showMenu)}
          title={user.name}
          id="user-menu-btn"
        >
          {user.picture ? (
            <img src={user.picture} alt={user.name} className="auth__avatar-img" />
          ) : (
            <FiUser size={16} />
          )}
        </button>

        {showMenu && (
          <div className="auth__menu glass-card animate-fade-in-up">
            <div className="auth__menu-header">
              <span className="auth__menu-name">{user.name}</span>
              <span className="auth__menu-email">{user.email}</span>
            </div>
            <button className="auth__menu-item" onClick={handleLogout} id="logout-btn">
              <FiLogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      className="auth__login-btn btn-ghost"
      onClick={handleGoogleLogin}
      id="google-sign-in-btn"
    >
      <FcGoogle size={16} />
      <span>Sign In</span>
    </button>
  );
};

export default GoogleSignIn;
