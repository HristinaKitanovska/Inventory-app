const Order = require("../models/order");
const Item = require("../models/item");

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.send({
        error: false,
        message: "All orders from database",
        orders: orders,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error fetching orders",
        errorDetails: error.message,
      });
    }
  },
  getOrderById: async (req, res) => {},
  createOrder: async (req, res) => {
    try {
      const { supplier, quantity, totalPrice } = req.body;
      // to create the order put the id of the item in the url, orders/:id
      const itemId = req.params.id;
      const item = await Item.findById(itemId);

      const newOrder = await Order.create({
        item: item._id,
        supplier,
        quantity,
        totalPrice,
      });

      await newOrder.save();

      await Item.findByIdAndUpdate(item._id, {
        $push: { orders: newOrder._id },
      });

      res.send({
        error: false,
        message: "New order has been created",
        order: newOrder,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error creating order",
        errorDetails: error.message,
      });
    }
  },
};
