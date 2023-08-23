const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/customerController");

const customerRouter = require("express").Router();

customerRouter.get("/", authentication, Controller);

module.exports = customerRouter;
