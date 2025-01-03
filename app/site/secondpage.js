document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = "mz/qZWo1J4weMMk9ZaAUrg==xuJ3PaZYRZ5yPdni";
  const apiUrl = `https://api.api-ninjas.com/v1/recipe?title=`;
  const headers = { "X-Api-Key": apiKey };

  const recipeDetailsContainer = document.querySelector(".recipe-details");
  const urlParams = new URLSearchParams(window.location.search);
  const recipeTitle = urlParams.get("title");

  if (recipeTitle) {
    const recipe = await (
      await fetch(apiUrl + encodeURIComponent(recipeTitle), { headers })
    ).json();

    if (recipe.length > 0) {
      const details = recipe[0];
      recipeDetailsContainer.innerHTML = `
        <h1>${details.title}</h1>
        <p><strong>Ingredients:</strong> ${details.ingredients}</p>
        <p><strong>Instructions:</strong> ${details.instructions}</p>
      `;
    } else {
      recipeDetailsContainer.innerHTML = "<p>Recipe not found.</p>";
    }
  } else {
    recipeDetailsContainer.innerHTML = "<p>No recipe title provided.</p>";
  }
});
