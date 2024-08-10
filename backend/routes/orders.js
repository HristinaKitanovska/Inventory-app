var express = require("express");
var router = express.Router();
const controller = require("../controllers/orders");

router
  .get("/", controller.getAllOrders)
  .get("/:id", controller.getOrderById)
  .post("/:id", controller.createOrder); // in this url we send the id of the Item
module.exports = router;
