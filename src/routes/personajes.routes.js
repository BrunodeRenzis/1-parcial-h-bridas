import express from 'express';
import {
  getPersonajes,
  getPersonajeById,
  postPersonaje,
  putPersonaje,
  deletePersonaje
} from '../controllers/personajes.controller.js';

import { body } from 'express-validator';
import { validateFields } from '../middlewares/validate.middleware.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { validateWith } from '../middlewares/joi.middleware.js';
import { personajeSchema } from '../validations/schemas.js';

const router = express.Router();

router.get('/', getPersonajes);
router.get('/:id', getPersonajeById);

router.post(
  '/',
  authenticateJWT,
  validateWith(personajeSchema),
  [
    body('id').isUUID(),
    body('nombre').notEmpty(),
    body('edad').isNumeric(),
    body('tipo').isIn(['principal', 'secundario']),
  ],
  validateFields,
  postPersonaje
);

router.put(
  '/:id',
  authenticateJWT,
  [
    body('nombre').optional().notEmpty(),
    body('edad').optional().isNumeric(),
    body('tipo').optional().isIn(['principal', 'secundario']),
  ],
  validateFields,
  putPersonaje
);

router.delete('/:id', authenticateJWT, deletePersonaje);

export default router;
