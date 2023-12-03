const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

async function connectToMongo() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    process.exit(1);
  }
}

app.get("/", (res) => {
  res.send(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
