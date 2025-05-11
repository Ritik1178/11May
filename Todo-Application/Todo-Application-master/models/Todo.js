const fs = require('fs').promises;
const path = require('path');

class Todo {
  constructor() {
    this.dbPath = path.join(__dirname, '../db.json');
  }

  async readTodos() {
    try {
      const data = await fs.readFile(this.dbPath, 'utf8');
      return JSON.parse(data).todos;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async writeTodos(todos) {
    await fs.writeFile(this.dbPath, JSON.stringify({ todos }, null, 2));
  }

  async getAllTodos() {
    return await this.readTodos();
  }

  async getTodoById(id) {
    const todos = await this.readTodos();
    return todos.find(todo => todo.id === parseInt(id));
  }

  async searchTodos(query) {
    const todos = await this.readTodos();
    const searchQuery = query.toLowerCase();
    return todos.filter(todo => 
      todo.title.toLowerCase().includes(searchQuery)
    );
  }

  async createTodo(todoData) {
    const todos = await this.readTodos();
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      ...todoData,
      completed: false
    };
    todos.push(newTodo);
    await this.writeTodos(todos);
    return newTodo;
  }

  async updateTodo(id, updates) {
    const todos = await this.readTodos();
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    
    if (index === -1) return null;
    
    todos[index] = { ...todos[index], ...updates };
    await this.writeTodos(todos);
    return todos[index];
  }

  async deleteTodo(id) {
    const todos = await this.readTodos();
    const filteredTodos = todos.filter(todo => todo.id !== parseInt(id));
    
    if (filteredTodos.length === todos.length) return false;
    
    await this.writeTodos(filteredTodos);
    return true;
  }
}

module.exports = new Todo(); 