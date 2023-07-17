const router = require("express").Router();
const {
  Order: { bulkCreate, getOrders },
} = require("../controller/index");

router.post("/", bulkCreate).get("/", getOrders);

module.exports = router;
