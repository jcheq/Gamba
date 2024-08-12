const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    userID: {
        type: String,
    },
     
    balance: {
        type: Number,
    },
    
  });
  
  module.exports = mongoose.model('Inventory', InventorySchema);