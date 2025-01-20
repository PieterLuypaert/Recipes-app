document.querySelector(".add-recipe-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const ingredientsInput = document.getElementById("ingredients").value.split(",");
    const ingredients = [];
    for (let i = 0; i < ingredientsInput.length; i++) {
        const [name, amount] = ingredientsInput[i].split(":").map((str) => str.trim());
      ingredients.push({ name, amount });
    }
    const instructions = document.getElementById("instructions").value;
    const cookingTime = document.getElementById("cookingTime").value;
    const difficulty = document.getElementById("difficulty").value;
    const servings = document.getElementById("servings").value;

    const newRecipe = {
      title,
      category,
      ingredients,
      instructions,
      cookingTime,
      difficulty,
      servings,
    };

    try {
      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      const result = await response.json();
      console.log(result.message);

      const messageElement = document.getElementById("message");
      messageElement.style.display = "block";
      messageElement.textContent = "Recept succesvol toegevoegd";
    } catch (error) {
      console.error("Error:", error);
    }
  });
