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
router
  .route("/:warehouseID")
  .get(warehouseController.getSpecificWarehouse)
  .put(warehouseController.editSpecificWarehouse)
  .patch(warehouseController.editSpecificWarehouseName)
  .delete(warehouseController.deleteSpecificWarehouse);

module.exports = router;
