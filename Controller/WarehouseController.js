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

exports.getAllWarehouses = (req, res) => {
  let warehouseData = readWarehouseData();
  res.json(warehouseData);
};

exports.getSpecificWarehouse = (req, res) => {
  let warehouseID = req.params.warehouseID;
  let warehouseData = readWarehouseData();
  const specificWarehouse = warehouseData.filter(
    (warehouse) => warehouse.id === warehouseID
  );
  if (specificWarehouse) {
    res.json(specificWarehouse);
  } else {
    res
      .status(404)
      .json({ message: `Warehouse with id ${warehouseID} not found.` });
  }
};

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
