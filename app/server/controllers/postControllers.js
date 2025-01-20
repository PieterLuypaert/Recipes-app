const path = require("path");
const fsp = require("fs/promises");
const { generateUUID } = require("../helpers/utils");

const postPath = path.join(__dirname, "..", "data", "recipes.json");

async function getDataFromFile() {
  const data = await fsp.readFile(postPath, "utf8");
  const posts = JSON.parse(data);
  return posts;
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

async function getPost(req, res) {
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

async function createPost(req, res) {
  try {
    const posts = await getDataFromFile();
    posts.push({
      id: generateUUID(),
      ...req.body,
    });

    await fsp.writeFile(postPath, JSON.stringify(posts, null, 2));

    res.json({ message: "Er is een nieuwe post toegevoegd" });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deletePost(req, res) {
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
    const categories = [...new Set(posts.map(post => post.category))];
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  getCategories, 
};