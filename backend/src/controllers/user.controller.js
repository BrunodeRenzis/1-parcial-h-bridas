import * as userService from '../services/user.service.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const { nombre, email, password, role } = req.body;
    const existing = await userService.findUserByEmail(email);
    if (existing) return res.status(409).json({ msg: 'Email ya registrado' });
    const user = await userService.createUser({ nombre, email, password, role });
    res.status(201).json({ _id: user._id, nombre: user.nombre, email: user.email });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) return res.status(401).json({ msg: 'Credenciales inválidas' });
    const valid = await userService.validatePassword(password, user.password);
    if (!valid) return res.status(401).json({ msg: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { _id: user._id, nombre: user.nombre, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}; 