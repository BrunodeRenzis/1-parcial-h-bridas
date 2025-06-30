import express from 'express';
import {
  getFrases,
  getFrase,
  postFrase,
  putFrase,
  deleteFrase
} from '../controllers/frases.controller.js';

import { body } from 'express-validator';
import { validateFields } from '../middlewares/validate.middleware.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { validateWith } from '../middlewares/joi.middleware.js';
import { fraseSchema } from '../validations/schemas.js';
import { authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getFrases);
router.get('/:id', getFrase);

router.post(
  '/',
  authenticateJWT,
  authorizeRole(['superadmin']),
  validateWith(fraseSchema),
  [
    body('imageUrl').isURL(),
    body('frase').notEmpty(),
    body('autor').notEmpty(),
    body('season').isArray(),
  ],
  validateFields,
  postFrase
);

router.put('/:id', authenticateJWT, authorizeRole(['superadmin']), putFrase);
router.delete('/:id', authenticateJWT, authorizeRole(['superadmin']), deleteFrase);

export default router;
