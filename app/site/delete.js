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

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      console.log(`Deleted recipe with ID: ${recipeId}`);
      event.target.closest(".recipe").remove();
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
