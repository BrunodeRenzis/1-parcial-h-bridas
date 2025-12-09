import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.scss";
import NavbarLogout from "./NavbarLogout";
import NavbarLogged from "./NavbarLogged";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <NavbarLogout />;
  return <NavbarLogged user={user} />;
};

export default Navbar;
