const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
    },

    power: {
        type: Number,
    },

    guildName: {
        type: String,
    }
    
  });

  
  module.exports = mongoose.model('User', UserSchema);