import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, type User } from "../context/AuthContext";

interface Props {
  user: User;
}

const NavbarLogged: React.FC<Props> = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate("/login");
    setOpen(false);
  };

  const canAccessAdmin = user.role === "superadmin" || user.role === "admin";

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <span className="navbar__user-name">
          Bienvenido, {user.nombre} ({user.role})
        </span>
        <div className="navbar__links">
          <Link className="navbar__link" to="/frases">
            Frases
          </Link>
          <Link className="navbar__link" to="/personajes">
            Personajes
          </Link>
          {canAccessAdmin && (
            <>
              <Link className="navbar__link" to="/admin/frases">
                Admin
              </Link>
              {user.role === "superadmin" && (
                <Link className="navbar__link" to="/register">
                  Registrar usuario
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      <div className="navbar__right navbar__links">
        <a href="#logout" className="navbar__logout" onClick={handleLogout}>
          Salir
        </a>
      </div>

      <button
        className="navbar__hamburger"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Menú"
      >
        <span className="navbar__hamburger-bar" />
        <span className="navbar__hamburger-bar" />
        <span className="navbar__hamburger-bar" />
      </button>

      {open && (
        <div className="navbar__mobile-menu">
          <Link
            className="navbar__link"
            to="/frases"
            onClick={() => setOpen(false)}
          >
            Frases
          </Link>
          <Link
            className="navbar__link"
            to="/personajes"
            onClick={() => setOpen(false)}
          >
            Personajes
          </Link>
          {canAccessAdmin && (
            <>
              <Link
                className="navbar__link"
                to="/admin/frases"
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
              {user.role === "superadmin" && (
                <Link
                  className="navbar__link"
                  to="/register"
                  onClick={() => setOpen(false)}
                >
                  Registrar usuario
                </Link>
              )}
            </>
          )}
          <a href="#logout" className="navbar__logout" onClick={handleLogout}>
            Salir
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavbarLogged;
