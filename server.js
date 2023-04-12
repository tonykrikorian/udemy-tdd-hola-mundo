const express = require("express");
const { users, posts } = require("./endpoints");
const { authenticate } = require("./middlewares");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

const userHandlers = users({ axios }); //Inyección de dependencias
const postsHandlers = posts({ axios }); //Inyección de dependencias

app.get("/", userHandlers.get);
app.post("/", userHandlers.post);
app.put("/:id", userHandlers.put);
app.delete("/:id", userHandlers.delete);

app.post("/posts", authenticate, postsHandlers.post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
