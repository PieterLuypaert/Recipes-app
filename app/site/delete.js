
// ======= Delete functie om gerecht te verwijderen ========

recipeContainer.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-recipe")) {
    const recipeId = event.target.getAttribute("data-id");

    try {
      const response = await fetch(`${apiUrl}/recipes/${recipeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result.message);

      alert("Recept succesvol verwijderd");
      event.target.closest(".recipe").remove();
    } catch (error) {
      console.error("Error:", error);
      alert("Er is een fout opgetreden bij het verwijderen van het recept");
    }
  }
});
