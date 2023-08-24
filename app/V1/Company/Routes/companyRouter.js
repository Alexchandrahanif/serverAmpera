const upload = require("../../../../helper/multer");
const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/companyController");

const companyRouter = require("express").Router();

const file = upload();

companyRouter.get("/", authentication, Controller.getAll);
companyRouter.get("/:id", authentication, Controller.getOne);
companyRouter.post(
  "/",
  file.single("companyLogo"),
  authentication,
  Controller.create
);
companyRouter.patch(
  "/",
  file.single("companyLogo"),
  authentication,
  Controller.update
);
companyRouter.delete("/", authentication, Controller.delete);

module.exports = companyRouter;
