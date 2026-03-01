import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import FrasesPage from "./pages/frasesPage/FrasesPage";
import PersonajesPage from "./pages/PersonagesPage/PersonajesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import FrasesAdminPage from "./pages/admin/FrasesAdminPage";
import PersonajesAdminPage from "./pages/admin/PersonajesAdminPage";
import UsersAdminPage from "./pages/admin/UsersAdminPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/frases" element={<FrasesPage />} />
        <Route path="/personajes" element={<PersonajesPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/frases" />} />
          <Route path="frases" element={<FrasesAdminPage />} />
          <Route path="personajes" element={<PersonajesAdminPage />} />
          <Route path="usuarios" element={<UsersAdminPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/frases" />} />
      </Routes>
    </>
  );
}

export default App;
