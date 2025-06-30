import React, { useState } from "react";
import { register as registerService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.scss";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await registerService(nombre, email, password, role);
      setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Error en el registro");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-container">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="superadmin">Admin</option>
            <option value="standard">User</option>
          </select>

          <button type="submit">Registrarse</button>
        </form>
        {error && <p className="register-error">{error}</p>}
        {success && <p className="register-success">{success}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
