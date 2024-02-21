const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ code: 401, message: "No se proporcionó ningún token." });
    }

    const decodedToken = jwt.verify(token, jwtSecret);
    req.userEmail = decodedToken.email;
    next();
  } catch (error) {
    console.error("Error verificando token:", error);
    return res.status(401).json({ code: 401, message: "Token invalido." });
  }
};

module.exports = verifyToken;
