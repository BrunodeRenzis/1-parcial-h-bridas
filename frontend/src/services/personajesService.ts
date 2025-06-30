const API_URL = `${import.meta.env.VITE_API_URL}/api/personajes`;

export async function getPersonajes(token?: string) {
  const res = await fetch(API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Error al obtener personajes');
  return await res.json();
}

export async function createPersonaje(data: any, token: string) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear personaje');
  return await res.json();
}

export async function updatePersonaje(id: string, data: any, token: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar personaje');
  return await res.json();
}

export async function deletePersonaje(id: string, token: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al borrar personaje');
  return await res.json();
} 