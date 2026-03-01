const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login fallido');
  return await res.json();
}

export async function register(nombre: string, email: string, password: string, role?: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password, role })
  });
  if (!res.ok) throw new Error('Registro fallido');
  return await res.json();
} 

export async function getUsers(token: string) {
  const res = await fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return await res.json();
}

export async function updateUser(id: string, data: { nombre?: string; email?: string; password?: string; role?: string }, token: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar usuario');
  return await res.json();
}

export async function deleteUser(id: string, token: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al eliminar usuario');
  return await res.json();
}