const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const uuidv4 = require("uuid/v4");
const app = express();

app.set("views", path.resolve("src", "server", "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [
  { id: uuidv4(), text: "Hello, world!", status: "active" },
  { id: uuidv4(), text: "Pick up groceries", status: "complete" }
];

// renders index page
app.get("/", (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;
  res.render("index", { bundle });
});

// returns all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// returns specific todo based on id (not currently used)
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex(todo => {
    return todo.id === id;
  });
  res.json(todos[index]);
});

// creates new Todo and adds to list of todos
app.post("/todos", (req, res) => {
  const text = req.body.data.text;

  if (!text) {
    res.status(400).json({ message: "text is required" });
    return;
  }

  // uuidv4 is used for unique identifiers
  const id = uuidv4();
  const newTodo = { id, text, status: "active" };
  todos.push(newTodo);
  res.status(201).json(todos);
});

// deletes an existing todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.status(200).json(todos);
});

// updates an existing todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(todo => {
    return todo.id == id;
  });
  todos[index].status = req.body.data.status;
  res.status(200).json(todos);
});

// updates multiple existing todos
app.put("/multipleTodos/", (req, res) => {
  let { filterRemaining, switchTo } = req.body.data;
  todos.forEach(todo => {
    if (todo.status === filterRemaining) {
      todo.status = switchTo;
    }
  });
  res.status(200).json(todos);
});

// catch all used to load client router on any page requests
app.get("*", function(req, res) {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render("index", { bundle });
});

// Node server.
const port = 3000;
const server = app.listen(port, () => {
  console.log(`---> Application started on port: ${port}`);
});

// Dev server.
const devServer = require("../../tools/development-server");
const devPort = 8080;

devServer.listen(devPort, "0.0.0.0", () => {});
