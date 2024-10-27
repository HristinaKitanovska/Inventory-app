const Invoice = require("../models/invoice");

module.exports = {
  getInvoicesCount: async (req, res) => {
    try {
      const count = await Invoice.countDocuments(); // Count all invoices
      res.json({ count });
    } catch (error) {
      console.error("Error fetching invoice count:", error);
      res.status(500).json({ error: "Failed to fetch invoice count" });
    }
  },
  createInvoice: async (req, res) => {
    const {
      invoiceName,
      order,
      orderTotalPrice,
      orderQuantity,
      supplier,
      date,
      itemName,
    } = req.body;

    try {
      const invoice = new Invoice({
        invoiceName,
        itemName,
        order,
        orderTotalPrice,
        orderQuantity,
        supplier,
        date,
      });
      await invoice.save();

      res
        .status(201)
        .json({ message: "Invoice created successfully", invoice });
    } catch (error) {
      console.error("Error creating invoice:", error);
      res.status(500).json({ error: "Failed to create invoice" });
    }
  },
};
