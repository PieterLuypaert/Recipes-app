const express = require("express");

const postRouter = express.Router();

const {
  getPosts,
  getRecipe,
  createRecipe,
  deleteRecipe,
  getCategories,
  getIngredients,
  getDifficultyLevels, 
} = require("../controllers/postControllers.js");

postRouter.get("/recipes", (req, res) => getPosts(req, res));
postRouter.get("/recipes/:postId", getRecipe);

postRouter.post("/recipes", createRecipe);

postRouter.delete("/recipes/:id", deleteRecipe);

postRouter.get("/categories", getCategories);
postRouter.get("/ingredients", getIngredients);
postRouter.get("/difficulty-levels", getDifficultyLevels); 

module.exports = postRouter;