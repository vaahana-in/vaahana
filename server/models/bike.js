const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema(
  {
    ownerName: String,
    regNumber: String,
    bikeName: String,
    bikeModel: String,
    ownershipDocument: String,
    ownerIdPhoto: String,
    ownerMobile: String,
    chargesPerMin: Number,
    bikePhoto1: String,
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bike", bikeSchema);
