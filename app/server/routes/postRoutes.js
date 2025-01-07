const express = require('express');

const postRouter = express.Router();

const { getPosts, createPost, deletePost } = require('../controllers/postController.js');


postRouter.get('/recipes', (req, res) => getPosts(req, res));

postRouter.post('/recipes', (req, res) => createPost(req, res));


postRouter.delete('/recipes/:id', (req, res) => deletePost(req, res));

module.exports = postRouter;