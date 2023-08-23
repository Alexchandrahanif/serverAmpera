const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/orderController");

const orderRouter = require("express").Router();

orderRouter.get("/", authentication, Controller);

module.exports = orderRouter;
