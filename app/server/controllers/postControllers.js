const path = require("path");
const fsp = require("fs/promises");
const { generateUUID } = require('../helpers/utils');

const postPath = path.join(__dirname, "..", "data", "recipe.json");

async function getDataFromFile() {
  const data = await fsp.readFile(postPath, 'utf8');
  const posts = JSON.parse(data);
  return posts;
}

async function writeDataToFile(path, data) {
  await fsp.writeFile(path, JSON.stringify(data, null, 2));
}

async function getPosts(req, res) {
  try {
    const recipes = await getDataFromFile();
    res.json(recipes);
  }
  catch (error) {
    res.status(500).json(error);
  }
}

async function createPost(req, res) {
  try {
    const recipes = await getDataFromFile();
    recipes.push({
      id: generateUUID(),
      ...req.body
    });

    await fsp.writeFile(postPath, JSON.stringify(re, null, 2));

    res.json({ message: "Er is een nieuwe post toegevoegd" });
  }
  catch (error) {
    res.status(500).json(error);
  }
}

async function deletePost(req, res) {
  //1. data ophalen

  const { id } = req.params;
 
  const posts = await getDataFromFile();
  //2. filteren op basis van id
  const updatedPosts = posts.filter((post) => post.id !== id)
  //3. write to file
  await writeDataToFile(postPath, updatedPosts);
  //4. response "Het is gelukt"
  res.json({
    "message": `We hebben post met id ${id} verwijderd.`
  });
}

module.exports = {
    getPosts,
  createPost,
  deletePost
};