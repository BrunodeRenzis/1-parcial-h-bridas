import mongoose from 'mongoose';

const personajeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  tipo: { type: String, enum: ['principal', 'secundario'], required: true }
});

export const Personaje = mongoose.model('Personaje', personajeSchema);
