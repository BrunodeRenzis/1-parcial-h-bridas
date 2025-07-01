import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { login as loginService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { token, user } = await loginService(email, password);
      login(user, token);
      navigate('/frases');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
        <div className="register-button" onClick={()=>navigate('/register')}>
          <p><span>No tienes cuenta? Registrate</span></p>
        </div>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage; 