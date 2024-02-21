const validateUserRegistration = (req, res, next) => {
  const { email, password, rol, lenguage } = req.body;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ code: 400, message: "El body de la solicitud está vacio." });
  }

  if (!email || !password || !rol || !lenguage) {
    return res.status(400).json({ code: 400, message: "Datos de registros incompletos." });
  }
  next();
};

module.exports = validateUserRegistration;
