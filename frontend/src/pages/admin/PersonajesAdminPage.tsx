import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getPersonajes, createPersonaje, updatePersonaje, deletePersonaje } from '../../services/personajesService';
import type { Personaje } from '../../interfaces/personaje.interface';
import './AdminPages.scss';

const PersonajesAdminPage: React.FC = () => {
  const { token } = useAuth();
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoEdad, setNuevoEdad] = useState('');
  const [nuevoTipo, setNuevoTipo] = useState('principal');
  const [nuevoImageUrl, setNuevoImageUrl] = useState('');

  const [editId, setEditId] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editEdad, setEditEdad] = useState('');
  const [editTipo, setEditTipo] = useState('principal');
  const [editImageUrl, setEditImageUrl] = useState('');

  const cargarPersonajes = () => {
    setLoading(true);
    getPersonajes(token || undefined)
      .then(data => setPersonajes(data))
      .catch(() => setError('Error al cargar personajes'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarPersonajes();
  }, [token]);

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!nuevoNombre || !nuevoEdad || !nuevoTipo || !nuevoImageUrl) {
      setError('Completa todos los campos');
      return;
    }
    try {
      await createPersonaje({ nombre: nuevoNombre, edad: Number(nuevoEdad), tipo: nuevoTipo, imageUrl: nuevoImageUrl }, token!);
      setSuccess('Personaje creado');
      setNuevoNombre(''); setNuevoEdad(''); setNuevoTipo('principal'); setNuevoImageUrl('');
      cargarPersonajes();
    } catch {
      setError('Error al crear personaje');
    }
  };

  const handleEditar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!editNombre || !editEdad || !editTipo || !editImageUrl) {
      setError('Completa todos los campos');
      return;
    }
    try {
      await updatePersonaje(editId!, { nombre: editNombre, edad: Number(editEdad), tipo: editTipo, imageUrl: editImageUrl }, token!);
      setSuccess('Personaje actualizado');
      setEditId(null); setEditNombre(''); setEditEdad(''); setEditTipo('principal'); setEditImageUrl('');
      cargarPersonajes();
    } catch {
      setError('Error al actualizar personaje');
    }
  };

  const handleBorrar = async (id: string) => {
    setError(''); setSuccess('');
    if (!window.confirm('¿Seguro que quieres borrar este personaje?')) return;
    try {
      await deletePersonaje(id, token!);
      setSuccess('Personaje eliminado');
      cargarPersonajes();
    } catch {
      setError('Error al borrar personaje');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h2>Personajes</h2>
          <p>Administra personajes y sus datos básicos.</p>
        </div>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="admin-error">{error}</p>}
      {success && <p className="admin-success">{success}</p>}

      <section className="admin-card">
        <h3>Nuevo personaje</h3>
        <form onSubmit={handleCrear} className="admin-form">
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoNombre}
            onChange={e => setNuevoNombre(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Edad"
            value={nuevoEdad}
            onChange={e => setNuevoEdad(e.target.value)}
            required
          />
          <select value={nuevoTipo} onChange={e => setNuevoTipo(e.target.value)}>
            <option value="principal">Principal</option>
            <option value="secundario">Secundario</option>
          </select>
          <input
            type="text"
            placeholder="URL Imagen"
            value={nuevoImageUrl}
            onChange={e => setNuevoImageUrl(e.target.value)}
            required
          />
          <button type="submit">Agregar personaje</button>
        </form>
      </section>

      <section className="admin-grid">
        {personajes.map(p => (
          <div className="admin-card" key={p._id}>
            {editId === p._id ? (
              <form onSubmit={handleEditar} className="admin-form-inline">
                <input
                  type="text"
                  value={editNombre}
                  onChange={e => setEditNombre(e.target.value)}
                  required
                />
                <input
                  type="number"
                  value={editEdad}
                  onChange={e => setEditEdad(e.target.value)}
                  required
                />
                <select value={editTipo} onChange={e => setEditTipo(e.target.value)}>
                  <option value="principal">Principal</option>
                  <option value="secundario">Secundario</option>
                </select>
                <input
                  type="text"
                  value={editImageUrl}
                  onChange={e => setEditImageUrl(e.target.value)}
                  required
                />
                <div className="admin-actions">
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
                </div>
              </form>
            ) : (
              <>
                <div className="admin-card__title">{p.nombre}</div>
                <div className="admin-card__meta">
                  <span>Edad: {p.edad}</span>
                  <span>Tipo: {p.tipo}</span>
                </div>
                <img
                  src={p.imageUrl || 'https://via.placeholder.com/100'}
                  alt={p.nombre}
                  className="admin-card__img"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/100'; }}
                />
                <div className="admin-actions">
                  <button onClick={() => { setEditId(p._id); setEditNombre(p.nombre); setEditEdad(String(p.edad)); setEditTipo(p.tipo); setEditImageUrl(p.imageUrl || ''); }}>Editar</button>
                  <button onClick={() => handleBorrar(p._id)}>Borrar</button>
                </div>
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default PersonajesAdminPage;

