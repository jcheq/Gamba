const mongoose = require("mongoose");

const CardCollectionSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },

  cards: [
    {
      name: { type: String, required: true }, // name
      rarity: { type: String, required: true }, // Rarity common/rare/etc
      type: { type: String, required: true }, // Card type
      amount: { type: Number, required: true }, // Amount is also part of the card object
      image: { type: String, required: true }, // Card image
      description: String,
    },
  ],
});

module.exports = mongoose.model("CardCollections", CardCollectionSchema);
