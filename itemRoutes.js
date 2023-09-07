const express = require("express");
const router = new express.Router();
const items = require("./fakeDb");

router.get("/", (request, response) => {
  return response.json(items);
});

router.post("/", (request, response) => {
  items.push(request.body);
  return response.json({ added: request.body });
});

router.get("/:name", (request, response) => {
  for (let item in items) {
    let e = items[item];
    if (e["name"] == request.params.name) {
      return response.json(e);
    }
  }
  response.status(400).json(`Item "${request.params.name} not found"`);
});

router.patch("/:name", (request, response) => {
  for (let item in items) {
    let e = items[item];
    if (e["name"] == request.params.name) {
      items[item] = request.body;
      return response.status(200).json({ updated: request.body });
    }
  }
  response.status(400).json({ error: `${request.params.name} not found.` });
});

router.delete("/:name", (request, response) => {
  for (let item in items) {
    let e = items[item];
    if (e["name"] == request.params.name) {
      items.splice(item, 1);
      return response
        .status(200)
        .json({ message: `${request.params.name} Deleted.` });
    }
  }
  response.status(400).json({ error: `${request.params.name} not found.` });
});

module.exports = router;
