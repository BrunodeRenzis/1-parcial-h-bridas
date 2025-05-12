import express from 'express';
import {
  getFrases, getFrase, postFrase, putFrase, deleteFrase
} from '../controllers/frases.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { validateFields } from '../middlewares/validate.middleware.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', getFrases);
router.get('/:id', getFrase);

router.post(
  '/',
  authenticateJWT,
  [
    body('id').isUUID(),
    body('imageUrl').isURL(),
    body('frase').notEmpty(),
    body('autor').notEmpty(),
    body('season').isArray(),
  ],
  validateFields,
  postFrase
);

router.put('/:id', authenticateJWT, putFrase);
router.delete('/:id', authenticateJWT, deleteFrase);

export default router;
