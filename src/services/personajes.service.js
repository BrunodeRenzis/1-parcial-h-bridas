import { Personaje } from '../models/personaje.model.js';

export const getAllPersonajes = async () => {
  return await Personaje.find();
};

export const getPersonajeById = async (id) => {
  return await Personaje.findOne({ id });
};

export const createPersonaje = async (data) => {
  const nuevo = new Personaje(data);
  return await nuevo.save();
};

export const updatePersonaje = async (id, data) => {
  return await Personaje.findOneAndUpdate({ id }, data, { new: true });
};

export const deletePersonaje = async (id) => {
  return await Personaje.findOneAndDelete({ id });
};
