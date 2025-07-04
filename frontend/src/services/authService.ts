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