const Bike = require("../models/bike");

// Controller for handling bike-related operations

// Create a bike
exports.createBike = async (req, res) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.status(201).json(bike);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all bikes
exports.getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read a specific bike by ID
exports.getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (bike) {
      res.json(bike);
    } else {
      res.status(404).json({ message: "Bike not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a bike by ID
exports.updateBikeById = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (bike) {
      res.json(bike);
    } else {
      res.status(404).json({ message: "Bike not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a bike by ID
exports.deleteBikeById = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (bike) {
      res.json({ message: "Bike deleted" });
    } else {
      res.status(404).json({ message: "Bike not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
