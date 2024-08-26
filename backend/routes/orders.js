var express = require("express");
var router = express.Router();
const controller = require("../controllers/orders");

router
  .get("/", controller.getAllOrders)
  .get("/:id", controller.getOrderById)
  .post("/:id", controller.createOrder) // in this url we send the id of the Item
  .get("/item/:id", controller.getTotalPriceForItem) // in this url we send the id of the Item (we use this to find total price from all orders for the item)
  .get("/category/:id", controller.getTotalPriceForcategory); // in this url we send the id of the Category (we use this to find total price from all orders for item in category)
module.exports = router;
