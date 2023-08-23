const authentication = require("../../../../middleware/authentication");

const Controller = require("../Controllers/categoryCompanyController");

const categoryCompanyRouter = require("express").Router();

categoryCompanyRouter.get("/", authentication, Controller);

module.exports = categoryCompanyRouter;
