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

export const me = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
    res.json({ _id: user._id, nombre: user.nombre, email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
}; 

export const listUsers = async (_req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ msg: 'Usuario no encontrado' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Usuario no encontrado' });
    res.json({ msg: 'Usuario eliminado' });
  } catch (err) {
    next(err);
  }
};