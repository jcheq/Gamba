const express = require('express');
const router = express.Router();
const userPlayer = require('../models/UserSchema');

// Route to get all items
router.get('/', async (req, res) => {
    try {
      const user = await userPlayer.find();
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  });




module.exports = router;