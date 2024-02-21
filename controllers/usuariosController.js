const bcrypt = require("bcrypt");
const pool = require("../db/index");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Registro
const registerUser = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ code: 400, message: "Un usuario con este correo ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)",
      [email, hashedPassword, rol, lenguage]
    );

    res.status(201).json({ message: "Usuario registrado correctamente." });
  } catch (error) {
    console.error("Error durante registro de usuario:", error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json({ code: 401, message: "Email o contraseña invalidos." });
    }
    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!isValidPassword) {
      return res.status(401).json({ code: 401, message: "Email o contraseña invalidos." });
    }
    const token = jwt.sign({ email: user.rows[0].email }, jwtSecret);

    res.json({ token });
  } catch (error) {
    console.error("Error durante login de usuario:", error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

// Get user data
const getUserData = async (req, res) => {
  try {
    const userEmail = req.userEmail;

    const userData = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [userEmail]
    );

    if (userData.rows.length === 0) {
      return res.status(404).json({ code: 404, message: "Usuario no encontrado." });
    }

    return res.status(200).json(userData.rows[0]);
  } catch (error) {
    console.error("Error al recuperar los datos del usuario:", error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser, getUserData };
