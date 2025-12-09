import { Link } from "react-router-dom";

const NavbarLogout: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link className="navbar__link" to="/frases">
          Frases
        </Link>
        <Link className="navbar__link" to="/personajes">
          Personajes
        </Link>
      </div>
      <div className="navbar__right">
        <Link className="navbar__link" to="/login">
          Ingresar
        </Link>
        <Link className="navbar__link" to="/register">
          Registrarse
        </Link>
      </div>
    </nav>
  );
};

export default NavbarLogout;
