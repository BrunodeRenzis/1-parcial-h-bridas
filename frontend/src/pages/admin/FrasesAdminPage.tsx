import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getFrases, createFrase, updateFrase, deleteFrase } from '../../services/frasesService';
import { getPersonajes } from '../../services/personajesService';
import type { Frase } from '../../interfaces/frase.interface';
import './AdminPages.scss';

const FrasesAdminPage: React.FC = () => {
  const { token } = useAuth();
  const [frases, setFrases] = useState<Frase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [nuevaFrase, setNuevaFrase] = useState('');
  const [nuevaAutor, setNuevaAutor] = useState('');
  const [nuevaSeason, setNuevaSeason] = useState('1');

  const [editId, setEditId] = useState<string | null>(null);
  const [editFrase, setEditFrase] = useState('');
  const [editSeason, setEditSeason] = useState('1');

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
      await createFrase({ frase: nuevaFrase, autor: nuevaAutor, season: [Number(nuevaSeason) || 1] }, token!);
      setSuccess('Frase creada');
      setNuevaFrase(''); setNuevaAutor(''); setNuevaSeason('1');
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
      await updateFrase(editId!, { frase: editFrase, season: [Number(editSeason) || 1] }, token!);
      setSuccess('Frase actualizada');
      setEditId(null); setEditFrase(''); setEditSeason('1');
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
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h2>Frases</h2>
          <p>Crear, editar y eliminar frases de personajes.</p>
        </div>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="admin-error">{error}</p>}
      {success && <p className="admin-success">{success}</p>}

      <section className="admin-card">
        <h3>Nueva frase</h3>
        <form onSubmit={handleCrear} className="admin-form">
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
          <input
            type="number"
            placeholder="Temporada"
            min={1}
            value={nuevaSeason}
            onChange={e => setNuevaSeason(e.target.value)}
            required
          />
          <button type="submit">Agregar frase</button>
        </form>
      </section>

      <section className="admin-grid">
        {frases.map(f => (
          <div className="admin-card" key={f._id}>
            {editId === f._id ? (
              <form onSubmit={handleEditar} className="admin-form-inline">
                <input
                  type="text"
                  value={editFrase}
                  onChange={e => setEditFrase(e.target.value)}
                  required
                />
                <input
                  type="number"
                  min={1}
                  value={editSeason}
                  onChange={e => setEditSeason(e.target.value)}
                  required
                />
                <div className="admin-actions">
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
                </div>
              </form>
            ) : (
              <>
                <div className="admin-card__title">“{f.frase}”</div>
                <div className="admin-card__meta">
                  <span>Autor: {typeof f?.autor === 'object' ? f.autor?.nombre : 'Sin autor'}</span>
                  <span>Temp: {Array.isArray(f.season) ? f.season.join(', ') : '-'}</span>
                </div>
                <div className="admin-actions">
                  <button onClick={() => { setEditId(f._id); setEditFrase(f.frase); setEditSeason(String(f.season?.[0] || 1)); }}>Editar</button>
                  <button onClick={() => handleBorrar(f._id)}>Borrar</button>
                </div>
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default FrasesAdminPage;

