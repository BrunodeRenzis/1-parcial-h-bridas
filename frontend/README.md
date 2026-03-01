# Rick & Morty Frontend (React + TypeScript + Vite)

Este frontend consume la API de Rick & Morty y permite:

- Registro y login de usuarios (superadmin y standard)
- Persistencia de sesión con JWT (localStorage y cookies)
- UI protegida según el rol del usuario
- CRUD de personajes y frases (solo superadmin puede crear/editar/borrar)
- Formularios validados y UI moderna con SCSS

---

## 👤 Gestión de Usuarios y Autenticación

- Registro: Formulario para crear usuario con nombre, email, contraseña y rol
- Login: Formulario de acceso, guarda el token y usuario en localStorage/cookie
- Restauración de sesión automática al refrescar (consulta /api/users/me con el token)
- Navbar muestra el nombre y rol, y permite logout
- Rutas protegidas: solo usuarios autenticados pueden acceder a la app
- El superadmin ve opciones extra (registrar usuario, CRUD completo)

---

## 🛠️ Estructura y tecnologías

- React + TypeScript + Vite
- Context API para autenticación
- React Router para rutas protegidas
- SCSS para estilos modernos y responsivos

---

## 📦 Instalación y uso

1. Clona el repositorio:

````bash
git clone https://github.com/BrunodeRenzis/1-parcial-h-bridas.git
cd frontend

2. Instala dependencias:
```bash
npm install
```
3. Crea un archivo `.env` con la URL de la API:
```env
VITE_API_URL=http://localhost:4000
```
4. Inicia el frontend:
```bash
npm run dev
```

---

## 📝 Notas
- El frontend requiere que el backend esté corriendo y accesible en la URL configurada.
- No es necesario instalar dependencias extra para el manejo de variables de entorno, Vite las soporta nativamente.
- El diseño es responsivo y accesible, con feedback visual para errores y éxito en formularios.
````
