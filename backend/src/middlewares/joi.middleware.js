export const validateWith = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          msg: 'Error de validación',
          detalles: error.details.map(d => d.message)
        });
      }
      next();
    };
  };
  