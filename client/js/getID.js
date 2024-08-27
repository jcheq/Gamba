document.addEventListener("DOMContentLoaded", function () {
  // Extract userId from the URL
  const pathArray = window.location.pathname.split("/");
  const userId = pathArray[pathArray.length - 1]; // Get the last part of the URL, which is the userId

  let userCards = [];

  fetchUserCards(userId).then((cards) => {
    userCards = cards;

    document
      .getElementById("rarity-filter")
      .addEventListener("change", function () {
        const selectedRarity = this.value;
        if (selectedRarity === "all") {
          renderCards(userCards);
        } else {
          filterCardsByRarity(userCards, selectedRarity);
        }
      });
  });
});
