const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const warehouseController = require("../Controller/WarehouseController");

// ROUTER PATH
router
  .route("/all")
  .get(warehouseController.getAllWarehouses)
  .post(warehouseController.createNewWarehouse);
router.route("/:warehouseID").get(warehouseController.getSpecificWarehouse);

module.exports = router;
