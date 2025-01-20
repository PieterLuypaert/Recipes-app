const express = require("express");

const postRouter = express.Router();

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  getCategories, // Voeg deze regel toe
} = require("../controllers/postControllers.js");

postRouter.get("/recipes", (req, res) => getPosts(req, res));
postRouter.get("/recipes/:postId", getPost);

postRouter.post("/recipes", createPost);

postRouter.delete("/recipes/:id", deletePost);

postRouter.get("/categories", getCategories); // Voeg deze regel toe

module.exports = postRouter;