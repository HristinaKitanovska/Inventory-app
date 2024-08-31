const Supplier = require("../models/supplier");

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
  getSupplierById: async (req, res) => {
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
  createSupplier: async (req, res) => {
    try {
      const { name, address, phone, email } = req.body;
      const supplier = new Supplier({ name, address, phone, email });
      await supplier.save();
      res.send({
        error: false,
        message: "New supplier has been created",
        supplier: supplier,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error creating supplier",
        errorDetails: error.message,
      });
    }
  },
  updateSupplier: async (req, res) => {
    try {
      const updatedSupplier = await Supplier.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!updatedSupplier) {
        return res.status(404).send({
          error: true,
          message: `Supplier with id #${req.params.id} not found`,
        });
      }
      res.send({
        error: false,
        message: `Supplier with id #${req.params.id} has been updated`,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error updating supplier",
        errorDetails: error.message,
      });
    }
  },
  deleteSupplier: async (req, res) => {
    try {
      const supplier = await Supplier.findByIdAndDelete(req.params.id);

      if (!supplier) {
        return res.status(404).send({
          error: true,
          message: `Supplier with id #${req.params.id} not found`,
        });
      }

      res.send({
        error: false,
        message: `Supplier with id #${req.params.id} has been deleted`,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error deleting supplier",
        errorDetails: error.message,
      });
    }
  },
};
