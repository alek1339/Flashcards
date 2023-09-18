const express = require("express");
const app = express();
const PORT = process.env.PORT || 1000;
const connectToDatabase = require("./db");

const user = require("./routes/user");
const profile = require("./routes/profile");
const deck = require("./routes/deck");
const card = require("./routes/card");
const review = require("./routes/review");

const cors = require("cors");

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/user", user);
app.use("/profile", profile);
app.use("/deck", deck);
app.use("/card", card);
app.use("/review", review);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});