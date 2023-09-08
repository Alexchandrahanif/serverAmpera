const CategoryMenuRouter = require("../app/V1/CategoryMenu/Routes/categoryMenuRouter");
const companyRouter = require("../app/V1/Company/Routes/companyRouter");
const menuRouter = require("../app/V1/Menu/Routes/menuRouter");
const orderRouter = require("../app/V1/Order/Routes/orderRouter");
const tableRouter = require("../app/V1/Table/Routes/tableRouter");
const userRouter = require("../app/V1/User/Routes/userRouter");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/categoryMenu", CategoryMenuRouter);
router.use("/menu", menuRouter);
router.use("/order", orderRouter);
router.use("/table", tableRouter);

module.exports = router;
