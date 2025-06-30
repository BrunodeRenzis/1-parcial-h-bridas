import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import FrasesPage from './pages/frasesPage/FrasesPage';
import PersonajesPage from './pages/PersonagesPage/PersonajesPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/frases" element={<ProtectedRoute><FrasesPage /></ProtectedRoute>} />
      <Route path="/personajes" element={<ProtectedRoute><PersonajesPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/frases" />} />
    </Routes>
  );
}

export default App; 