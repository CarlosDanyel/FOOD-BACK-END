const { Router } = require("express");
const IngredienteController = require("../controllers/IngredienteController");

const ingredienteRouter = Router();
const ingredienteController = new IngredienteController();

ingredienteRouter.get("/", ingredienteController.index);

module.exports = ingredienteRouter;
