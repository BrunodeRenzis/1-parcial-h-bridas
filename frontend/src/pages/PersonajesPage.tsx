import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { getPersonajes, createPersonaje, updatePersonaje, deletePersonaje } from '../services/personajesService';

interface Personaje {
  _id: string;
  nombre: string;
  edad: number;
  tipo: string;
}

const PersonajesPage: React.FC = () => {
  const { token, user } = useAuth();
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Formulario de nuevo personaje
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoEdad, setNuevoEdad] = useState('');
  const [nuevoTipo, setNuevoTipo] = useState('principal');

  // Edición
  const [editId, setEditId] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editEdad, setEditEdad] = useState('');
  const [editTipo, setEditTipo] = useState('principal');

  const cargarPersonajes = () => {
    setLoading(true);
    getPersonajes(token || undefined)
      .then(data => setPersonajes(data))
      .catch(() => setError('Error al cargar personajes'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarPersonajes();
    // eslint-disable-next-line
  }, [token]);

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!nuevoNombre || !nuevoEdad || !nuevoTipo) {
      setError('Completa todos los campos');
      return;
    }
    try {
      await createPersonaje({ nombre: nuevoNombre, edad: Number(nuevoEdad), tipo: nuevoTipo }, token!);
      setSuccess('Personaje creado');
      setNuevoNombre(''); setNuevoEdad(''); setNuevoTipo('principal');
      cargarPersonajes();
    } catch {
      setError('Error al crear personaje');
    }
  };

  const handleEditar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!editNombre || !editEdad || !editTipo) {
      setError('Completa todos los campos');
      return;
    }
    try {
      await updatePersonaje(editId!, { nombre: editNombre, edad: Number(editEdad), tipo: editTipo }, token!);
      setSuccess('Personaje actualizado');
      setEditId(null); setEditNombre(''); setEditEdad(''); setEditTipo('principal');
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
    <>
      <Navbar />
      <h2>Personajes</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {user?.role === 'superadmin' && (
        <form onSubmit={handleCrear} style={{ marginBottom: 16 }}>
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
          <button type="submit">Agregar personaje</button>
        </form>
      )}

      <ul>
        {personajes.map(p => (
          <li key={p._id}>
            {editId === p._id ? (
              <form onSubmit={handleEditar} style={{ display: 'inline' }}>
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
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                <strong>{p.nombre}</strong> — Edad: {p.edad} — Tipo: {p.tipo}
                {user?.role === 'superadmin' && (
                  <>
                    <button onClick={() => { setEditId(p._id); setEditNombre(p.nombre); setEditEdad(String(p.edad)); setEditTipo(p.tipo); }}>Editar</button>
                    <button onClick={() => handleBorrar(p._id)}>Borrar</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PersonajesPage; 