import { Frase } from '../models/frase.model.js';
import { Personaje } from '../models/personaje.model.js';

export const getAllFrases = async ({ nombre, season, limit = 10, skip = 0, sort = 'frase' }) => {
  let query = {};

  if (nombre) {
    const personajes = await Personaje.find({
      nombre: { $regex: nombre, $options: 'i' }
    });

    const ids = personajes.map(p => p._id);
    query.autor = { $in: ids };
  }

  if (season) {
    query.season = { $in: [parseInt(season)] };
  }

  return await Frase.find(query)
    .populate('autor')
    .sort(sort)
    .skip(Number(skip))
    .limit(Number(limit));
};

export const getFraseById = async (id) => {
  return await Frase.findById(id);
};

export const createFrase = async (data) => {
  const nueva = new Frase(data);
  return await nueva.save();
};

export const updateFrase = async (id, data) => {
  return await Frase.findByIdAndUpdate(id, data, { new: true });
};

export const deleteFrase = async (id) => {
  return await Frase.findByIdAndDelete(id);
};