document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = "mz/qZWo1J4weMMk9ZaAUrg==xuJ3PaZYRZ5yPdni";
  const apiUrl = `https://api.api-ninjas.com/v1/recipe?limit=100`;
  const headers = { "X-Api-Key": apiKey };

  const recipeContainer = document.querySelector(".recipe-container");
  const searchInput = document.querySelector(".search-input");

  const recipes = await (await fetch(apiUrl, { headers })).json();
  const displayRecipes = (recipes) => {
    recipeContainer.innerHTML = recipes
      .map(
        (recipe) =>
          `<div class="recipe"><h2><a href="secondpage.html?title=${encodeURIComponent(
            recipe.title
          )}">${recipe.title}</a></h2></div>`
      )
      .join("");
  };

  displayRecipes(recipes);

  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    displayRecipes(
      recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm)
      )
    );
  });
});
