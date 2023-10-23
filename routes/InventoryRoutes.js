const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const inventoryController = require("../Controller/InventoryController");

// ROUTER PATH
router
  .route("/all")
  .get(inventoryController.getAllInventories)
  .post(inventoryController.createNewInventory);
router
  .route("/:inventoryID")
  .get(inventoryController.getSpecificInventory)
  .put(inventoryController.editSpecificInventory)
  .delete(inventoryController.deleteSpecificInventory);

module.exports = router;
