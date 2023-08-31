const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/customerController");

const customerRouter = require("express").Router();

customerRouter.get("/", authentication, Controller.getAll);
customerRouter.get(
  "/Company/:CompanyId",
  authentication,
  Controller.getAllByCompanyId
);
customerRouter.get("/:id", authentication, Controller.getOne);
customerRouter.post("/", authentication, Controller.create);
customerRouter.patch("/:id", authentication, Controller.update);
customerRouter.delete("/:id", authentication, Controller.delete);

module.exports = customerRouter;
