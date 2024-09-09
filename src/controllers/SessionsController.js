const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Email ou senha invalido", 401);
    }

    const passwordComare = await compare(password, user.password);

    if (!passwordComare) {
      throw new AppError("Email ou senha invalido", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ user, token });
  }
}

module.exports = SessionsController;
