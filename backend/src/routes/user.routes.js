import express from 'express';
import { register, login } from '../controllers/user.controller.js';
import { validateWith } from '../middlewares/joi.middleware.js';
import { userRegisterSchema, userLoginSchema } from '../validations/schemas.js';

const router = express.Router();

router.post('/register', validateWith(userRegisterSchema), register);
router.post('/login', validateWith(userLoginSchema), login);

export default router; 