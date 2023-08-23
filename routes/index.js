const customerRouter = require("../app/V1/Customer/Routes/customerRouter");
const userRouter = require("../app/V1/User/Routes/userRouter");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/customer", customerRouter);

module.exports = router;
