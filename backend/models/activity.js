const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["moved", "deleted", "created"],
      default: "created",
    },
    item: {
      type: mongoose.Types.ObjectId,
      ref: "item",
    },
    itemName: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("activity", activitySchema);
