const upload = require("../../../../helper/multer");
const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/menuController");

const menuRouter = require("express").Router();

const file = upload();

menuRouter.get("/", authentication, Controller.getAll);
menuRouter.get("/", authentication, Controller.getOne);
menuRouter.get(
  "/",
  authentication,
  file.single("photoMenu"),
  Controller.create
);
menuRouter.get(
  "/",
  authentication,
  file.single("photoMenu"),
  Controller.update
);
menuRouter.get("/", authentication, Controller.delete);

module.exports = menuRouter;
