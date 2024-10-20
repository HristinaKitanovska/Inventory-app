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
  getOrdersByItemId: async (req, res) => {
    const itemId = req.params.id;

    try {
      const orders = await Order.find({ item: itemId });
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
  getTotalPriceForItem: async (req, res) => {
    try {
      const itemId = req.params.id;

      // Find all orders that reference the item
      const orders = await Order.find({ item: itemId });

      // Calculate the total price
      const totalPrice = orders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
      );
      const totalOrders = orders.length; // Count of orders

      res.status(200).json({
        error: false,
        message: `Total price for item with id #${itemId} calculated successfully`,
        totalPrice,
        totalOrders,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: "Error retrieving orders",
        errorDetails: error.message,
      });
    }
  },
  getTotalPriceForcategory: async (req, res) => {
    try {
      const categoryId = req.params.id;

      // Find all items in the category
      const items = await Item.find({ category: categoryId });

      let totalPrice = 0;

      // Loop through each item to calculate the total price of all orders
      for (const item of items) {
        const orders = await Order.find({ item: item._id });
        totalPrice += orders.reduce((sum, order) => sum + order.totalPrice, 0);
      }
      res.status(200).json({
        error: false,
        message: `Total price for category with id #${categoryId} calculated successfully`,
        totalPrice,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: "Error calculating total price",
        errorDetails: error.message,
      });
    }
  },
  getTotalCostOfAllOrders: async (req, res) => {
    try {
      const items = await Item.find();

      let totalCost = 0;

      // Loop through all items and calculate the total price of all their orders
      for (const item of items) {
        const orders = await Order.find({ item: item._id });
        totalCost += orders.reduce((sum, order) => sum + order.totalPrice, 0);
      }

      res.status(200).json({
        error: false,
        message: "Total cost of all orders calculated successfully",
        totalCost,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: "Error calculating total cost of all orders",
        errorDetails: error.message,
      });
    }
  },
  getRecentOrders: async (req, res) => {
    try {
      const recentOrders = await Order.find()
        .sort({ createdAt: -1 }) // Sort by creation date, newest first
        .limit(8) // Limit to 8 recent orders
        .populate("item", "name image");

      res.status(200).json({
        error: false,
        message: "Recent orders fetched successfully",
        recentOrders,
      });
    } catch (error) {
      console.error("Error fetching recent orders:", error);
      res.status(500).json({
        error: true,
        message: "Error fetching recent orders",
        errorDetails: error.message,
      });
    }
  },
};
