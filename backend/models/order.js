const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    item: {
      ref: "item",
      type: mongoose.Types.ObjectId,
    },
    supplier: {
      ref: "supplier",
      type: mongoose.Types.ObjectId,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
