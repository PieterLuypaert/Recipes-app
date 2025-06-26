//  ====== Fetcht alle gerechten naar de homepagina =======

const apiUrl = `http://localhost:3000`;

const recipeContainer = document.querySelector(".recipe-container");
if (!recipeContainer) {
  console.error("Kan .recipe-container niet vinden!");
}

let i = 0;
async function fetchtest() {
  try {
    if (recipeContainer) recipeContainer.innerHTML = "<p>Loading...</p>";
    const response = await fetch(`${apiUrl}/recipes?query=""&offset=${i}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const recipes = await response.json();

    if (!recipes || recipes.length === 0) {
      if (recipeContainer)
        recipeContainer.innerHTML = "<p>Geen recepten gevonden.</p>";
      return;
    }

    let recipeHTML = "";
    recipes.forEach((recipe) => {
      recipeHTML += `
        <div class="recipe">
          <h2><a href="secondpage.html?title=${encodeURIComponent(
            recipe.title
          )}">${recipe.title}</a></h2>
          <button class="delete-recipe" data-id="${
            recipe.id
          }">Verwijder</button>
        </div>
      `;
    });
    if (recipeContainer) recipeContainer.innerHTML = recipeHTML;
  } catch (error) {
    if (recipeContainer)
      recipeContainer.innerHTML = "<p>Fout bij het laden van recepten.</p>";
    console.error("Failed to fetch recipes:", error);
  }
}

fetchtest();

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

// ======= Funtie waarmee ik mijn formulier kan verbergen en tonen =======

const form = document.getElementById("add-recipe-form");
form.style.display = "none";

document.getElementById("toggle-form").addEventListener("click", () => {
  const toggleButton = document.getElementById("toggle-form");

  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
    toggleButton.textContent = "klik hier om het formulier te verbergen";
  } else {
    form.style.display = "none";
    toggleButton.textContent = "klik hier om een gerecht toe te voegen!";
  }
});
