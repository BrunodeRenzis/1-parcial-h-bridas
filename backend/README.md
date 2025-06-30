# Rick & Morty API

API RESTful desarrollada con Node.js, Express y MongoDB para administrar frases de personajes de Rick y Morty. Incluye:

- Autenticación con JWT
- Validaciones con `express-validator`
- Relación entre frases y personajes (referencias)
- Filtros avanzados, búsqueda, paginado y ordenamiento
- Código modular con separación de responsabilidades

---

## 🔧 Tecnologías Utilizadas

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Express Validator
- UUID
- Nodemon

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/rickmorty-api.git
cd rickmorty-api


2. Instala dependencias:

```bash
npm install


3. Crea un archivo .env
```bash
cp .env.example .env
PORT=4000
MONGO_URI=mongodb://localhost:27017/rickmorty
JWT_SECRET=ultrasecreto

USO:
1. Inicia el servidor
```bash
npm run dev

2. Abrí el navegador
```bash
http://localhost:4000/

3. Ejecutá un scrpit para generar datos de prueba.
```bash

node scripts/seed.js

4. Generá token de prueba
```bash
node scripts/generate-token.js
Copia el token que se imprime en consola y usalo en los endpoints protegidos agregando este header:
Authorization: Bearer <token>

📚 Endpoints
GET    /api/frases
GET    /api/frases/:id
POST   /api/frases       (requiere JWT)
PUT    /api/frases/:id   (requiere JWT)
DELETE /api/frases/:id   (requiere JWT)


Parámetros disponibles en GET /api/frases:

Parámetro	Descripción
nombre	Filtrar por nombre del personaje
season	Filtrar por temporada
limit	Limitar cantidad de resultados
skip	Saltar cierta cantidad (paginado)
sort	Ordenar por campo (frase, -frase, etc)

Ejemplos:

/api/frases?nombre=rick

/api/frases?season=1&limit=5

/api/frases?sort=-frase

Personajes
GET    /api/personajes
GET    /api/personajes/:id
POST   /api/personajes   (requiere JWT)
PUT   /api/personajes/:id   (requiere JWT)
DELETE   /api/personajes/:id   (requiere JWT)

curl para probar por consola ejemplo personajes:

get personajes:
curl http://localhost:4000/api/personajes

get personaje por id:
curl http://localhost:4000/api/personajes/ID_PERSONAJE

post con jwt:
curl -X POST http://localhost:4000/api/personajes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "nombre": "Birdperson",
    "edad": 40,
    "tipo": "secundario"
}'

put con jwt:
curl -X PUT http://localhost:4000/api/personajes/:id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "edad": 41
}'

delete con jwt:
curl -X DELETE http://localhost:4000/api/personajes/:id \
  -H "Authorization: Bearer TU_TOKEN"


🧾 Pie de página (HTML principal)
Este proyecto incluye un archivo HTML en /src/public/index.html que:

Informa sobre la API

Tiene ejemplos y enlaces a los endpoints

Incluye los datos solicitados:

Nombre y Apellido

Materia

Docente

Comisión

✍️ Autor
Nombre: Bruno de Renzis

Materia: Aplicaciones Híbridas

Docente: [MARCOS GALBÁN, Camila Belén]

Comisión: [A-1331]

