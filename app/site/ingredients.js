document.getElementById("view-ingredients").addEventListener("click", async () => {
    const recipeContainer = document.getElementById("recipe-container");

    try {
        const response = await fetch("http://localhost:3000/ingredients");
        if (!response.ok) throw new Error("Failed to fetch ingredients");

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

    try {
        const response = await fetch("http://localhost:3000/recipes");
        if (!response.ok) throw new Error("Failed to fetch recipes");

        const recipes = await response.json();
        const filteredRecipes = recipes.filter(
            (recipe) => recipe.ingredients.some((ing) => ing.name === ingredient)
        );

        recipeContainer.innerHTML = filteredRecipes
            .map(
                (recipe) => `
            <div class="recipe">
                <h2>${recipe.title}</h2>
                <p>Categorie: ${recipe.category}</p>
                <p>Ingrediënten: ${recipe.ingredients
                    .map(
                        (ing) => `${ing.name}: ${ing.amount}`
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