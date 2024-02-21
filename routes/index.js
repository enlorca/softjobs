const express = require("express");
const router = express.Router();
const loggerMiddleware = require("../middlewares/logger");
const validateUserRegistration = require("../middlewares/validateUserRegistration");
const validateUserLogin = require("../middlewares/validateUserLogin");
const verifyToken = require("../middlewares/verifyToken");

const {
  registerUser,
  loginUser,
  getUserData,
} = require("../controllers/usuariosController");

router.use(loggerMiddleware);

// Registro
router.post("/usuarios", validateUserRegistration, registerUser);

// Login
router.post("/login", validateUserLogin, loginUser);

// GET /usuarios
router.get("/usuarios", verifyToken, getUserData);

// Ruta indefinida
router.use("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

module.exports = router;
