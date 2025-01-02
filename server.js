require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const connectDB = require("./config/db");
const userRoutes = require("./routes/indRoutes");


const app = express();

// Middleware
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: "*", // Replace '*' with specific origins if needed for security
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions)); // Apply the CORS middleware

// Routes
app.use("/api/users", userRoutes);


// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
