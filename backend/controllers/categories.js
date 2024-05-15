const Category = require("../models/category");

module.exports = {
  getAllCategories: async (req, res) => {
    const categories = await Category.find();
    res.send({
      error: false,
      message: "All categories from database",
      categories: categories,
    });
  },
  create: async (req, res) => {
    try {
      const category = await Category.create(req.body);

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
