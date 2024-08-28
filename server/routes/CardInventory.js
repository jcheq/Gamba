const express = require("express");
const router = express.Router();
const userPlayer = require("../models/UserSchema");
const cardInventory = require("../models/CardCollectionSchema");

// Route to get all items
router.get("/:userID", async (req, res) => {
  // res.send("Route is working!");
  const inventoryID = req.params.userID;
  try {
    const inventory = await cardInventory.findOne({ userID: inventoryID });
    // console.log(inventory);
    if (inventory) {
      res.json(inventory);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// router.get("/:userID", (req, res) => {
//   res.send("Route is working!");
// });

module.exports = router;
