import * as fraseService from '../services/frases.service.js';

export const getFrases = async (req, res, next) => {
  try {
    const frases = await fraseService.getAllFrases(req.query);
    res.json(frases);
  } catch (err) {
    next(err);
  }
};

export const getFrase = async (req, res, next) => {
  try {
    const frase = await fraseService.getFraseById(req.params.id);
    if (!frase) return res.status(404).json({ msg: 'No encontrada' });
    res.json(frase);
  } catch (err) {
    next(err);
  }
};

export const postFrase = async (req, res, next) => {
  try {
    const frase = await fraseService.createFrase(req.body);
    res.status(201).json(frase);
  } catch (err) {
    next(err);
  }
};

export const putFrase = async (req, res, next) => {
  try {
    const actualizada = await fraseService.updateFrase(req.params.id, req.body);
    if (!actualizada) return res.status(404).json({ msg: 'No encontrada' });
    res.json(actualizada);
  } catch (err) {
    next(err);
  }
};

export const deleteFrase = async (req, res, next) => {
  try {
    const eliminada = await fraseService.deleteFrase(req.params.id);
    if (!eliminada) return res.status(404).json({ msg: 'No encontrada' });
    res.json({ msg: 'Frase eliminada' });
  } catch (err) {
    next(err);
  }
};
