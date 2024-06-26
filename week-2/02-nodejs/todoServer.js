/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const path = require("path");

app.use(bodyParser.json());

// let toDoList = [];

const getToDos = () => {
  console.log("Reading file");
  let str = fs.readFileSync(path.join(__dirname, "todos.json"), "utf8");
  let toDoList = JSON.parse(str);

  console.log("came here");
  return toDoList;
};
const findIndex = (toDoList, id) => {
  return toDoList.findIndex((toDo) => toDo.id === id);
};

const writeToDo = (toDoList) => {
  console.log("Writing new list ", toDoList);
  fs.writeFileSync(
    path.join(__dirname, "todos.json"),

    JSON.stringify(toDoList),
    (err) => {
      if (err) throw err;
    }
  );
};

app.get("/todos", (req, res) => {
  const toDoList = getToDos();
  res.json(toDoList);
});

app.get("/todos/:id", (req, res) => {
  let toDoList = getToDos();
  let index = findIndex(toDoList, parseInt(req.params.id));

  if (index === -1) res.status(404).send("ToDo Not Found!");
  else res.json(todoList[index]);
});

app.post("/todos", (req, res) => {
  console.log(req.body);

  let newTodo = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.description,
  };
  let toDoList = getToDos();
  toDoList.push(newTodo);
  writeToDo(toDoList);

  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  let toDoList = getToDos();
  let index = findIndex(toDoList, parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send();
  } else {
    toDoList[index].title = req.body.title;
    toDoList[index].description = req.body.description;
    writeToDo(toDoList);
    res.json(toDoList[index]);
  }
});
app.delete("/todos/:id", (req, res) => {
  let toDoList = getToDos();
  let index = findIndex(toDoList, parseInt(req.params.id));
  if (index === -1) res.status(404).send();
  else {
    toDoList.splice(index, 1);
    writeToDo(toDoList);
    res.status(200).send();
  }
});

app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(3000);
module.exports = app;
