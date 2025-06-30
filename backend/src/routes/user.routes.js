import express from 'express';
import { register, login, me } from '../controllers/user.controller.js';
import { validateWith } from '../middlewares/joi.middleware.js';
import { userRegisterSchema, userLoginSchema } from '../validations/schemas.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', validateWith(userRegisterSchema), register);
router.post('/login', validateWith(userLoginSchema), login);
router.get('/me', authenticateJWT, me);

export default router; 