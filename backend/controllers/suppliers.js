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
  GetSupplierById: async (req, res) => {
    try {
      const supplier = await Supplier.findById(req.params.id);
      res.send({
        error: false,
        message: "Supplier details",
        supplier: supplier,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error fetching supplier",
        errorDetails: error.message,
      });
    }
  },
};
