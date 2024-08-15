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
      const { supplier, quantity, totalPrice, date } = req.body;
      // to create the order put the id of the item in the url, orders/:id
      const itemId = req.params.id;
      const item = await Item.findById(itemId);

      // Use current date if no date is provided
      const orderDate = date || new Date();

      const newOrder = await Order.create({
        item: item._id,
        supplier,
        quantity,
        totalPrice,
        date: orderDate,
      });

      await newOrder.save();

      await Item.findByIdAndUpdate(item._id, {
        $push: { orders: newOrder._id },
      });

      // Populate the supplier field
      const populatedOrder = await newOrder.populate("supplier");

      res.send({
        error: false,
        message: "New order has been created",
        order: populatedOrder,
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
