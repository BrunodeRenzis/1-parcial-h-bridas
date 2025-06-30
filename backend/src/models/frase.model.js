import mongoose from 'mongoose';

const fraseSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  frase: { type: String, required: true },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Personaje',
    required: true
  },
  season: [{ type: Number, required: true }]
});

export const Frase = mongoose.model('Frase', fraseSchema);
