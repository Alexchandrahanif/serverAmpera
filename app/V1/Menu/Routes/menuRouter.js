const upload = require("../../../../helper/multer");
const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/menuController");

const menuRouter = require("express").Router();

const file = upload();

menuRouter.get("/", authentication, Controller.getAll);
menuRouter.get(
  "/Company/:CompanyId",
  authentication,
  Controller.getAllByCompanyId
);
menuRouter.get("/:id", authentication, Controller.getOne);
menuRouter.post(
  "/",
  authentication,
  file.single("photoMenu"),
  Controller.create
);
menuRouter.patch(
  "/:id",
  authentication,
  file.single("photoMenu"),
  Controller.update
);
menuRouter.delete("/:id", authentication, Controller.delete);

module.exports = menuRouter;
