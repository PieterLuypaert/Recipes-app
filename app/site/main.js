document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = "mz/qZWo1J4weMMk9ZaAUrg==xuJ3PaZYRZ5yPdni";
  const apiUrl = `https://api.api-ninjas.com/v1/recipe?limit=100`;
  const headers = { "X-Api-Key": apiKey };

  const recipeContainer = document.querySelector(".recipe-container");
  const searchInput = document.querySelector(".search-input");

  let i = 0;
  async function fetchtest() {
    const recipes = await (
      await fetch(`https://api.api-ninjas.com/v1/recipe?query=""&offset=${i}`, {
        headers,
      })
    ).json();

    recipeContainer.innerHTML = recipes
      .map(
        (recipe) =>
          `<div class="recipe"><h2><a href="secondpage.html?title=${encodeURIComponent(
            recipe.title
          )}">${recipe.title}</a></h2></div>`
      )
      .join("");
  }

  fetchtest();

  document.getElementById("btn").addEventListener("click", next_page);
  function next_page() {
    i += 10;
    fetchtest();
  }

  document.getElementById("btnlast").addEventListener("click", last_page);
  function last_page() {
    i -= 10;
    fetchtest();
  }
});
