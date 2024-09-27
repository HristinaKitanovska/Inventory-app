var express = require("express");
var router = express.Router();
const controller = require("../controllers/orders");
const authMiddleware = require("../middleware/authMiddleware");

router
  .get("/", authMiddleware, controller.getAllOrders)
  .get("/invoice/:id", authMiddleware, controller.getOrdersByItemId) // we send the id of item, to recieve the orders related to the item
  .post("/:id", authMiddleware, controller.createOrder) // in this url we send the id of the Item
  .get("/item/:id", authMiddleware, controller.getTotalPriceForItem) // in this url we send the id of the Item (we use this to find total price from all orders for the item)
  .get("/category/:id", authMiddleware, controller.getTotalPriceForcategory) // in this url we send the id of the Category (we use this to find total price from all orders for item in category)
  .get("/total-cost", authMiddleware, controller.getTotalCostOfAllOrders);
module.exports = router;
