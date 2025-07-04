const path = require("path");
const fsp = require("fs/promises");
const { generateUUID } = require("../helpers/utils");

const postPath = path.join(__dirname, "..", "data", "recipes.json");

async function getDataFromFile() {
  try {
    const data = await fsp.readFile(postPath, "utf8");
    const posts = JSON.parse(data);
    return posts;
  } catch (err) {
    throw new Error("Fout bij het lezen van de recepten-data.");
  }
}

async function writeDataToFile(path, data) {
  await fsp.writeFile(path, JSON.stringify(data, null, 2));
}

async function getPosts(req, res) {
  try {
    const posts = await getDataFromFile();
    res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getRecipe(req, res) {
  try {
    const posts = await getDataFromFile();
    const { postId } = req.params;
    const post = posts.find((post) => post.id === postId);
    if (post) {
      res.json(post);
    } else {
      throw new Error("Er is geen post met deze ID");
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
}

async function createRecipe(req, res) {
  try {
    const {
      title,
      category,
      ingredients,
      instructions,
      cookingTime,
      difficulty,
      servings,
    } = req.body;
    if (
      !title ||
      !category ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0 ||
      !instructions ||
      !cookingTime ||
      !difficulty ||
      !servings
    ) {
      return res
        .status(400)
        .json({
          message:
            "Vul alle verplichte velden in. Ingrediënten moeten een niet-lege lijst zijn.",
        });
    }
    const posts = await getDataFromFile();
    posts.push({
      id: generateUUID(),
      ...req.body,
    });

    await fsp.writeFile(postPath, JSON.stringify(posts, null, 2));

    res.json({ message: "Er is een nieuwe post toegevoegd" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Interne serverfout" });
  }
}

async function deleteRecipe(req, res) {
  const { id } = req.params;

  const posts = await getDataFromFile();
  const updatedPosts = posts.filter((post) => post.id !== id);
  await writeDataToFile(postPath, updatedPosts);

  res.json({
    message: `We hebben post met id ${id} verwijderd.`,
  });
}
async function getCategories(req, res) {
  try {
    const posts = await getDataFromFile();
    const categories = [];
    posts.forEach((post) => {
      if (!categories.includes(post.category)) {
        categories.push(post.category);
      }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getIngredients(req, res) {
  try {
    const posts = await getDataFromFile();
    const ingredients = [];
    posts.forEach((post) => {
      post.ingredients.forEach((ingredient) => {
        if (!ingredients.includes(ingredient.name)) {
          ingredients.push(ingredient.name);
        }
      });
    });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getDifficultyLevels(req, res) {
  try {
    const posts = await getDataFromFile();
    const difficultyLevels = [];
    posts.forEach((post) => {
      if (!difficultyLevels.includes(post.difficulty)) {
        difficultyLevels.push(post.difficulty);
      }
    });
    res.json(difficultyLevels);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getPosts,
  getRecipe,
  createRecipe,
  deleteRecipe,
  getCategories,
  getIngredients,
  getDifficultyLevels,
};
