import { Link } from "react-router-dom";
import { useState } from "react";

const NavbarLogout: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__links">
          <Link className="navbar__link" to="/frases">
            Frases
          </Link>
          <Link className="navbar__link" to="/personajes">
            Personajes
          </Link>
        </div>
      </div>
      <div className="navbar__right">
        <div className="navbar__links">
          <Link className="navbar__link" to="/login">
            Ingresar
          </Link>
          <Link className="navbar__link" to="/register">
            Registrarse
          </Link>
        </div>
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
          <Link
            className="navbar__link"
            to="/login"
            onClick={() => setOpen(false)}
          >
            Ingresar
          </Link>
          <Link
            className="navbar__link"
            to="/register"
            onClick={() => setOpen(false)}
          >
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarLogout;
