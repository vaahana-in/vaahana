const Request = require("../models/request");

exports.createRequest = async (req, res) => {
  try {
    const existingRequest = Request.findOne({ requesterId: req.user.userId });
    if (reqExists) {
      res.json({ message: "Request exists", existingRequest });
    } else {
      const request = new Request({
        ...req.body,
        requesterId: req.user.userId,
      });
      await request.save();
      res.status(201).json({ request, success: true });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRequestsByOwner = async (req, res) => {
  try {
    const requests = await Request.find({ ownerId: req.user.userId });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRequestsByBike = async (req, res) => {
  try {
    const requests = await Request.find({ bikeId: req.params.id }).populate({
      path: "bikeId",
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRequestsByRider = async (req, res) => {
  try {
    const request = await Request.findOne({
      requesterId: req.user.userId,
    }).populate({
      path: "bikeId",
    });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRequestById = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRequestById = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (request) {
      res.json({ message: "Request deleted" });
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
