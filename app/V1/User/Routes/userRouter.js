const userRouter = require("express").Router();

const upload = require("../../../../helper/multer");
const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/UserController");

const file = upload();

userRouter.post("/register", file.single("photoUser"), Controller.registerUser);
userRouter.post("/login", Controller.loginUser);
userRouter.get("/", authentication, Controller.getAllUser);
userRouter.get("/:id", authentication, Controller.getOneUsers);
userRouter.patch(
  "/:id",
  file.single("photoUser"),
  authentication,
  Controller.updateUser
);
userRouter.delete("/:id", authentication, Controller.deleteUser);

module.exports = userRouter;
