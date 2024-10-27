const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema(
  {
    invoiceName: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
    },
    order: {
      type: String,
    },
    orderTotalPrice: {
      type: String,
    },
    orderQuantity: {
      type: String,
    },
    supplier: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("invoice", invoiceSchema);
