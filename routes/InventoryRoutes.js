const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const inventoryController = require("../Controller/InventoryController");

// Get a list of All Inventories
router.route("/all").get(inventoryController.getAllInventories);

module.exports = router;
