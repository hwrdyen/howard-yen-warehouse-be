const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

function readInventoryData() {
  let allInventoryData = fs.readFileSync(
    path.resolve(__dirname, "../data/inventories.json")
  );
  let parse_allInventoryData = JSON.parse(allInventoryData);
  return parse_allInventoryData;
}

// GET a list of all Inventories
exports.getAllInventories = (req, res) => {
  const inventoryData = readInventoryData();
  res.json(inventoryData);
};

// GET a specific Inventory
exports.getSpecificInventory = (req, res) => {
  let inventoryID = req.params.inventoryID;
  const inventoryData = readInventoryData();
  let specificInventory = inventoryData.filter(
    (inventory) => inventory.id === inventoryID
  );
  if (specificInventory.length != 0) {
    res.json(specificInventory);
  } else {
    res
      .status(404)
      .json({ message: `Inventory with id ${inventoryID} not found.` });
  }
};

// POST a new Inventory
exports.createNewInventory = (req, res) => {
  let inventoryData = readInventoryData();
  let newInventoryData = req.body;
  inventoryData.push(newInventoryData);
  let stringify_inventoryData = JSON.stringify(inventoryData);
  fs.writeFileSync(
    path.resolve(__dirname, "../data/inventories.json"),
    stringify_inventoryData
  );
  res.status(201).send(`Created Inventory ${req.body.id} Successfully!`);
};

// PUT a Specific Inventory

// DELETE a Specific Inventory
