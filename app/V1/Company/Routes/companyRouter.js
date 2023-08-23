const authentication = require("../../../../middleware/authentication");
const Controller = require("../Controllers/companyController");

const companyRouter = require("express").Router();

companyRouter.get("/", authentication, Controller);

module.exports = companyRouter;
