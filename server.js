const express = require("express");
const { users } = require("./endpoints");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

const userHandlers = users({ axios }); //Inyección de dependencias
app.get("/", userHandlers.get);

app.post("/", userHandlers.post);

app.put("/:id", userHandlers.put);

app.delete("/:id", userHandlers.delete);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
