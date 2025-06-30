import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { getFrases, createFrase, updateFrase, deleteFrase } from '../services/frasesService';

interface Frase {
  _id: string;
  frase: string;
  autor: { nombre: string; _id: string };
  imageUrl?: string;
  season?: number[];
}

const FrasesPage: React.FC = () => {
  const { token, user } = useAuth();
  const [frases, setFrases] = useState<Frase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Formulario de nueva frase
  const [nuevaFrase, setNuevaFrase] = useState('');
  const [nuevaAutor, setNuevaAutor] = useState('');

  // Edición
  const [editId, setEditId] = useState<string | null>(null);
  const [editFrase, setEditFrase] = useState('');

  const cargarFrases = () => {
    setLoading(true);
    getFrases(token || undefined)
      .then(data => setFrases(data))
      .catch(() => setError('Error al cargar frases'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarFrases();
    // eslint-disable-next-line
  }, [token]);

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!nuevaFrase || !nuevaAutor) {
      setError('Completa todos los campos');
      return;
    }
    try {
      await createFrase({ frase: nuevaFrase, autor: nuevaAutor, imageUrl: 'https://via.placeholder.com/150', season: [1] }, token!);
      setSuccess('Frase creada');
      setNuevaFrase(''); setNuevaAutor('');
      cargarFrases();
    } catch {
      setError('Error al crear frase');
    }
  };

  const handleEditar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!editFrase) {
      setError('La frase no puede estar vacía');
      return;
    }
    try {
      await updateFrase(editId!, { frase: editFrase }, token!);
      setSuccess('Frase actualizada');
      setEditId(null); setEditFrase('');
      cargarFrases();
    } catch {
      setError('Error al actualizar frase');
    }
  };

  const handleBorrar = async (id: string) => {
    setError(''); setSuccess('');
    if (!window.confirm('¿Seguro que quieres borrar esta frase?')) return;
    try {
      await deleteFrase(id, token!);
      setSuccess('Frase eliminada');
      cargarFrases();
    } catch {
      setError('Error al borrar frase');
    }
  };

  return (
    <>
      <Navbar />
      <h2>Frases</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {user?.role === 'superadmin' && (
        <form onSubmit={handleCrear} style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Frase"
            value={nuevaFrase}
            onChange={e => setNuevaFrase(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="ID Autor"
            value={nuevaAutor}
            onChange={e => setNuevaAutor(e.target.value)}
            required
          />
          <button type="submit">Agregar frase</button>
        </form>
      )}

      <ul>
        {frases.map(f => (
          <li key={f._id}>
            {editId === f._id ? (
              <form onSubmit={handleEditar} style={{ display: 'inline' }}>
                <input
                  type="text"
                  value={editFrase}
                  onChange={e => setEditFrase(e.target.value)}
                  required
                />
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                <strong>{f.frase}</strong> — {f.autor?.nombre || 'Sin autor'}
                {user?.role === 'superadmin' && (
                  <>
                    <button onClick={() => { setEditId(f._id); setEditFrase(f.frase); }}>Editar</button>
                    <button onClick={() => handleBorrar(f._id)}>Borrar</button>
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

export default FrasesPage; 