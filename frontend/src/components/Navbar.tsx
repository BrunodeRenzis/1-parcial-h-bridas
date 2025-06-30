import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <span className="navbar__welcome">Bienvenido, {user.nombre} ({user.role})</span>
        <Link className="navbar__link" to="/frases">Frases</Link>
        <Link className="navbar__link" to="/personajes">Personajes</Link>
        {user.role === 'superadmin' && <Link className="navbar__link" to="/register">Registrar usuario</Link>}
      </div>
      <div className="navbar__right">
        <a href="#logout" className="navbar__logout" onClick={handleLogout}>Salir</a>
      </div>
    </nav>
  );
};

export default Navbar; 