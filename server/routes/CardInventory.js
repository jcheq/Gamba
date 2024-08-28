const express = require("express");
const router = express.Router();
const userPlayer = require("../models/UserSchema");
const cardInventory = require("../models/CardCollectionSchema");

// Route to get all items
router.get("/:userID", async (req, res) => {
  const inventoryID = req.params.userID;
  try {
    const inventory = await cardInventory.findOne({ userID: inventoryID });

    if (inventory) {
      res.json(inventory);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

module.exports = router;
