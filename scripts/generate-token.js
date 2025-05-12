import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const token = jwt.sign(
  {
    userId: 'admin123',
    role: 'admin'
  },
  process.env.JWT_SECRET,
  { expiresIn: '2h' }
);

console.log('Tu token JWT:');
console.log(token);
