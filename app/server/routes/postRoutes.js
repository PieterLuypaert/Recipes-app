const express = require("express");

const postRouter = express.Router();

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
} = require("../controllers/postControllers.js");

postRouter.get("/posts", (req, res) => getPosts(req, res));
postRouter.get("/posts/:postId", getPost);

postRouter.post("/posts", createPost);

postRouter.delete("/posts/:id", deletePost);

module.exports = postRouter;
