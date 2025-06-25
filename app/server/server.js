const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const postRouter = require("./routes/postRoutes.js");

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the site directory
app.use(express.static(path.join(__dirname, "../site")));

app.use(postRouter);

app.listen(PORT, () => {
  console.log(`Onze server is aan het luisteren op http://localhost:${PORT}`);
});
