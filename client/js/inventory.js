let allCards = [];

document.addEventListener("DOMContentLoaded", function () {
  // Extract userId from the URL
  const pathArray = window.location.pathname.split("/");
  const userId = pathArray[pathArray.length - 1]; // Get the last part of the URL, which is the userId
  // const guildId = dotenv.GUILD_ID;
  console.log("Fetching cards for userId:", userId); // Debugging
  // console.log("Fetching id for guild:", guildId); // Debugging

  //Fetch user profile
  fetch(`/api/discordProfile/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      if (user.error) {
        document.getElementById(
          "profile-container"
        ).innerHTML = `<p>${user.error}</p>`;
      } else {
        renderProfile(user);
      }
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      document.getElementById(
        "profile-container"
      ).innerHTML = `<p>Failed to load profile.</p>`;
    });

  // Fetch the user's card inventory
  fetch(`/api/inventory/${userId}`)
    .then((response) => response.json())
    .then((inventory) => {
      // console.log(inventory);
      if (inventory.error) {
        document.getElementById(
          "inventory-container"
        ).innerHTML = `<p>${inventory.error}</p>`;
      } else {
        allCards = sortCards(inventory.cards);
        renderCards(allCards);
      }
    })
    .catch((error) => {
      console.error("Error fetching cards:", error);
      document.getElementById(
        "inventory-container"
      ).innerHTML = `<p>Failed to load cards.</p>`;
    });
});

function sortCards(cards) {
  const rarityOrder = {
    Unique: 1,
    Weapon: 2,
    Mythic: 3,
    Legendary: 4,
    Epic: 5,
    Rare: 6,
  };

  return cards.sort((a, b) => {
    // Sort by rarity using the rarityOrder object
    if (rarityOrder[a.rarity] !== rarityOrder[b.rarity]) {
      return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    }
    // If rarities are the same, sort by amount (descending order)
    if (b.amount !== a.amount) {
      return b.amount - a.amount;
    }
    // If rarities and amounts are the same, sort by element (alphabetically)
    if (a.element && b.element) {
      return a.element.localeCompare(b.element);
    }
    // If an element is missing, it will appear last
    return 0;
  });
}

function filterByElement(element) {
  document.querySelectorAll("#filter-buttons button").forEach((button) => {
    button.classList.remove("active");
  });
  document
    .querySelector(`button[onclick="filterByElement('${element}')"]`)
    .classList.add("active");
  const filteredCards =
    element === "All"
      ? allCards
      : allCards.filter((card) => card.type === element);
  console.log("Sorted Cards:", filterByElement); // Add this
  renderCards(filteredCards);
}

function renderProfile(user) {
  const container = document.getElementById("profile-container");
  container.innerHTML = ""; // Clear previous content

  if (user.length === 0) {
    container.innerHTML = "<p>No user found.</p>";
    return;
  }

  const userProfile = document.createElement("div");
  userProfile.classList.add("profile");

  userProfile.innerHTML = `
    <img src = "${user.avatarUrl}" alt= "${user.nickname}" style= "width:40px; height:40px; border-radius: 0%; vertical-align:bottom;">
    <span>${user.nickname}'s Inventory</span>


        `;

  container.appendChild(userProfile);
}

function renderCards(cards) {
  const container = document.getElementById("inventory-container");
  container.innerHTML = ""; // Clear previous content

  if (cards.length === 0) {
    container.innerHTML = "<p>No cards found for this user.</p>";
    return;
  }
  // console.log(cards);

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    let starAmount = calcStar(card.amount);
    let cardType = calcElement(card.type);
    cardElement.setAttribute("data-star", starAmount);
    cardElement.setAttribute("data-type", cardType);
    cardElement.setAttribute("data-extra", card.type);
    cardElement.style.backgroundImage = cardBackground(card.rarity);

    cardElement.innerHTML = `
    
    <div class= "cardimage"> 
      <img class="advancementstarsbottom" src="https://nattobot.com/content/stars_${cardElement.getAttribute(
        `data-star`
      )}.png" alt="advancement stars">
      <img class="" src="${card.image}">
    </div>
    <h4>${card.name}</h4>
    <div class= "cardstats"> 
      <strong>10</strong>
      <img style="width:32px;" src="https://nattobot.com/content/attack.png" alt="attack">
      <strong>20</strong>
      <img style="width:32px;" src="https://nattobot.com/content/hp.png" alt="hp">
    </div>
    <img class="cardelement" src="https://nattobot.com/content/${cardElement.getAttribute(
      `data-type`
    )}.png?r=1" alt="element">
            
       
        `;

    container.appendChild(cardElement);
  });
}

function cardBackground(rarity) {
  let url;
  switch (rarity) {
    case "Unique":
      url = `url(https://nattobot.com/content/9yZM5ai_u.png)`;
      break;
    case `Weapon`:
      url = `url(https://nattobot.com/content/9yZM5ai_u.png)`;
      break;
    case `Mythic`:
      url = `url(https://nattobot.com/content/9yZM5ai_u.png)`;
      break;
    case `Legendary`:
      url = `url(https://nattobot.com/content/uP2aXed_c.png)`;
      break;
    case `Epic`:
      url = `url(https://nattobot.com/content/uP2aXed_c.png)`;
      break;
    case `Rare`:
      url = `url(https://nattobot.com/content/uP2aXed_c.png)`;
      break;
  }
  return url;
}

function calcStar(star) {
  let advancement;
  switch (true) {
    case star === 1:
      advancement = 1;
      break;
    case star === 2:
      advancement = 2;
      break;
    case star === 3:
      advancement = 3;
      break;
    case star === 4:
      advancement = 4;
      break;
    case star >= 5: //5+
      advancement = 5;
      break;
    default:
      advancement = 0;
      break;
  }
  return advancement;
}

function calcElement(type) {
  let url;
  switch (type) {
    case "Light":
      url = `light`;
      break;
    case `Dark`:
      url = `dark`;
      break;
    case `Water`:
      url = `water`;
      break;
    case `Fire`:
      url = `fire`;
      break;
    case `Air`:
      url = `wind`;
      break;
    case `Lightning`:
      url = `lightning`;
      break;
  }
  return url;
}

// async function userProfile() {
//   try {
//     const res = await fetch("api/User");
//     if (!res.ok) throw new Error("Network response was not ok");
//     const user = await res.json();

//     const users = document.getElementById("user-list");

//     user.forEach((userProfile) => {
//       const li = document.createElement("li");
//       li.textContent = `${userProfile.userID}: ${userProfile.power}`;
//       users.appendChild(li);
//     });
//   } catch (error) {
//     console.error("Error fetching items:", error);
//   }
// }
