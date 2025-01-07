document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = "mz/qZWo1J4weMMk9ZaAUrg==xuJ3PaZYRZ5yPdni";
  const apiUrl = `https://api.api-ninjas.com/v1/recipe?limit=100`;
  const headers = { "X-Api-Key": apiKey };

  const recipeContainer = document.querySelector(".recipe-container");

  let i = 0;
  async function fetchtest() {
    const recipes = await (
      await fetch(`https://api.api-ninjas.com/v1/recipe?query=""&offset=${i}`, {
        headers,
      })
    ).json();

    let recipeHTML = "";
    recipes.forEach((recipe) => {
      recipeHTML += `<div class="recipe"><h2><a href="secondpage.html?title=${encodeURIComponent(
        recipe.title
      )}">${recipe.title}</a></h2></div>`;
    });
    recipeContainer.innerHTML = recipeHTML;
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

  // dit is mijn black en white filter

  const toggleModeButton = document.getElementById("toggle-mode");
  const currentMode = localStorage.getItem("mode");

  if (currentMode === "black-and-white") {
    document.body.classList.add("black-and-white");
  }

  toggleModeButton.addEventListener("click", () => {
    document.body.classList.toggle("black-and-white");
    if (document.body.classList.contains("black-and-white")) {
      localStorage.setItem("mode", "black-and-white");
    } else {
      localStorage.removeItem("mode");
    }
  });
});
