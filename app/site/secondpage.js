//dit is mijn black en white filter

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

const apiUrl = `http://localhost:3000`;

async function fetchRecipeDetails() {
  const title = new URLSearchParams(window.location.search).get("title");
  if (!title) return;

  try {
    const response = await fetch(
      `${apiUrl}/recipes?title=${encodeURIComponent(title)}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const recipes = await response.json();
    const recipe = recipes.find((r) => r.title === title);
    if (!recipe) throw new Error("Recipe not found");

    document.querySelector(".recipe-details").innerHTML = `
      <h2>${recipe.title}</h2>
      <p>${recipe.instructions}</p>
      <ul>${recipe.ingredients
        .map((ing) => `<li>${ing.name}: ${ing.amount}</li>`)
        .join("")}</ul>
      <p>Cooking Time: ${recipe.cookingTime} minutes</p>
      <p>Difficulty: ${recipe.difficulty}</p>
      <p>Servings: ${recipe.servings}</p>
    `;
  } catch (error) {
    console.error("Failed to fetch recipe details:", error);
  }
}

fetchRecipeDetails();
