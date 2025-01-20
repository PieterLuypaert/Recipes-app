document
  .getElementById("view-difficulty")
  .addEventListener("click", async () => {
    const recipeContainer = document.getElementById("recipe-container");

    try {
      const response = await fetch("http://localhost:3000/difficulty-levels");
      if (!response.ok) throw new Error("Failed to fetch difficulty levels");

      const difficultyLevels = await response.json();
      recipeContainer.innerHTML = difficultyLevels
        .map(
          (difficulty) => `
            <div class="difficulty">
                <h2 onclick="viewDifficulty('${difficulty}')">${difficulty}</h2>
            </div>
        `
        )
        .join("");
    } catch (error) {
      console.error("Error:", error);
    }
  });

async function viewDifficulty(difficulty) {
  const recipeContainer = document.getElementById("recipe-container");

  try {
    const response = await fetch("http://localhost:3000/recipes");
    if (!response.ok) throw new Error("Failed to fetch recipes");

    const recipes = await response.json();
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.difficulty === difficulty
    );

    recipeContainer.innerHTML = filteredRecipes
      .map(
        (recipe) => `
            <div class="recipe">
                <h2>${recipe.title}</h2>
                <p>Categorie: ${recipe.category}</p>
                <p>Ingrediënten: ${recipe.ingredients
                  .map((ing) => `${ing.name}: ${ing.amount}`)
                  .join(", ")}</p>
                <p>Instructies: ${recipe.instructions}</p>
                <p>Kooktijd: ${recipe.cookingTime} minuten</p>
                <p>Moeilijkheid: ${recipe.difficulty}</p>
                <p>Porties: ${recipe.servings}</p>
            </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error:", error);
  }
}
