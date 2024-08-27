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

// async function card() {
//   try {
//     const res = await fetch("api/inventory/235243456677543936");
//     if (!res.ok) throw new Error("Network response was not ok");
//     const card = await res.json();

//     const users = document.getElementById("inventory-test");

//     card.forEach((cards) => {
//       const li = document.createElement("li");
//       li.textContent = `${cards.name}`;
//       users.appendChild(li);
//     });
//   } catch (error) {
//     console.error("Error fetching items:", error);
//   }
// }

function fetchUserCards(userId) {
  fetch(`/inventory/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No cards found for this user");
      }
      return response.json();
    })
    .then((data) => {
      renderCards(data);
    })
    .catch((err) => {
      console.error("Error:", err.message);
      document.getElementById("inventory-container").innerText =
        "No cards available for this user.";
    });
}

function renderCards(cards) {
  const container = document.getElementById("inventory-container");
  container.innerHTML = ""; // Clear any existing cards

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    cardElement.innerHTML = `
            <img src="${card.imageUrl}" alt="${card.name}">
            <div class="card-content">
                <h2 class="card-title">${card.name}</h2>
                <p class="card-subtitle">Type: ${card.type}</p>
                <div class="card-rarity">${card.rarity}</div>
                <p class="card-amount">Amount: ${card.amount}</p>
            </div>
        `;

    container.appendChild(cardElement);
  });
}

function filterCardsByRarity(cards, rarity) {
  const filteredCards = cards.filter((card) => card.rarity === rarity);
  renderCards(filteredCards);
}

// window.onload = function () {
//   userProfile();
//   fetchUserCards();
//   renderCards();
// };
