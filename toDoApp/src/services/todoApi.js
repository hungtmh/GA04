// Todo API Service using LocalStorage as mock backend (to avoid CORS issues)
const STORAGE_KEY = 'todoapp_todos';

// Initialize with sample data if storage is empty
const initializeTodos = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const sampleTodos = [
      { id: 1, title: 'Complete project documentation', completed: false, userId: 1 },
      { id: 2, title: 'Review code changes', completed: true, userId: 1 },
      { id: 3, title: 'Test responsive layout', completed: false, userId: 1 },
      { id: 4, title: 'Deploy to production', completed: false, userId: 1 },
      { id: 5, title: 'Update README file', completed: true, userId: 1 },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTodos));
    return sampleTodos;
  }
  return JSON.parse(existing);
};

// Simulate network delay for realistic API behavior
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const todoApi = {
  // Fetch all todos
  async getTodos() {
    try {
      await delay();
      const todos = initializeTodos();
      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Add new todo
  async addTodo(newTodo) {
    try {
      await delay();
      const todos = initializeTodos();
      const newTodoWithId = {
        id: Date.now(),
        ...newTodo,
      };
      todos.unshift(newTodoWithId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      return newTodoWithId;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  },

  // Toggle todo completion status
  async toggleTodo(id, completed) {
    try {
      await delay(200);
      const todos = initializeTodos();
      const todoIndex = todos.findIndex(t => t.id === id);
      if (todoIndex === -1) throw new Error('Todo not found');
      
      todos[todoIndex].completed = !completed;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      return todos[todoIndex];
    } catch (error) {
      console.error('Error toggling todo:', error);
      throw error;
    }
  },

  // Delete todo
  async deleteTodo(id) {
    try {
      await delay(200);
      const todos = initializeTodos();
      const filtered = todos.filter(t => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },
};
