// ========= Filter voor ingredienten =========

document
  .getElementById("view-ingredients")
  .addEventListener("click", async () => {
    const recipeContainer = document.getElementById("recipe-container");
    if (recipeContainer) recipeContainer.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch("http://localhost:3000/ingredients");

      const ingredients = await response.json();
      recipeContainer.innerHTML = ingredients
        .map(
          (ingredient) => `
            <div class="ingredient">
                <h2 onclick="viewIngredient('${ingredient}')">${ingredient}</h2>
            </div>
        `
        )
        .join("");
    } catch (error) {
      console.error("Error:", error);
    }
  });

async function viewIngredient(ingredient) {
  const recipeContainer = document.getElementById("recipe-container");
  if (recipeContainer) recipeContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch("http://localhost:3000/recipes");

    const recipes = await response.json();
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.ingredients.some((ing) => ing.name === ingredient)
    );

    recipeContainer.innerHTML =
      filteredRecipes.length === 0
        ? "<p>Geen recepten gevonden met dit ingrediënt.</p>"
        : filteredRecipes
            .map(
              (recipe) => `
              <div class="recipe">
                  <h2><a href="secondpage.html?title=${encodeURIComponent(
                    recipe.title
                  )}">${recipe.title}</a></h2>
                  <ul>
                    ${recipe.ingredients
                      .map((ing) => `<li>${ing.name}</li>`)
                      .join("")}
                  </ul>
              </div>
          `
            )
            .join("");
  } catch (error) {
    console.error("Error:", error);
  }
}

// ========= Filter voor difficulty =========

document
  .getElementById("view-difficulty")
  .addEventListener("click", async () => {
    const recipeContainer = document.getElementById("recipe-container");
    if (recipeContainer) recipeContainer.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch("http://localhost:3000/difficulty-levels");

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
  if (recipeContainer) recipeContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch("http://localhost:3000/recipes");

    const recipes = await response.json();
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.difficulty === difficulty
    );

    recipeContainer.innerHTML =
      filteredRecipes.length === 0
        ? "<p>Geen recepten gevonden met dit moeilijkheidsgraad.</p>"
        : filteredRecipes
            .map(
              (recipe) => `
              <div class="recipe">
                  <h2><a href="secondpage.html?title=${encodeURIComponent(
                    recipe.title
                  )}">${recipe.title}</a></h2>
                  <p>Difficulty: ${recipe.difficulty}</p>
              </div>
          `
            )
            .join("");
  } catch (error) {
    console.error("Error:", error);
  }
}

// ========= Filter voor categorien =========

document
  .getElementById("view-categories")
  .addEventListener("click", async () => {
    const recipeContainer = document.getElementById("recipe-container");
    if (recipeContainer) recipeContainer.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch("http://localhost:3000/categories");

      const categories = await response.json();
      recipeContainer.innerHTML = categories
        .map(
          (category) => `
            <div class="category">
                <h2 onclick="viewCategory('${category}')">${category}</h2>
            </div>
        `
        )
        .join("");
    } catch (error) {
      console.error("Error:", error);
    }
  });

async function viewCategory(category) {
  const recipeContainer = document.getElementById("recipe-container");
  if (recipeContainer) recipeContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch("http://localhost:3000/recipes");

    const recipes = await response.json();
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.category === category
    );

    recipeContainer.innerHTML =
      filteredRecipes.length === 0
        ? "<p>Geen recepten gevonden in deze categorie.</p>"
        : filteredRecipes
            .map(
              (recipe) => `
              <div class="recipe">
                  <h2><a href="secondpage.html?title=${encodeURIComponent(
                    recipe.title
                  )}">${recipe.title}</a></h2>
                  <p>Category: ${recipe.category}</p>
              </div>
          `
            )
            .join("");
  } catch (error) {
    console.error("Error:", error);
  }
}
