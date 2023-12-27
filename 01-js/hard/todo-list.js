/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.list = [];
  }
  add(task) {
    this.list.push(task);
  }
  remove(index) {
    if (index >= this.list.length) return;

    if (index == 0) {
      this.list.shift();
    } else if (index == this.list.length - 1) {
      this.list.pop();
    } else {
      this.list = this.list.slice(0, index).concat(this.list.slice(index + 1));
    }
  }
  update(index, toDo) {
    if (index >= this.list.length) return;
    this.list[index] = toDo;
  }
  getAll() {
    return this.list;
  }
  get(index) {
    if (index >= this.list.length) return null;
    return this.list[index];
  }
  clear() {
    this.list = [];
  }
}

// let todoList = new Todo();
// todoList.add("Task 1");
// todoList.add("Task 2");
// todoList.add("Task 3");

// todoList.update(1, "Updated Task 2");

// console.log(todoList.get(1));
// todoList.update(3, "Invalid Task");
// console.log(todoList.getAll());
module.exports = Todo;
