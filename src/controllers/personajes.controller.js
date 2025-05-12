import * as personajeService from '../services/personajes.service.js';

export const getPersonajes = async (req, res, next) => {
  try {
    const data = await personajeService.getAllPersonajes();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getPersonajeById = async (req, res, next) => {
  try {
    const personaje = await personajeService.getPersonajeById(req.params.id);
    if (!personaje) return res.status(404).json({ msg: 'No encontrado' });
    res.json(personaje);
  } catch (err) {
    next(err);
  }
};

export const postPersonaje = async (req, res, next) => {
  try {
    const nuevo = await personajeService.createPersonaje(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

export const putPersonaje = async (req, res, next) => {
  try {
    const actualizado = await personajeService.updatePersonaje(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ msg: 'No encontrado' });
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
};

export const deletePersonaje = async (req, res, next) => {
  try {
    const eliminado = await personajeService.deletePersonaje(req.params.id);
    if (!eliminado) return res.status(404).json({ msg: 'No encontrado' });
    res.json({ msg: 'Personaje eliminado' });
  } catch (err) {
    next(err);
  }
};
