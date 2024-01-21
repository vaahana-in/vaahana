const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    bikeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bike",
    },
    requesterId: String,
    from: String,
    to: String,
    approval: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
