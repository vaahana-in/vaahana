const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    bikeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bike",
    },
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    from: String,
    to: String,
    approval: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
