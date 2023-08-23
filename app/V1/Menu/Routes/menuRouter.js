const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/menuController");

const menuRouter = require("express").Router();

menuRouter.get("/", authentication, Controller);

module.exports = menuRouter;
