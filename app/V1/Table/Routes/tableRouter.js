const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/tableController");

const tableRouter = require("express").Router();

tableRouter.get("/", authentication, Controller.getAll);
tableRouter.get("/:id", authentication, Controller.getOne);
tableRouter.post("/", authentication, Controller.create);
tableRouter.patch("/:id", authentication, Controller.create);
tableRouter.delete("/:id", authentication, Controller.delete);
tableRouter.post("/login/:token", authentication, Controller.loginTable);

module.exports = tableRouter;
