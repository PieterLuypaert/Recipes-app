const express = require("express");

const postRouter = express.Router();

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
} = require("../controllers/postControllers.js");

postRouter.get("/recipes", (req, res) => getPosts(req, res));
postRouter.get("/recipes/:postId", getPost);

postRouter.post("/recipes", createPost);

postRouter.delete("/recipes/:id", deletePost);

module.exports = postRouter;
