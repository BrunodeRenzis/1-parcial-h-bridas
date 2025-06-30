import mongoose from 'mongoose';

const personajeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  tipo: { type: String, enum: ['principal', 'secundario'], required: true },
  frases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Frase' }]
});

export const Personaje = mongoose.model('Personaje', personajeSchema);
