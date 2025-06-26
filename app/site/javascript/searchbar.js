//  ===== Funcie voor de zoekbalk te laten werken met zoeken op naam ======

document.getElementById("search").addEventListener("input", async (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const recipeContainer = document.getElementById("recipe-container");

  try {
    const response = await fetch("http://localhost:3000/recipes");
    const recipes = await response.json();
    const filteredRecipes = recipes.filter(({ title, category, ingredients }) =>
      [title, category, ...ingredients.map(({ name }) => name)].some((text) =>
        text.toLowerCase().includes(searchTerm)
      )
    );

    recipeContainer.innerHTML =
      filteredRecipes.length === 0
        ? "<p>Geen resultaten gevonden.</p>"
        : filteredRecipes
            .map(
              ({ title, difficulty }) => `
                <div class="recipe">
                    <h2><a href="secondpage.html?title=${encodeURIComponent(
                      title
                    )}">${title}</a></h2>
                </div>
            `
            )
            .join("");
  } catch (error) {
    console.error("Error:", error);
  }
});
