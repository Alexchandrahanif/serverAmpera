const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/tableController");

const tableRouter = require("express").Router();

tableRouter.get("/", authentication, Controller);

module.exports = tableRouter;
