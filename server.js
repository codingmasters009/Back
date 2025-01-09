require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const connectDB = require("./config/db");
const indivitualRoutes = require("./routes/indRoutes");
const bussinesRoutes = require("./routes/businessRoutes");
const investorRoutes = require("./routes/investorRoutes"); 
const salespartnerRoutes = require("./routes/salespartnerRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use("/api/indivitual", indivitualRoutes);
app.use("/api/bussines", bussinesRoutes);
app.use("/api/investors",investorRoutes);
app.use("/api/salespartner",salespartnerRoutes);

// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
