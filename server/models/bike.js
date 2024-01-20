const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema(
  {
    ownerId: String, // ID of the owner/user who listed the motorbike
    brand: String,
    model: String,
    makeYear: String, // or number
    licensePlate: String,
    location: {
      latitude: Number,
      longitude: Number,
    },
    availability: Boolean, // Is the motorbike currently available for rent?
    pricePerMinute: Number, // Cost of renting the motorbike per hour
    description: String,
    image: String, // Array of image URLs
    features: [String], // Array of additional features or attributes
    rating: Number, // Average rating given by users who rented the motorbike
    verified: Boolean,
    reviews: [
      {
        userId: String, // ID of the user who left the review
        text: String,
        rating: Number, // Rating given by the user
        date: String, // Date of the review
      },
    ],
    rentalHistory: [
      {
        userId: String, // ID of the user who rented the motorbike
        startDate: String,
        endDate: String,
        totalCost: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bike", bikeSchema);
