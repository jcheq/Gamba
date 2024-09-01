const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();
const userRoutes = require("../server/routes/User"); // Import routes
const inventoryRoute = require("../server/routes/CardInventory"); // Import routes
const discordProfile = require("../server/routes/discordProfile");

// dotenv.config();

const app = express();
const port = 3000;

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client"))); // Serve static files from frontend folder

// Routes
app.use("/api/user", userRoutes); // API routes
app.use("/api/inventory", inventoryRoute); // API routes
app.use("/api/discordProfile", discordProfile);

// Serve HTML files
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// });

//only do this if u want to send custom url
app.get("/inventory/:userId", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// app.get("/discordProfile/:userId", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

app.use("/", (req, res) => {
  res.send("Running...");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
