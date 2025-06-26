// ======= Fetcht de gerchten op de detail ======

const apiUrl = `http://localhost:3000`;

async function fetchRecipeDetails() {
  const title = new URLSearchParams(window.location.search).get("title");
  if (!title) return;

  const detailsDiv = document.querySelector(".recipe-details");
  detailsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `${apiUrl}/recipes?title=${encodeURIComponent(title)}`
    );

    const recipes = await response.json();
    const recipe = recipes.find((r) => r.title === title);

    if (!recipe) {
      detailsDiv.innerHTML = "<p>Recept niet gevonden.</p>";
      return;
    }

    const ingredientsList = document.createElement("ul");
    recipe.ingredients.forEach((ing) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${ing.name}: ${ing.amount}`;
      ingredientsList.appendChild(listItem);
    });

    detailsDiv.innerHTML = `
      <h2>${recipe.title}</h2>
      <p>${recipe.instructions}</p>
    `;
    detailsDiv.appendChild(ingredientsList);
    detailsDiv.innerHTML += `
      <p>Cooking Time: ${recipe.cookingTime} minutes</p>
      <p>Difficulty: ${recipe.difficulty}</p>
      <p>Servings: ${recipe.servings}</p>
    `;
  } catch (error) {
    detailsDiv.innerHTML = "<p>Fout bij het laden van het recept.</p>";
    console.error("Failed to fetch recipe details:", error);
  }
}

fetchRecipeDetails();

// ======= black en white filter =======

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
