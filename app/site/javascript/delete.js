// ======= Delete functie om gerecht te verwijderen ========

if (typeof recipeContainer !== "undefined" && recipeContainer) {
  recipeContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-recipe")) {
      const recipeId = event.target.getAttribute("data-id");
      if (!confirm("Weet je zeker dat je dit recept wilt verwijderen?")) return;

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
        const recipeDiv = event.target.closest(".recipe");
        if (recipeDiv) recipeDiv.remove();
      } catch (error) {
        console.error("Error:", error);
        alert("Er is een fout opgetreden bij het verwijderen van het recept");
      }
    }
  });
}
