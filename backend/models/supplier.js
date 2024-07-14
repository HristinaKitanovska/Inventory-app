const mongoose = require("mongoose");
const validator = require("validator");

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: validator.isEmail,
  },
});

module.exports = mongoose.model("supplier", supplierSchema);
