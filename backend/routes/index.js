const router = require("express").Router();
const orderRouter = require("./order.routes");

router.use("/order", orderRouter);

module.exports = router;
