const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/orderController");

const orderRouter = require("express").Router();

orderRouter.get("/", authentication, Controller.getAll);
orderRouter.get(
  "/Customer/:cusomerName",
  authentication,
  Controller.getAllByCustomerName
);
orderRouter.get("/:id", authentication, Controller.getOne);
orderRouter.post("/", authentication, Controller.create);
orderRouter.patch("/:id", authentication, Controller.update);
orderRouter.delete("/:id", authentication, Controller.delete);

module.exports = orderRouter;
