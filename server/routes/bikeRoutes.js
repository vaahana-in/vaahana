const express = require("express");
const bikeController = require("../controllers/bikeControllers");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Routes for bike-related operations

// Create a bike
router.post("/bike", authenticateToken, bikeController.createBike);

router.get("/bike", authenticateToken, bikeController.getAllBikes);

// Read all bikes
router.get("/bike/owner", authenticateToken, bikeController.getBikesByOwner);

// Read a specific bike by ID
router.get("/bike/:id", authenticateToken, bikeController.getBikeById);

// Update a bike by ID
router.patch("/bike/:id", authenticateToken, bikeController.updateBikeById);

// Delete a bike by ID
router.delete("/bike/:id", authenticateToken, bikeController.deleteBikeById);

module.exports = router;
