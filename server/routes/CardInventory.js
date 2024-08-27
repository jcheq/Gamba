const express = require("express");
const router = express.Router();
const userPlayer = require("../models/UserSchema");
const cardInventory = require("../models/CardCollectionSchema");

// Route to get all items
router.get("/:userID", async (req, res) => {
  const inventoryID = req.params.userID;
  try {
    const cards = await cardInventory.find({ userID: inventoryID });
    if (cards.length > 0) {
      res.json(cards);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// router.get("/:userID", (req, res) => {
//   res.send("Route is working!");
// });

module.exports = router;
