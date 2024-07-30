const { Router } = require("express");

const usersRoutes = require("./user.routes");
const pedidoRoutes = require("./pedido.routes");
const ingredienteRoutes = require("./ingredientes.routes");
const sessionRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/pedidos", pedidoRoutes);
routes.use("/ingrediente", ingredienteRoutes);
routes.use("/session", sessionRoutes);

module.exports = routes;
