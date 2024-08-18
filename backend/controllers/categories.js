const Category = require("../models/category");
const Item = require("../models/item");
const Order = require("../models/order");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find().populate("items", "name");
      res.send({
        error: false,
        message: "All categories from database",
        categories: categories,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error fetching categories",
        errorDetails: error.message,
      });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id).populate("items");
      res.send({
        error: false,
        message: "Category details",
        category: category,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error fetching category",
        errorDetails: error.message,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const image = req.file ? req.file.path : null;

      const category = new Category({ name, image });
      await category.save();

      res.send({
        error: false,
        message: "New category has been created",
        category: category,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error creating new category",
        errorDetails: error.message,
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;

      // Find the category by ID
      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).send({
          error: true,
          message: "Category not found",
        });
      }

      // Get all items associated with this category
      const items = await Item.find({ category: categoryId });

      // Delete all orders associated with each item
      for (const item of items) {
        await Order.deleteMany({ _id: { $in: item.orders } });
      }

      // Delete all items associated with this category
      await Item.deleteMany({ category: categoryId });

      // Delete the category itself
      await Category.findByIdAndDelete(categoryId);

      res.send({
        error: false,
        message: "Category, associated items, and orders have been deleted",
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error deleting category",
        errorDetails: error.message,
      });
    }
  },
};
