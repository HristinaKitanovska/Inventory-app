const Supplier = require("../models/category");

module.exports = {
  getAllSuppliers: async (req, res) => {
    try {
      const suppliers = await Supplier.find();
      res.send({
        error: false,
        message: "All suppliers from database",
        suppliers: suppliers,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error fetching categories",
        errorDetails: error.message,
      });
    }
  },
};
