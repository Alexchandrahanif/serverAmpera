const authentication = require("../../../../middleware/authentication");

const Controller = require("../Controllers/categoryCompanyController");

const categoryCompanyRouter = require("express").Router();

categoryCompanyRouter.get("/", authentication, Controller.getAll);
categoryCompanyRouter.get("/:id", authentication, Controller.getOne);
categoryCompanyRouter.post("/", authentication, Controller.create);
categoryCompanyRouter.patch("/:id", authentication, Controller.update);
categoryCompanyRouter.delete("/:id", authentication, Controller.delete);

module.exports = categoryCompanyRouter;
