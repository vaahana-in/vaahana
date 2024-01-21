const express = require("express");
const requestController = require("../controllers/requestController");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Routes for bike-related operations

// Create a bike
router.post("/request", authenticateToken, requestController.createRequest);

router.get("/request", authenticateToken, requestController.getAllRequests);

router.get(
  "/request/rider",
  authenticateToken,
  requestController.getRequestsByRider
);

// Read all bikes
router.get(
  "/request/owner",
  authenticateToken,
  requestController.getRequestsByOwner
);

// Update a bike by ID
router.patch(
  "/request/:id",
  authenticateToken,
  requestController.updateRequestById
);

// Delete a bike by ID
router.delete(
  "/bike/:id",
  authenticateToken,
  requestController.deleteRequestById
);

module.exports = router;
