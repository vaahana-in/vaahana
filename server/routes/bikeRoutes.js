const express = require("express");
const bikeController = require("../controllers/bikeControllers");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Routes for bike-related operations

// Create a bike
router.post("/bike", authenticateToken, bikeController.createBike);

// Read all bikes
router.get("/bike", bikeController.getAllBikes);

// Read a specific bike by ID
router.get("/bike/:id", bikeController.getBikeById);

// Update a bike by ID
router.patch("/bike/:id", bikeController.updateBikeById);

// Delete a bike by ID
router.delete("/bike/:id", bikeController.deleteBikeById);

module.exports = router;
