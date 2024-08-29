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
        const sortedCards = sortCards(inventory.cards);

        renderCards(sortedCards);
      }
    })
    .catch((error) => {
      console.error("Error fetching cards:", error);
      document.getElementById(
        "inventory-container"
      ).innerHTML = `<p>Failed to load cards.</p>`;
    });

  document
    .getElementById("rarity-filter")
    .addEventListener("change", (event) => {
      const selectedRarity = event.target.value;
      filterCardsByRarity(selectedRarity);
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

let allCards = [];
// console.log(allCards);

function filterCardsByRarity(rarity) {
  const filteredCards = allCards.filter(
    (card) => rarity === "all" || card.rarity === rarity
  );
  renderCards(filteredCards);
}

function renderCards(cards) {
  const container = document.getElementById("inventory-container");
  container.innerHTML = ""; // Clear previous content

  //   if (cards.length === 0) {
  //     container.innerHTML = "<p>No cards found for this user.</p>";
  //     return;
  //   }
  //   console.log(cards);

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    cardElement.innerHTML = `
            <h2>${card.name}</h2>
            <p>Rarity: ${card.rarity}</p>
            <p>Amount: ${card.amount}</p>
            <p>Type: ${card.type}</p>
       
        `;

    container.appendChild(cardElement);
  });
}
