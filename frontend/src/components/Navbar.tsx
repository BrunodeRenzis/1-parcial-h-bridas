import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
      <span>Bienvenido, {user.nombre} ({user.role})</span>
      <Link to="/frases">Frases</Link>
      <Link to="/personajes">Personajes</Link>
      {user.role === 'superadmin' && <Link to="/register">Registrar usuario</Link>}
      <button onClick={handleLogout}>Salir</button>
    </nav>
  );
};

export default Navbar; 