const { Router } = require("express");

const userRoutes = Router();

const UserController = require("../controllers/UserController.js");
const userController = new UserController();

userRoutes.post("/", userController.create);
