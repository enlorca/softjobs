const validateUserLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ code: 400, message: "El body de la solicitud está vacio." });
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ code: 400, message: "Email y contraseña son requeridos." });
    }

    next();
  } catch (error) {
    console.error("Error durante validación de login del usuario:", error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

module.exports = validateUserLogin;
