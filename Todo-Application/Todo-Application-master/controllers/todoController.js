const Todo = require('../models/Todo');

const todoController = {
  // Get all todos
  async getAllTodos(req, res) {
    try {
      const todos = await Todo.getAllTodos();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  },

  // Get todo by ID
  async getTodoById(req, res) {
    try {
      const todo = await Todo.getTodoById(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todo' });
    }
  },

  // Search todos
  async searchTodos(req, res) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
      }
      const todos = await Todo.searchTodos(q);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search todos' });
    }
  },

  // Create new todo
  async createTodo(req, res) {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }
      const newTodo = await Todo.createTodo({ title });
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  },

  // Update todo
  async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No updates provided' });
      }

      const updatedTodo = await Todo.updateTodo(id, updates);
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  },

  // Delete todo
  async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Todo.deleteTodo(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  }
};

module.exports = todoController; 