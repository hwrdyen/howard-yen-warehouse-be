const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

function readWarehouseData() {
  const allWarehouseData = fs.readFileSync(
    path.resolve(__dirname, "../data/warehouses.json")
  );
  const parse_allWarehouseData = JSON.parse(allWarehouseData);
  return parse_allWarehouseData;
}

function readInventoryData() {
  const allInventoryData = fs.readFileSync(
    path.resolve(__dirname, "../data/inventories.json")
  );
  const parse_allInventoryData = JSON.parse(allInventoryData);
  return parse_allInventoryData;
}

// GET a list of all Warehouses
exports.getAllWarehouses = (req, res) => {
  let warehouseData = readWarehouseData();
  res.json(warehouseData);
};

// GET a specific Warehouse
exports.getSpecificWarehouse = (req, res) => {
  let warehouseID = req.params.warehouseID;
  let warehouseData = readWarehouseData();
  const specificWarehouse = warehouseData.filter(
    (warehouse) => warehouse.id === warehouseID
  );
  if (specificWarehouse.length != 0) {
    res.json(specificWarehouse);
  } else {
    res
      .status(404)
      .json({ message: `Warehouse with id ${warehouseID} not found.` });
  }
};

// POST a new Warehouse
exports.createNewWarehouse = (req, res) => {
  let newWarehouseDetail = req.body;
  let warehouseData = readWarehouseData();
  warehouseData.push(newWarehouseDetail);
  let stringify_warehouseData = JSON.stringify(warehouseData);
  fs.writeFileSync(
    path.resolve(__dirname, "../data/warehouses.json"),
    stringify_warehouseData
  );
  res
    .status(201)
    .send(`Created Warehouse ${newWarehouseDetail?.id} Successfully!`);
};

// PUT a Specific Warehouse
exports.editSpecificWarehouse = (req, res) => {
  let warehouseData = readWarehouseData();
  const warehouseID = req.params.warehouseID;
  let warehouseEditInfo = req.body;

  let specificWarehouse = warehouseData.filter(
    (warehouse) => warehouse.id === warehouseID
  );
  let specificWarehouseIndex = warehouseData.findIndex(
    (warehouse) => warehouse.id === warehouseID
  );
  if (specificWarehouse.length != 0) {
    warehouseData[specificWarehouseIndex] = warehouseEditInfo;
  }

  let stringify_warehouseData = JSON.stringify(warehouseData);
  fs.writeFileSync(
    path.resolve(__dirname, "../data/warehouses.json"),
    stringify_warehouseData
  );
  res.status(201).send(`Edited Warehouse ${warehouseID} Successfully!`);
};

// PATCH name of Specific Warehouse
exports.editSpecificWarehouseName = (req, res) => {
  let warehouseData = readWarehouseData();
  const warehouseID = req.params.warehouseID;
  let warehouseEditName = req.body.name;

  let specificWarehouse = warehouseData.filter(
    (warehouse) => warehouse.id === warehouseID
  );
  let specificWarehouseIndex = warehouseData.findIndex(
    (warehouse) => warehouse.id === warehouseID
  );
  if (specificWarehouse.length != 0) {
    warehouseData[specificWarehouseIndex] = {
      ...warehouseData[specificWarehouseIndex],
      name: warehouseEditName,
    };
  }

  let stringify_warehouseData = JSON.stringify(warehouseData);
  fs.writeFileSync(
    path.resolve(__dirname, "../data/warehouses.json"),
    stringify_warehouseData
  );
  res.status(201).send(`Edited Name of Warehouse ${warehouseID} Successfully!`);
};

// DELETE a Specific Warehouse
exports.deleteSpecificWarehouse = (req, res) => {
  const warehouseID = req.params.warehouseID;
  let warehouseData = readWarehouseData();
  let inventoryData = readInventoryData();
  let specificWarehouseIndex = warehouseData.findIndex(
    (warehouse) => warehouse.id === warehouseID
  );

  if (specificWarehouseIndex != null) {
    warehouseData.splice(specificWarehouseIndex, 1);
  }
  let stringify_warehouseData = JSON.stringify(warehouseData);
  fs.writeFileSync(
    path.resolve(__dirname, "../data/warehouses.json"),
    stringify_warehouseData
  );

  // remove inventory item belongs to the warehouse
  let deletedInventoryInfo = inventoryData.filter(
    (inventory) => inventory?.warehouseID === warehouseID
  );

  for (deletedinfo of deletedInventoryInfo) {
    let specificInventoryIndex = inventoryData.findIndex(
      (inventory) => inventory === deletedinfo
    );

    if (specificInventoryIndex != null) {
      inventoryData.splice(specificInventoryIndex, 1);
    }
  }
  let stringify_inventoryData = JSON.stringify(inventoryData);
  fs.writeFileSync(
    path.resolve(__dirname, "../data/inventories.json"),
    stringify_inventoryData
  );

  res.status(201).send(`Deleted Warehouse ${warehouseID} Successfully!`);
};
