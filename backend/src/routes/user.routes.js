import express from 'express';
import { register, login, me, listUsers, updateUser, deleteUser } from '../controllers/user.controller.js';
import { validateWith } from '../middlewares/joi.middleware.js';
import { userRegisterSchema, userLoginSchema, userUpdateSchema } from '../validations/schemas.js';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', validateWith(userRegisterSchema), register);
router.post('/login', validateWith(userLoginSchema), login);
router.get('/me', authenticateJWT, me);
router.get('/', authenticateJWT, authorizeRole(['superadmin', 'admin']), listUsers);
router.put('/:id', authenticateJWT, authorizeRole(['superadmin']), validateWith(userUpdateSchema), updateUser);
router.delete('/:id', authenticateJWT, authorizeRole(['superadmin']), deleteUser);

export default router; 