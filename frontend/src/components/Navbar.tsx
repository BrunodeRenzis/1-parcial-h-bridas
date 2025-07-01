import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <span className="navbar__user-name">{user.nombre}</span>
        <div className="navbar__links">
          <Link className="navbar__link" to="/frases">Frases</Link>
          <Link className="navbar__link" to="/personajes">Personajes</Link>
          {user.role === 'superadmin' && <Link className="navbar__link" to="/register">Registrar usuario</Link>}
          <a href="#logout" className="navbar__logout" onClick={handleLogout}>Salir</a>
        </div>
        <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
        </button>
      </div>
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <Link className="navbar__link" to="/frases" onClick={() => setMenuOpen(false)}>Frases</Link>
          <Link className="navbar__link" to="/personajes" onClick={() => setMenuOpen(false)}>Personajes</Link>
          {user.role === 'superadmin' && <Link className="navbar__link" to="/register" onClick={() => setMenuOpen(false)}>Registrar usuario</Link>}
          <a href="#logout" className="navbar__logout" onClick={handleLogout}>Salir</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 