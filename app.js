const express = require("express");
const itemRoutes = require("./itemRoutes");
const items = require("./fakeDb");
const app = express();

app.listen(3000, function () {
  console.log("App on port 3000");
});

app.use(express.json());

app.use("/items", itemRoutes);
