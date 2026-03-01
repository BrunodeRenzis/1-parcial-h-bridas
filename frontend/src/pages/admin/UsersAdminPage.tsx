import React, { useEffect, useState } from "react";
import {
  getUsers,
  register,
  updateUser,
  deleteUser,
} from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import "./AdminPages.scss";

const UsersAdminPage: React.FC = () => {
  const { token, user } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("standard");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState<
    { _id: string; nombre: string; email: string; role: string }[]
  >([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("standard");
  const [editPassword, setEditPassword] = useState("");

  const cargarUsuarios = () => {
    if (!token) return;
    getUsers(token)
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  };

  useEffect(() => {
    cargarUsuarios();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await register(nombre, email, password, role);
      setSuccess("Usuario creado correctamente");
      setNombre("");
      setEmail("");
      setRole("standard");
      setPassword("");
      cargarUsuarios();
    } catch {
      setError("No se pudo crear el usuario");
    }
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId || !token) return;
    setError("");
    setSuccess("");
    try {
      await updateUser(
        editId,
        {
          nombre: editNombre,
          email: editEmail,
          role: editRole,
          password: editPassword || undefined,
        },
        token
      );
      setSuccess("Usuario actualizado");
      setEditId(null);
      setEditNombre("");
      setEditEmail("");
      setEditRole("standard");
      setEditPassword("");
      cargarUsuarios();
    } catch {
      setError("No se pudo actualizar el usuario");
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!window.confirm("¿Eliminar este usuario?")) return;
    setError("");
    setSuccess("");
    try {
      await deleteUser(id, token);
      setSuccess("Usuario eliminado");
      cargarUsuarios();
    } catch {
      setError("No se pudo eliminar el usuario");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h2>Usuarios</h2>
          <p>Crear cuentas con roles para acceder al sistema.</p>
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {success && <p className="admin-success">{success}</p>}

      {user?.role === "superadmin" && (
        <section className="admin-card">
          <h3>Nuevo usuario</h3>
          <form onSubmit={handleSubmit} className="admin-form">
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
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="standard">Usuario</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
            <button type="submit">Crear usuario</button>
          </form>
        </section>
      )}

      <section className="admin-card">
        <h3>Usuarios existentes</h3>
        {users.length === 0 ? (
          <p>No hay usuarios para mostrar.</p>
        ) : (
          <div className="admin-grid">
            {users.map((u) => (
              <div className="admin-card" key={u._id}>
                {editId === u._id ? (
                  <form onSubmit={handleEditSave} className="admin-form-inline">
                    <input
                      type="text"
                      value={editNombre}
                      onChange={(e) => setEditNombre(e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      required
                    />
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                    >
                      <option value="standard">Usuario</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
                    <input
                      type="password"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      placeholder="Nueva contraseña (opcional)"
                    />
                    <div className="admin-actions">
                      <button type="submit">Guardar</button>
                      <button type="button" onClick={() => setEditId(null)}>
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="admin-card__title">{u.nombre}</div>
                    <div className="admin-card__meta">
                      <span>Email: {u.email}</span>
                      <span>Rol: {u.role}</span>
                    </div>
                    {user?.role === "superadmin" && (
                      <div className="admin-actions">
                        <button
                          onClick={() => {
                            setEditId(u._id);
                            setEditNombre(u.nombre);
                            setEditEmail(u.email);
                            setEditRole(u.role);
                            setEditPassword("");
                          }}
                        >
                          Editar
                        </button>
                        <button onClick={() => handleDelete(u._id)}>
                          Eliminar
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UsersAdminPage;
