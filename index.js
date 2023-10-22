const express = require("express");
const app = express();
const cors = require("cors");
const InventoryRoutes = require("./routes/InventoryRoutes.js");
const WarehouseRoutes = require("./routes/WarehouseRoutes.js");

//configuration
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Route Handlers
app.use("/inventory", InventoryRoutes);
app.use("/warehouse", WarehouseRoutes);

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}...`);
});
