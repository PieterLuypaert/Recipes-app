document.getElementById("search").addEventListener("input", async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const recipeContainer = document.getElementById("recipe-container");

    try {
        const response = await fetch("http://localhost:3000/recipes");

        const recipes = await response.json();
        const filteredRecipes = recipes.filter(({ title, category, ingredients }) =>
            [title, category, ...ingredients.map(({ name }) => name)]
                .some(text => text.toLowerCase().includes(searchTerm))
        );

        recipeContainer.innerHTML = filteredRecipes.map(({ title, difficulty }) => `
            <div class="recipe">
                <h2>${title}</h2>
                <p>Moeilijkheid: ${difficulty}</p>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error:", error);
    }
});
