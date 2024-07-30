const { Router } = require("express");
const IngredienteController = require("../controllers/IngredienteController");

const ingredienteRouter = Router();
const ingredienteController = new IngredienteController();

ingredienteRouter.post("/", ingredienteController.index);

module.exports = ingredienteRouter;
