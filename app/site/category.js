document
  .getElementById("view-categories")
  .addEventListener("click", async () => {
    const recipeContainer = document.getElementById("recipe-container");

    try {
      const response = await fetch("http://localhost:3000/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");

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

  try {
    const response = await fetch("http://localhost:3000/recipes");
    if (!response.ok) throw new Error("Failed to fetch recipes");

    const recipes = await response.json();
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.category === category
    );

    recipeContainer.innerHTML = filteredRecipes
      .map(
        (recipe) => `
            <div class="recipe">
                <h2>${recipe.title}</h2>
                <p>Categorie: ${recipe.category}</p>
                <p>Ingrediënten: ${recipe.ingredients
                  .map(
                    (ingredient) => `${ingredient.name}: ${ingredient.amount}`
                  )
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
