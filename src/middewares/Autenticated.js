const AppError = require("../utils/AppError");
const { verify } = require("jsonwebtoken");
const authConfig = require("../configs/auth");

const Autenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token ivalido", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    req.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError("Jwt Token Ivalidos", 401);
  }
};

module.exports = Autenticated;
