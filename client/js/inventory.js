// const cardFunctions = require("../utils/cardFunctions");

let allCards = [];

document.addEventListener("DOMContentLoaded", function () {
  // Extract userId from the URL
  const pathArray = window.location.pathname.split("/");
  const userId = pathArray[pathArray.length - 1]; // Get the last part of the URL, which is the userId

  console.log("Fetching cards for userId:", userId); // Debugging

  // Fetch the user's card inventory
  fetch(`/api/inventory/${userId}`)
    .then((response) => response.json())
    .then((inventory) => {
      console.log(inventory);
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
    cardElement.setAttribute("data-amount", card.amount);
    cardElement.setAttribute("data-type", card.type);
    cardElement.style.backgroundImage = cardBackground(card.rarity);

    cardElement.innerHTML = `

    <div class= "cardimage"> 
      <img class="advancementstarsbottom" src="https://nattobot.com/content/stars_5.png" alt="advancement stars">
      <img class="" src="https://nattobot.com/content/cards/104.png" data-src="https://nattobot.com/content/cards/104.png" alt="Card - "CatWoo"">
    </div>
    <h4>${card.name}</h4>
    <div class= "cardstats"> 
      <strong>10</strong>
      <img style="width:32px;" src="https://nattobot.com/content/attack.png" alt="attack">
      <strong>20</strong>
      <img style="width:32px;" src="https://nattobot.com/content/hp.png" alt="hp">
    </div>
    <img class="cardelement" src="https://nattobot.com/content/light.png?r=1" alt="element">
            
       
        `;

    container.appendChild(cardElement);
  });

  // <h2>${card.name}</h2>
  //           <p>Rarity: ${card.rarity}</p>
  //           <p>Amount: ${card.amount}</p>
  //           <p>Type: ${card.type}</p>
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
