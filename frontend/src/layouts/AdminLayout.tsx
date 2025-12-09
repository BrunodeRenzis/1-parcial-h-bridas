import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.scss';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header__brand">
          <span className="admin-header__title">BackOffice</span>
          <span className="admin-header__subtitle">Administra el contenido</span>
        </div>
        <div className="admin-header__user">
          <span>{user?.nombre} ({user?.role})</span>
          <button onClick={handleLogout}>Salir</button>
        </div>
      </header>

      <nav className="admin-nav">
        <Link className={isActive('/admin/frases') ? 'active' : ''} to="/admin/frases">Frases</Link>
        <Link className={isActive('/admin/personajes') ? 'active' : ''} to="/admin/personajes">Personajes</Link>
        <Link className={isActive('/admin/usuarios') ? 'active' : ''} to="/admin/usuarios">Usuarios</Link>
      </nav>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

