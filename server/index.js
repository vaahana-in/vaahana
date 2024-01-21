const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.SERVER_PORT;
app.use(cors());

const bikeRoutes = require("./routes/bikeRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");

mongoose.connect(process.env.VAAHANA_MONGO_URL_LOCAL);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Use bike routes
app.use(bikeRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(requestRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
