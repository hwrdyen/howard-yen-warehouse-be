const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

exports.getAllInventories = (req, res) => {
  let allInventoryData = fs.readFileSync(
    path.resolve(__dirname, "../data/inventories.json")
  );
  let parse_allInventoryData = JSON.parse(allInventoryData);
  res.json(parse_allInventoryData);
};
