const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/categoryMenuController");

const CategoryMenuRouter = require("express").Router();

CategoryMenuRouter.get("/", authentication, Controller.getAll);
CategoryMenuRouter.get("/:id", authentication, Controller.getAll);
CategoryMenuRouter.post("/", authentication, Controller.create);
CategoryMenuRouter.patch("/:id", authentication, Controller.update);
CategoryMenuRouter.delete("/:id", authentication, Controller.delete);

module.exports = CategoryMenuRouter;
