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

    const ingredientsList = document.createElement("ul");
    recipe.ingredients.forEach((ing) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${ing.name}: ${ing.amount}`;
      ingredientsList.appendChild(listItem);
    });

    document.querySelector(".recipe-details").innerHTML = `
      <h2>${recipe.title}</h2>
      <p>${recipe.instructions}</p>
    `;
    document.querySelector(".recipe-details").appendChild(ingredientsList);
    document.querySelector(".recipe-details").innerHTML += `
      <p>Cooking Time: ${recipe.cookingTime} minutes</p>
      <p>Difficulty: ${recipe.difficulty}</p>
      <p>Servings: ${recipe.servings}</p>
    `;
  } catch (error) {
    console.error("Failed to fetch recipe details:", error);
  }
}

fetchRecipeDetails();
