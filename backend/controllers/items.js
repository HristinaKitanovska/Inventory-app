const Item = require("../models/item");
const Category = require("../models/category");
const Order = require("../models/order");
const Activity = require("../models/activity");

module.exports = {
  getAll: async (req, res) => {
    const items = await Item.find()
      .populate("category", "name")
      .populate({
        path: "orders",
        populate: {
          path: "supplier",
          select: "name",
        },
      });
    res.send({
      error: false,
      message: "All items from database",
      items: items,
    });
  },
  getById: async (req, res) => {
    const item = await Item.findById(req.params.id)
      .populate("category", "name")
      .populate({
        path: "orders",
        populate: {
          path: "supplier",
          select: "name",
        },
      });
    res.send({
      error: false,
      message: `Item with id #${item._id}, has been fetched`,
      item: item,
    });
  },
  getByCategory: async (req, res) => {
    try {
      const category = req.params.category;
      const items = await Item.find({ category: category });
      if (items.length > 0) {
        res.send({
          error: false,
          message: `Items for the category ${req.params.category}`,
          items: items,
        });
      } else {
        res.send({
          error: true,
          message: `There are no items from category #${req.params.category} `,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `The fetch for the items by category ${req.params.category}  failed`,
        errorDetails: error.message,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { name, categoryId } = req.body;
      const image = req.file ? req.file.path : null;

      const newItem = new Item({ name, image, category: categoryId });
      await newItem.save();

      await Category.findByIdAndUpdate(categoryId, {
        $push: { items: newItem._id },
      });

      const activity = await Activity.create({
        action: "created",
        item: newItem._id,
        itemName: newItem.name,
        category: categoryId,
        user: req.user.userId,
      });

      res.send({
        error: false,
        message: "New item has been created",
        item: newItem,
        activity: activity,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error creating item",
        errorDetails: error.message,
      });
    }
  },
  updateItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const image = req.file ? req.file.path : null;

      // Find the item by ID
      const item = await Item.findById(id);

      if (!item) {
        return res.status(404).send({
          error: true,
          message: `Item with id #${id} not found`,
        });
      }

      // Update the item name if provided
      if (name) {
        item.name = name;
      }

      // Update the image if a new one is provided
      if (image) {
        item.image = image;
      }

      // Save the updated item
      await item.save();

      res.send({
        error: false,
        message: `Item with id #${id} has been updated`,
        item,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error updating item",
        errorDetails: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);

      if (!item) {
        return res.status(404).send({
          error: true,
          message: `Item with id #${req.params.id} not found`,
        });
      }

      // Delete all orders associated with this item
      await Order.deleteMany({ _id: { $in: item.orders } });

      const activity = new Activity({
        action: "deleted",
        user: req.user.userId,
        category: item.category._id,
        item: item._id,
        itemName: item.name,
      });
      await activity.save();

      // Delete the item itself
      await Item.findByIdAndDelete(req.params.id);

      res.send({
        error: false,
        message: `Item with id #${req.params.id} has been deleted`,
        activity: activity,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error deleting item",
        errorDetails: error.message,
      });
    }
  },
};
