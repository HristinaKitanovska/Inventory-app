const Category = require("../models/category");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
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
      const category = await Category.findById(req.params.id);
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
};
