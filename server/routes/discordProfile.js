const express = require("express");
const router = express.Router();
require("dotenv").config();

// Route to get all items
router.get("/:userID", async (req, res) => {
  const userID = req.params.userID;
  const guildID = process.env.GUILD_ID;
  try {
    // Example API call to Discord
    const userResponse = await fetch(
      `https://discord.com/api/v10/users/${userID}`,
      {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`, // Make sure your bot token is stored securely in your .env file
        },
      }
    );

    const userData = await userResponse.json();

    const guildResponse = await fetch(
      `https://discord.com/api/v10/guilds/${guildID}/members/${userID}`,
      {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`, // Ensure your bot token is set in .env
        },
      }
    );
    const guildData = await guildResponse.json();

    const responseData = {
      username: userData.username,
      discriminator: userData.discriminator,
      nickname: guildData.nick || userData.username, // Use nickname if available, otherwise fallback to username
      avatarUrl: userData.avatar
        ? `https://cdn.discordapp.com/avatars/${userID}/${userData.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${
            userData.discriminator % 5
          }.png`, // Fallback to default avatar
    };

    // console.log(responseData);

    res.json(responseData); // Send the data received from Discord API to the client
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch discord profile" });
  }
});

module.exports = router;
