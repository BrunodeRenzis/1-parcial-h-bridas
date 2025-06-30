const API_URL = `${import.meta.env.VITE_API_URL}/api/frases`;

export async function getFrases(token?: string) {
  const res = await fetch(API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Error al obtener frases');
  return await res.json();
}

export async function createFrase(data: any, token: string) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear frase');
  return await res.json();
}

export async function updateFrase(id: string, data: any, token: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar frase');
  return await res.json();
}

export async function deleteFrase(id: string, token: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al borrar frase');
  return await res.json();
} 