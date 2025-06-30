import Joi from 'joi';

export const personajeSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  edad: Joi.number().integer().min(0).max(99).required(),
  tipo: Joi.string().valid('principal', 'secundario').required(),
  frases: Joi.array().items(Joi.string().hex().length(24))
});

export const fraseSchema = Joi.object({
  frase: Joi.string().min(5).max(300).required(),
  imageUrl: Joi.string().uri().required(),
  autor: Joi.string().hex().length(24).required(),
  season: Joi.array().items(Joi.number().integer().min(1)).min(1).required()
});

export const userRegisterSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid('superadmin', 'standard').optional()
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required()
});
