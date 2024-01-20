const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
app.use(cors());

const bikeRoutes = require("./routes/bikeRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());

// Use bike routes
app.use(bikeRoutes);
app.use(authRoutes);
app.use(userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port`);
});
