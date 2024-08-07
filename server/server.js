const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
// const itemRoutes = require('./routes/itemRoutes'); // Import routes

dotenv.config();

const app = express();
const port = 3000;

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client'))); // Serve static files from frontend folder

// Routes
// app.use('/api/items', itemRoutes); // API routes

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
