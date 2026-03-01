import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getPersonajes, createPersonaje, updatePersonaje, deletePersonaje } from '../../services/personajesService';
import './PersonajesPage.scss';
import type { Personaje } from '../../interfaces/personaje.interface';




const PersonajesPage: React.FC = () => {
  const { token, user } = useAuth();
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
      <div className="personajes-container">
        <h2>Personajes</h2>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        {user?.role === 'superadmin' && (
          <form onSubmit={handleCrear} className="personaje-form">
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
        )}

        <div className="personajes-list">
          {personajes.map(p => (
            <div className="personaje-card" key={p._id}>
              {editId === p._id ? (
                <form onSubmit={handleEditar} className="personaje-form-inline">
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
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
                </form>
              ) : (
                <>
                <img
                  src={p.imageUrl || 'https://via.placeholder.com/100'}
                  alt={p.nombre}
                  className="personaje-img"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/100'; }}
                />
                  <div className="personaje-info">
                    <strong>{p.nombre}</strong>
                    <div>Edad: {p.edad}</div>
                    <div>Tipo: {p.tipo}</div>
                  </div>
                  {user?.role === 'superadmin' && (
                    <div className="personaje-actions">
                      <button onClick={() => { setEditId(p._id); setEditNombre(p.nombre); setEditEdad(String(p.edad)); setEditTipo(p.tipo); setEditImageUrl(p.imageUrl || ''); }}>Editar</button>
                      <button onClick={() => handleBorrar(p._id)}>Borrar</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
  );
};

export default PersonajesPage; 