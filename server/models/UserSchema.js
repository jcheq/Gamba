const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },

  power: {
    type: Number,
  },

  guildName: {
    type: String,
  },

  cooldowns: [
    {
      daily: { type: Date }, // dailies
      cf: { type: Date }, // coinflip
      dice: { type: Date }, // dice
      rps: { type: Date }, // rock paper scissors
      roulette: { type: Date }, // roulette
      risk: { type: Date }, // risk
      boba: { type: Date }, // name
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
