const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/categoryMenuController");

const CategoryMenuRouter = require("express").Router();

CategoryMenuRouter.get("/", authentication, Controller);
module.exports = CategoryMenuRouter;
