import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getFrases, createFrase, updateFrase, deleteFrase } from '../../services/frasesService';
import { getPersonajes } from '../../services/personajesService';
import './FrasesPage.scss';
import type { Frase } from '../../interfaces/frase.interface';


const FrasesPage: React.FC = () => {
  const { token, user } = useAuth();
  const [frases, setFrases] = useState<Frase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [nuevaFrase, setNuevaFrase] = useState('');
  const [nuevaAutor, setNuevaAutor] = useState('');

  const [editId, setEditId] = useState<string | null>(null);
  const [editFrase, setEditFrase] = useState('');

  const [personajes, setPersonajes] = useState<{ _id: string; nombre: string }[]>([]);

  const cargarFrases = () => {
    setLoading(true);
    getFrases(token || undefined)
      .then(data => setFrases(data))
      .catch(() => setError('Error al cargar frases'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarFrases();
    getPersonajes(token || undefined)
      .then(data => setPersonajes(data.map((p: any) => ({ _id: p._id, nombre: p.nombre }))))
      .catch(() => setPersonajes([]));
  }, [token]);

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!nuevaFrase || !nuevaAutor) {
      setError('Completa todos los campos');
      return;
    }
    try {
      await createFrase({ frase: nuevaFrase, autor: nuevaAutor, season: [1] }, token!);
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
      <div className="frases-container">
        <h2>Frases</h2>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        {user?.role === 'superadmin' && (
          <form onSubmit={handleCrear} className="frase-form">
            <input
              type="text"
              placeholder="Frase"
              value={nuevaFrase}
              onChange={e => setNuevaFrase(e.target.value)}
              required
            />
            <select
              value={nuevaAutor}
              onChange={e => setNuevaAutor(e.target.value)}
              required
            >
              <option value="">Selecciona un autor</option>
              {personajes.map(p => (
                <option key={p._id} value={p._id}>{p.nombre}</option>
              ))}
            </select>
            <button type="submit">Agregar frase</button>
          </form>
        )}

        <div className="frases-list">
          {frases.map(f => (
            <div className="frase-card" key={f._id}>
              {editId === f._id ? (
                <form onSubmit={handleEditar} className="frase-form-inline">
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
                  <img src={typeof f?.autor === 'object' && f?.autor?.imageUrl ? f?.autor?.imageUrl : 'https://via.placeholder.com/100'} alt={typeof f?.autor === 'object' ? f?.autor?.nombre : 'Autor'} className="frase-img" />
                  <div className="frase-info">
                    <strong>{f.frase}</strong>
                    <div>Autor: {typeof f?.autor === 'object' ? f?.autor?.nombre : 'Sin autor'}</div>
                  </div>
                  {user?.role === 'superadmin' && (
                    <div className="frase-actions">
                      <button onClick={() => { setEditId(f._id); setEditFrase(f.frase); }}>Editar</button>
                      <button onClick={() => handleBorrar(f._id)}>Borrar</button>
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

export default FrasesPage; 