const apiUrl = `http://localhost:3000`;

const recipeContainer = document.querySelector(".recipe-container");

let i = 0;
async function fetchtest() {
  try {
    const response = await fetch(`${apiUrl}/recipes?query=""&offset=${i}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const recipes = await response.json();

    let recipeHTML = "";
    recipes.forEach((recipe) => {
      recipeHTML += `<div class="recipe">
        <h2><a href="secondpage.html?title=${encodeURIComponent(recipe.title)}">${recipe.title}</a></h2>
        <p>${recipe.difficulty}</p>
        <button class="delete-recipe" data-id="${recipe.id}">Verwijder</button>
      </div>`;
    });
    recipeContainer.innerHTML = recipeHTML;
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }
}

fetchtest();

recipeContainer.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-recipe")) {
    const recipeId = event.target.getAttribute("data-id");

    try {
      const response = await fetch(`${apiUrl}/recipes/${recipeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      console.log(`Deleted recipe with ID: ${recipeId}`);
      event.target.closest(".recipe").remove();
    } catch (error) {
      console.error("Error:", error);
    }
  }
});

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

