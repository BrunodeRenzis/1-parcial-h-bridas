import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const createUser = async ({ nombre, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ nombre, email, password: hashedPassword, role: role || 'standard' });
  return await user.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const findUserById = async (id) => {
  return await User.findById(id);
}; 