const { Router } = require("express");

const UserController = require("../controllers/UserController.js");
const Autenticated = require("../middewares/Autenticated.js");

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.put("/", Autenticated, userController.update);

module.exports = userRoutes;
