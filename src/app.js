import express from 'express';
import frasesRoutes from './routes/frases.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import personajesRoutes from './routes/personajes.routes.js';
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(`
    <h1>API Rick & Morty Frases</h1>
    <p>Consulta los endpoints /api/frases y /api/personajes</p>
    <footer>
      Nombre: Bruno de Renzis<br />
      Materia: Aplicaciones Híbridas <br />
      Docente: Marcos Galvan Camila Belén <br />
      Comisión: X
    </footer>
  `);
});

app.use('/api/frases', frasesRoutes);
app.use('/api/personajes', personajesRoutes);

export default app;
