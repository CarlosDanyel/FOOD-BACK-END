const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload.js");

const PedidoController = require("../controllers/PedidoController");
const Autenticated = require("../middewares/Autenticated");
const PedidoUrlController = require("../controllers/PedidoUrlController.js");

const pedidoRouter = Router();
const pedidoController = new PedidoController();
const pedidoUrlController = new PedidoUrlController();

pedidoRouter.use(Autenticated);

const upload = multer(uploadConfig.MULTER);

pedidoRouter.post("/", pedidoController.create);
pedidoRouter.get("/:id", pedidoController.show);
pedidoRouter.get("/", pedidoController.index);
pedidoRouter.delete("/:id", pedidoController.delete);
pedidoRouter.put("/:id", pedidoController.update);
pedidoRouter.patch(
  "/:id/urlImg",
  upload.single("pedidoUrl"),
  pedidoUrlController.update
);

module.exports = pedidoRouter;
