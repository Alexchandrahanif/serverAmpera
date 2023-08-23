const categoryCompanyRouter = require("../app/V1/CategoryCompany/Routes/categoryCompanyRouter");
const CategoryMenuRouter = require("../app/V1/CategoryMenu/Routes/categoryMenuRouter");
const companyRouter = require("../app/V1/Company/Routes/companyRouter");
const customerRouter = require("../app/V1/Customer/Routes/customerRouter");
const menuRouter = require("../app/V1/Menu/Routes/menuRouter");
const orderRouter = require("../app/V1/Order/Routes/orderRouter");
const tableRouter = require("../app/V1/Table/Routes/tableRouter");
const userRouter = require("../app/V1/User/Routes/userRouter");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/customer", customerRouter);
router.use("/categoryCompany", categoryCompanyRouter);
router.use("/categoryMenu", CategoryMenuRouter);
router.use("/company", companyRouter);
router.use("/menu", menuRouter);
router.use("/order", orderRouter);
router.use("/table", tableRouter);

module.exports = router;
