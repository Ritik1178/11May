# Todo Management System

A simple Todo Management System built with Express.js following the MVC architecture.

## Features

- CRUD operations for todos
- Partial search functionality
- Error handling
- RESTful API endpoints

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /todos` - Get all todos
- `GET /todos/search?q=<query>` - Search todos by title
- `GET /todos/:id` - Get todo by ID
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

## Example Usage

1. Create a new todo:
   ```bash
   curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"title": "Buy groceries"}'
   ```

2. Search todos:
   ```bash
   curl http://localhost:3000/todos/search?q=gro
   ```

3. Update a todo:
   ```bash
   curl -X PUT http://localhost:3000/todos/1 -H "Content-Type: application/json" -d '{"completed": true}'
   ```

4. Delete a todo:
   ```bash
   curl -X DELETE http://localhost:3000/todos/1
   ```

## Project Structure

```
.
├── models/
│   └── Todo.js
├── controllers/
│   └── todoController.js
├── routes/
│   └── todoRoutes.js
├── db.json
├── index.js
└── package.json
``` 